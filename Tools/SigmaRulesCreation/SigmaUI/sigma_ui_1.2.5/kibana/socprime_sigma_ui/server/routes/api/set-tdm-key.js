let $cf = require('./../../common/function');
const commonGetByTerms = require('./../../models/common/get-by-terms');
const commonAddOrUpdate = require('./../../models/common/add-or-update');

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
                let apiKey = null;
                if (typeof req.payload['key'] == "string") {
                    apiKey = req.payload['key'];
                } else {
                    reply(emptyResult);
                }

                Promise.all([
                    commonGetByTerms(server, req, 'sui_config', 'name', $cf.suiConfigKey.tdmApi)
                ]).then(function (value) {
                    let apiKeyObj = $cf.extractArrayFromSource(value[0]);
                    apiKeyObj = apiKeyObj[0] || {};
                    apiKeyObj = Object.assign(apiKeyObj, {
                        "name": $cf.suiConfigKey.tdmApi,
                        "updated": (new Date()).getTime(),
                        "value": apiKey
                    });

                    if (!apiKeyObj.created) {
                        apiKeyObj.created = (new Date()).getTime();
                    }

                    Promise.all([
                        commonAddOrUpdate(server, req, {
                            'index': 'sui_config',
                            'id': apiKeyObj.id || null,
                            'data': apiKeyObj,
                        })
                    ]).then(function (postVal) {
                        reply({
                            success: true
                        });
                    }).catch(function (e) {
                        console.log(e);
                        reply(emptyResult);
                    });
                }).catch(function (e) {
                    console.log(e);
                    reply(emptyResult);
                });
            });
        })();
    };

    return {
        index: index
    };
};
