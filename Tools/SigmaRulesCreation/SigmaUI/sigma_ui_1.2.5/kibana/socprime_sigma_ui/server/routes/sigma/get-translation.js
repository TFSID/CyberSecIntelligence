import {Base64} from 'js-base64';

let cmd = require('node-cmd');
let fs = require('fs');

let $cf = require('./../../common/function');

let kibanaGetAllIndexPattern = require('./../../models/kibana/get-all-index-pattern');

let configSiemExportList = require('./../../../public/ng/config/siemExportList');

let emptyResult = {
    success: false
};

/**
 * @param server
 * @param options
 */
export default function (server, options) {
    const index = (req) => {
        return (async function () {
            return await new Promise(function (reply) {
                let siemTo = null;
                if (typeof req.query.siemTo == 'string' && Object.keys(configSiemExportList).indexOf(req.query.siemTo) >= 0) {
                    siemTo = req.query.siemTo;
                }

                let sigmaText = null;
                if ($cf.isString(req.query.sigmaText)) {
                    sigmaText = Base64.decode(req.query.sigmaText);
                }

                if (!siemTo || !sigmaText) {
                    return reply(emptyResult);
                }

                let translationScriptPath = '/usr/share/kibana/plugins/socprime_sigma_ui/server/translation_script';
                let cmdPromise = new Promise(function (resolve, reject) {
                    let tmpSigmaFilePath = translationScriptPath + '/sigma/tmp_sigma.txt';
                    fs.writeFile(tmpSigmaFilePath, sigmaText, 'utf8', function (error) {
                        if (!error) {
                            cmd.get(
                                'python ' + translationScriptPath + '/sigma/sigma_converter.py ' + tmpSigmaFilePath + ' ' + siemTo,
                                function (err, data, stderr) {
                                    if (!err) {
                                        resolve(data);
                                    } else {
                                        reject(err);
                                    }
                                }
                            );
                        } else {
                            reject(error);
                        }
                    });
                });

                Promise.all([
                    cmdPromise,
                    kibanaGetAllIndexPattern(server, req)
                ]).then(function (value) {
                    let cmdResult = value[0] || false;
                    let indexPatterns = value[1] || [];
                    let baseIndexId = '';

                    indexPatterns.forEach(function (onePattern) {
                        if ($cf.isString(onePattern['id']) && $cf.isString(onePattern['title']) && onePattern['title'] == '*') {
                            baseIndexId = onePattern['id'];
                        }
                    });

                    if (cmdResult) {
                        return reply({
                            success: true,
                            data: {
                                baseIndexId: baseIndexId,
                                translation: Base64.encode(cmdResult)
                            }
                        });
                    } else {
                        return reply(emptyResult);
                    }
                }).catch(function (e) {
                    server.log(['error'], e);

                    return reply(emptyResult);
                });
            });
        })();
    };

    return {
        index: index
    };
};
