import {Base64} from 'js-base64';

let $cf = require('./../../common/function');

let modelsXpackAddWatcher = require('./../../models/xpack/add-watcher');

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

                let watcherContent = null;
                if ($cf.isString(req.query.watcherContent)) {
                    watcherContent = Base64.decode(req.query.watcherContent);
                } else {
                    reply(emptyResult);
                }

                watcherContent = watcherContent.split("{");
                let watcherContentRoute = watcherContent.shift();
                watcherContent = '{' + watcherContent.join("{");
                watcherContentRoute = watcherContentRoute.split('/').pop().trim();

                modelsXpackAddWatcher(server, req, watcherContentRoute, watcherContent).then(function (result) {
                    reply({
                        success: true
                    });
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
