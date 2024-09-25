let $cf = require('./../../common/function');
const Base64 = require('js-base64').Base64;
const commonGetByTerms = require('./../../models/common/get-by-terms');

let emptyResult = {
    key: '',
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
                Promise.all([
                    commonGetByTerms(server, req, 'sui_config', 'name', $cf.suiConfigKey.tdmApi)
                ]).then(function (value) {
                    let apiKey = $cf.extractArrayFromSource(value[0]);
                    apiKey = apiKey[0] || {};
                    apiKey = apiKey['value'] || '';
                    if (apiKey.length > 0) {
                        apiKey = Base64.decode(apiKey);
                    }

                    reply({
                        key: apiKey,
                        success: true
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
