let $cf = require('./../../../server/common/function');

/**
 * @param server
 * @param req
 * @param watcherName
 * @param watcherBody
 * @returns {Promise}
 */
module.exports = function (server, req, watcherName, watcherBody) {
    watcherName = $cf.isString(watcherName) ? watcherName : false;
    watcherBody = $cf.isString(watcherBody) ? watcherBody : false;

    if (!watcherName || !watcherBody) {
        return new Promise((resolve, reject) => {
            reject('');
        });
    }

    return new Promise((resolve, reject) => {
        server.plugins.elasticsearch.getCluster('data').callWithRequest(req, 'transport.request', {
            method: 'PUT',
            path: '/_xpack/watcher/watch/' + watcherName,
            body: watcherBody,
        }).then(function (response) {
            resolve(response);
        }).catch(function (e) {
            reject(e);
        });
    });
};