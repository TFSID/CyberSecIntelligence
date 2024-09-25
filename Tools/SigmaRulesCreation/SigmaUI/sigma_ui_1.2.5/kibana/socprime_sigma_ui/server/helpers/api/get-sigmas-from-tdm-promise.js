let cmd = require('node-cmd');
let fs = require('fs');
const moment = require('moment-timezone');

const $cf = require('./../../common/function');

const commonConfig = $cf.getConfigFile('common.json');
let pythonPath = commonConfig.python_path || null;
let tdmApiIntegrationToolPath = commonConfig.tdm_api_integration_tool_path || null;
let tpmSigmaFolderPath = $cf.isString(commonConfig.tpm_sigma_folder_path) ? commonConfig.tpm_sigma_folder_path.replace('\/$', '') : null;

module.exports = function (apiKey, dateFrom) {
    dateFrom = moment(dateFrom).format('YYYY-MM-DD');

    return new Promise(function (resolve) {
        if (!pythonPath || !tdmApiIntegrationToolPath || !tpmSigmaFolderPath) {
            resolve(emptyResult('Wrong config'));
        }

        fs.readdir(tpmSigmaFolderPath, oldSigmaFilesRemover(resolve, apiKey, dateFrom));
    });
};

const oldSigmaFilesRemover = function (resolve, apiKey, dateFrom) {
    return function (listErr, files) {
        if (!listErr) {
            const unlinkFilePromisesList = [];
            files.forEach(function (file) {
                unlinkFilePromisesList.push(new Promise((unlinkFileResponse) => {
                    fs.unlink(tpmSigmaFolderPath + '/' + file, (unlinkErr) => {
                        if (!unlinkErr) {
                            unlinkFileResponse(true);
                        } else {
                            unlinkFileResponse(unlinkErr);
                        }
                    });
                }));
            });

            Promise.all(unlinkFilePromisesList).then(tdmApiRequest(resolve, apiKey, dateFrom)).catch(function (e) {
                resolve(e);
            });
        } else {
            resolve(listErr);
        }
    };
};

const tdmApiRequest = function (resolve, apiKey, dateFrom) {
    return function () {
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

                            Promise.all(readFilePromisesList).then(prepareNewSigmas(resolve, apiKey, dateFrom)).catch(function (e) {
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
    }
};

const prepareNewSigmas = function (resolve, apiKey, dateFrom) {
    return function (allFilesContent) {
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
    };
};