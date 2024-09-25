let $cf = require('./../../common/function');

/**
 * @param server
 * @param req
 */
module.exports = function (server, req) {
    let emptyResponse = ['unknown'];

    return new Promise((resolve, reject) => {
        let source = $cf.getUserListSource();
        source = typeof source == 'string' ? source : '';
        if (source == 'security') {
            server.plugins.elasticsearch.getCluster('data').callWithRequest(req, 'index', {
                method: 'GET',
                index: '_xpack',
                type: 'security',
                id: 'user'
            }).then(function (response) {
                let userList = [];
                for (let user in response) {
                    if (typeof response[user]['full_name'] != "undefined" && response[user]['full_name']) {
                        userList.push(response[user]['full_name']);
                    }
                }

                resolve(userList);
            }).catch(function (e) {
                resolve(emptyResponse);
            });
        } else if (source == 'soc_app_users') {
            server.plugins.elasticsearch.getCluster('data').callWithRequest(req, 'search', {
                index: 'soc_app_users',
                body: {
                    "size": 10000
                }
            }).then(function (response) {
                let userList = [];

                response['hits']['hits'].forEach(function (doc) {
                    try {
                        userList.push(doc['_source']['user_full_name']);
                    } catch (e) {
                    }
                });

                resolve(userList);
            }).catch(function (e) {
                resolve(emptyResponse);
            });
        } else {
            resolve(emptyResponse);
        }
    });
};