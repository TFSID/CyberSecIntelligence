let $cf = require('./../../common/function');

/**
 * @param server
 * @param req
 */
module.exports = function (server, req) {
    let emptyResponse = '';

    return new Promise((resolve, reject) => {
        server.plugins.elasticsearch.getCluster('data').callWithRequest(req, 'index', {
            method: 'GET',
            index: '_xpack',
            type: 'security',
            id: '_authenticate'
        }).then(function (response) {
            response = $cf.isString(response['full_name']) ?
                response['full_name'] : $cf.isString(response['username']) ?
                    response['username'] : $cf.isString(response['email']) ?
                        response['email'] : $cf.isSet(response['metadata']) && $cf.isString(response['metadata']['saml_nameid']) ?
                            response['metadata']['saml_nameid'] : $cf.isSet(response['metadata']) && $cf.isSet(response['metadata']['saml(Login)']) && $cf.isString(response['metadata']['saml(Login)'][0]) ?
                                response['metadata']['saml(Login)'] : emptyResponse;

            resolve(response);
        }).catch(function (e) {
            resolve(emptyResponse);
        });
    });
};