let cmd = require('node-cmd');
let fs = require('fs');
let moment = require('moment-timezone');

const $cf = require('./../../common/function');
const commonGetByBody = require('./../../models/common/get-by-body');
const commonAddOrUpdate = require('./../../models/common/add-or-update');
const getSigmasFromTdmPromise = require('./get-sigmas-from-tdm-promise');

let emptyResult = function (error, message) {
    let response = {
        total: 0,
        created: 0,
        updated: 0,
        success: false
    };

    if (error) {
        response['debug'] = error;
    }

    if (message) {
        response['message'] = message;
    }

    return response;
};

module.exports = function (server, req, apiKey, dateFrom, dateTo) {
    return new Promise(function (resolve) {
        let sigmaCategoryTree = $cf.getConfigFile('sigma_category_tree.json');
        let sigmaCategoryTreeObj = {};
        $cf.getArrayOrEmpty(sigmaCategoryTree).forEach((oneCat) => {
            if ($cf.isSet(oneCat.id) && $cf.isString(oneCat.name)) {
                sigmaCategoryTreeObj[oneCat.name] = oneCat.id;
            }
        });

        const commonConfig = $cf.getConfigFile('common.json');
        commonConfig.max_upload_period_in_month = $cf.isNumber(commonConfig.max_upload_period_in_month) ? commonConfig.max_upload_period_in_month : 1;

        if (!$cf.isString(apiKey)) {
            resolve(emptyResult('No API KEY'));
        }

        dateFrom = new Date(dateFrom);

        if (Math.abs((new Date()).getTime() - dateFrom.getTime()) > commonConfig.max_upload_period_in_month * 30 * 24 * 60 * 60 * 1000) {
            dateFrom = (new Date()).getTime() - commonConfig.max_upload_period_in_month * 30 * 24 * 60 * 60 * 1000;
        }

        Promise.all([
            commonGetByBody(server, req, 'sui_sigma_doc', {
                "size": 10000,
                "_source": ["hash", "title"]
            }),
            getSigmasFromTdmPromise(apiKey, (new Date(dateFrom)).getTime())
        ]).then(function (apiResponse) {
            const prevSigma = preparePrevSigma($cf.extractArrayFromSource($cf.getHitsHits(apiResponse[0])));
            if (apiResponse[1] instanceof Error && apiResponse[1].message) {
                resolve(emptyResult(apiResponse[1].message));
            } else {
                apiResponse = $cf.getArrayOrEmpty(apiResponse[1]);

                let errorMessage = null;
                let hasObject = false;
                apiResponse.forEach((el) => {
                    if ($cf.isString(el)) {
                        errorMessage = el;
                    } else if ($cf.isObject(el)) {
                        hasObject = true;
                    }
                });

                if (errorMessage && !hasObject) {
                    resolve(emptyResult(null, errorMessage));
                } else {
                    Promise.all(prepareSigmaRequests(server, req, prevSigma, apiResponse, sigmaCategoryTreeObj)).then(function (sigmaResponse) {
                        let total = sigmaResponse.length;
                        let created = 0;
                        let updated = 0;
                        sigmaResponse.forEach((onereRsponse) => {
                            if ($cf.isString(onereRsponse.result) && onereRsponse.result == 'updated') {
                                updated++;
                            } else {
                                created++
                            }
                        });

                        resolve({
                            total: total,
                            created: created,
                            updated: updated,
                        });
                    }).catch(function (e) {
                        console.log(e);
                        resolve(emptyResult(e.message));
                    });
                }
            }
        }).catch(function (e) {
            console.log(e);
            resolve(emptyResult(e.message));
        });
    });
};

const preparePrevSigma = function (rawSigma) {
    let prevSigma = {};
    rawSigma.forEach((oneSigma) => {
        if ($cf.isString(oneSigma.hash) && $cf.isString(oneSigma.title) && $cf.isString(oneSigma.id)) {
            oneSigma.title = oneSigma.title.replace('sigma: ', '');
            prevSigma[oneSigma.title] = {
                id: oneSigma.id,
                hash: oneSigma.hash,
            };
        }
    });

    return prevSigma;
};

const prepareSigmaRequests = function (server, req, prevSigma, apiResponse, sigmaCategory) {
    const result = [];
    sigmaCategory = $cf.isObject(sigmaCategory) ? sigmaCategory : {};

    $cf.getArrayOrEmpty(apiResponse).forEach((oneSigma) => {
        if (
            $cf.isString(oneSigma.release_date) &&
            $cf.isObject(oneSigma.case) && $cf.isString(oneSigma.case.name) &&
            $cf.isObject(oneSigma.sigma) && $cf.isString(oneSigma.sigma.text) && $cf.isString(oneSigma.sigma.hash)
        ) {
            let updated = moment().format("YYYY-MM-DDTHH:mm:ss.SSSSSSZ");
            let released = (new Date(oneSigma.release_date)).getTime();
            released = parseInt(released) == released ? moment(new Date(released)).format("YYYY-MM-DDTHH:mm:ss.SSSSSSZ") : updated;

            let newSigma = {
                "title": "sigma: " + oneSigma.case.name,
                "title_keyword": "sigma: " + oneSigma.case.name,
                "released": released,
                "updated": updated,
                "sigma_text": oneSigma.sigma.text,
                "hash": oneSigma.sigma.hash,
                "category": 0
            };

            if ($cf.isObject(oneSigma.tags)) {
                if ($cf.isArray(oneSigma.tags.author)) {
                    newSigma["author"] = oneSigma.tags.author.join(', ');
                    newSigma["author_keyword"] = newSigma["author"];
                }

                for (let oneTagGroup in oneSigma.tags) {
                    $cf.getArrayOrEmpty(oneSigma.tags[oneTagGroup]).forEach((oneTag) => {
                        if ($cf.isString(sigmaCategory[oneTag])) {
                            newSigma["category"] = sigmaCategory[oneTag];
                        }
                    });
                }
            }

            if ($cf.isObject(oneSigma.sigma)) {
                if ($cf.isString(oneSigma.sigma.git_filepath)) {
                    newSigma["git_filepath"] = oneSigma.sigma.git_filepath;
                }

                if ($cf.isString(oneSigma.sigma.level)) {
                    newSigma["level"] = oneSigma.sigma.level;
                }

                if ($cf.isString(oneSigma.sigma.status)) {
                    newSigma["status"] = oneSigma.sigma.status;
                }
            }

            if ($cf.isBool(oneSigma.is_verified)) {
                newSigma["is_verified"] = oneSigma.is_verified;
            }

            if ($cf.isObject(oneSigma.mitre_attack)) {
                newSigma["mitre_attack"] = oneSigma.mitre_attack;
            }

            let requestBody = {
                'index': 'sui_sigma_doc',
                'data': newSigma
            };

            if (
                $cf.isObject(prevSigma[oneSigma.case.name]) &&
                $cf.isString(prevSigma[oneSigma.case.name].id) && $cf.isString(prevSigma[oneSigma.case.name].hash)
            ) {
                requestBody['id'] = prevSigma[oneSigma.case.name].id;
                if (prevSigma[oneSigma.case.name].hash != newSigma.hash) {
                    result.push(commonAddOrUpdate(server, req, requestBody));
                }
            } else {
                result.push(commonAddOrUpdate(server, req, requestBody));
            }
        }
    });

    return result;
};

const tdmApiRequests = function (pythonPath, tdmApiIntegrationToolPath, tpmSigmaFolderPath, apiKey, dateFrom) {
    tpmSigmaFolderPath = tpmSigmaFolderPath.replace('\/$', '');
    dateFrom = moment(dateFrom).format('YYYY-MM-DD');
    return new Promise((resolve) => {
        cmd.get(
            'rm -rf ' + tpmSigmaFolderPath + '/*',
            function (rmErr, data, stderr) {
                if (!rmErr) {
                    cmd.get(
                        pythonPath + ' ' + tdmApiIntegrationToolPath + ' -d ' + tpmSigmaFolderPath + ' -k ' + apiKey + ' -s ' + dateFrom + ' -v sigma',
                        function (apiErr, data, stderr) {
                            if (!apiErr) {
                                fs.readdir(tpmSigmaFolderPath, function (listErr, files) {
                                    if (!listErr) {
                                        const readFilePromisesList = [];
                                        files.forEach(function (file) {
                                            readFilePromisesList.push(new Promise((readFileResponse) => {
                                                fs.readFile(tpmSigmaFolderPath + '/' + file, function read(filesErr, data) {
                                                    try {
                                                        data = JSON.parse(data);
                                                    } catch (e) {
                                                        data = [];
                                                    }
                                                    if (!filesErr) {
                                                        readFileResponse(data);
                                                    } else {
                                                        readFileResponse(filesErr);
                                                    }
                                                });
                                            }));
                                        });

                                        Promise.all(readFilePromisesList).then(function (allFilesContent) {
                                            let newSigmas = [];
                                            $cf.getArrayOrEmpty(allFilesContent).forEach((oneFile) => {
                                                $cf.getArrayOrEmpty(oneFile).forEach((oneRequest) => {
                                                    if ($cf.isArray(oneRequest)) {
                                                        oneRequest.forEach((oneSigma) => {
                                                            newSigmas.push(oneSigma);
                                                        });
                                                    } else if ($cf.isString(oneRequest.Message)) {
                                                        newSigmas.push(oneRequest.Message);
                                                    } else if ($cf.isString(oneRequest.message)) {
                                                        newSigmas.push(oneRequest.message);
                                                    }
                                                });
                                            });
                                            resolve(newSigmas);
                                        }).catch(function (e) {
                                            resolve(e);
                                        });
                                    } else {
                                        resolve(listErr);
                                    }
                                });
                            } else {
                                resolve(apiErr);
                            }
                        }
                    );
                } else {
                    resolve(rmErr);
                }
            }
        );
    });
};
