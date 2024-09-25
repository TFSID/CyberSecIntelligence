let $cf = require('./../../common/function');
const Base64 = require('js-base64').Base64;
const commonGetByTerms = require('./../../models/common/get-by-terms');

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
                Promise.all([
                    commonGetByTerms(server, req, 'sui_config', 'name', $cf.suiConfigKey.tdmApi)
                ]).then(function (value) {
                    let apiKey = $cf.extractArrayFromSource(value[0]);
                    apiKey = apiKey[0] || {};
                    apiKey = apiKey['value'] || '';
                    if (apiKey.length > 0) {
                        apiKey = Base64.decode(apiKey);

                        let lettersCount = parseInt(apiKey.length / 6);
                        lettersCount = lettersCount > 1 ? lettersCount : 1;
                        let maskedApiKey = '';
                        for (let letterId in apiKey) {
                            if (letterId >= lettersCount && letterId < (apiKey.length - lettersCount)) {
                                maskedApiKey += '*';
                            } else {
                                maskedApiKey += apiKey[letterId];
                            }
                        }

                        apiKey = maskedApiKey;
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
