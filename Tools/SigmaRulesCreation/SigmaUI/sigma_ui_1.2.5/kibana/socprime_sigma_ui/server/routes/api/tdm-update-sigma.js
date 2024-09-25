const Base64 = require('js-base64').Base64;
const moment = require('moment-timezone');
const $cf = require('./../../common/function');
const commonGetByTerms = require('./../../models/common/get-by-terms');
const commonGetByBody = require('./../../models/common/get-by-body');
const helpersApiUpdateSigmaFromTdmByPeriod = require('./../../helpers/api/update-sigma-from-tdm-by-period');

let emptyResult = function (message) {
    let response = {
        "success": false
    };

    if (message) {
        response['message'] = message;
    }

    return response;
};

/**
 * @param server
 * @param options
 */
export default function (server, options) {
    const index = (req) => {
        return (async function () {
            return await new Promise(function (reply) {
                const commonConfig = $cf.getConfigFile('common.json');
                const debugMode = commonConfig.debug === true;

                Promise.all([
                    commonGetByTerms(server, req, 'sui_config', 'name', $cf.suiConfigKey.tdmApi),
                    commonGetByBody(server, req, 'sui_sigma_doc', {
                        "size": 1,
                        "_source": "updated",
                        "sort": [
                            {
                                "updated": {
                                    "order": "desc"
                                }
                            }
                        ]
                    })
                ]).then(function (value) {
                    let apiKeyObj = $cf.extractArrayFromSource(value[0]);
                    let lastUpdatedDate = $cf.getHitsHits(value[1]);

                    apiKeyObj = apiKeyObj[0] || {};
                    lastUpdatedDate = lastUpdatedDate[0] || {};
                    lastUpdatedDate = lastUpdatedDate.sort || [];
                    lastUpdatedDate = lastUpdatedDate[0] || null;
                    lastUpdatedDate = parseInt(lastUpdatedDate) == lastUpdatedDate ? lastUpdatedDate : moment(new Date()).subtract(29, 'days').startOf('day').format('x');

                    if ($cf.isString(apiKeyObj.value)) {
                        let apiKey = Base64.decode(apiKeyObj.value);

                        Promise.all([
                            helpersApiUpdateSigmaFromTdmByPeriod(server, req, apiKey, lastUpdatedDate, (new Date()).getTime())
                        ]).then(function (sigmaResponse) {
                            sigmaResponse = $cf.isObject(sigmaResponse[0]) ? sigmaResponse[0] : {};

                            let response = {
                                success: true,
                                total: sigmaResponse.total || 0,
                                created: sigmaResponse.created || 0,
                                updated: sigmaResponse.updated || 0
                            };

                            if (sigmaResponse.debug && debugMode) {
                                response.debug = sigmaResponse.debug;
                                response.success = false;
                            }

                            if (sigmaResponse.message) {
                                response.message = sigmaResponse.message;
                                response.success = false;
                            }

                            reply(response);
                        }).catch(function (e) {
                            console.log(e);
                            reply(emptyResult());
                        });

                    } else {
                        reply(emptyResult('TDM API Key dose not set!'));
                    }
                }).catch(function (e) {
                    console.log(e);
                    reply(emptyResult());
                });
            });
        })();
    };

    return {
        index: index
    };
};
