let $cf = require('./../../common/function');

let commonGetByBody = require('./../../models/common/get-by-body');
let helpersSigmaGetCategoryTree = require('./../../helpers/sigma/get-category-tree');

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
                let id = null;
                if (typeof req.query.id == 'string') {
                    id = req.query.id;
                }

                let filter = null;
                if (typeof req.query.filter == 'string') {
                    filter = req.query.filter;

                    // prepare filter
                    filter = filter.substr(0, 128);
                    ['+', '-', '&', '|', '!', '(', ')', '{', '}', '[', ']', '^', "'", '~', '*', '?', ':', '\\', '/'].forEach(function (subject) {
                        filter = filter.replace(subject, '');
                    });
                    ['/', '\\', '+', '*', '?', '[', '^', ']', '$', '(', ')', '{', '}', '=', '!', '<', '>', '|', ':', '-', ';', '#'].forEach(function (subject) {
                        filter = filter.replace(subject, "\\" + subject);
                    });
                }

                let body = {
                    "size": 10000
                };

                if (id) {
                    body['query'] = {
                        "match": {
                            "_id": id
                        }
                    };
                }

                if (filter && filter.length > 0) {
                    body['query'] = {
                        "query_string": {
                            "default_field": "sigma_text",
                            "query": "*" + filter + "*"
                        }
                    };
                }

                commonGetByBody(server, req, 'sui_sigma_doc', body).then(function (response) {
                    response = response['hits'] || [];
                    response = response['hits'] || [];
                    let data = [];
                    let total = 0;

                    if ($cf.isArray(response) && id) {
                        data = response[0]._source || {};
                        data['id'] = id;
                        total = 1;
                    } else if ($cf.isArray(response) && !id) {
                        let categoriesTree = helpersSigmaGetCategoryTree();
                        let flatCat = {};
                        if ($cf.isArray(categoriesTree)) {
                            let getCat = function (flatCat, srcArr) {
                                srcArr.forEach(function (oneCat) {
                                    if (oneCat.id) {
                                        flatCat[oneCat.id] = oneCat;
                                    }
                                    if (oneCat.items) {
                                        getCat(flatCat, oneCat.items);
                                    }
                                });
                            };

                            getCat(flatCat, categoriesTree);
                        }

                        total = response.length;

                        response.forEach(function (oneSigma) {
                            if (oneSigma._id && oneSigma._source && oneSigma._source.title) {
                                let needCat = oneSigma._source.category || null;
                                let sigmaData = {
                                    id: oneSigma._id,
                                    name: oneSigma._source.title
                                };
                                if (flatCat[needCat]) {
                                    flatCat[needCat].items.push(sigmaData);
                                } else {
                                    categoriesTree.push(sigmaData);
                                }
                            }
                        });

                        let checkChildCat = function(cat) {
                            let hasSigma = false;
                            if (cat.items) {
                                for (const oneChildId in cat.items) {
                                    if ($cf.isString(cat.items[oneChildId].id) && cat.items[oneChildId].id.length > 10) {
                                        hasSigma = true;
                                    } else {
                                        cat.items[oneChildId] = checkChildCat(cat.items[oneChildId]);
                                        hasSigma = cat.items[oneChildId].hasSigma || hasSigma;
                                    }
                                }
                            }
                            cat.hasSigma = hasSigma;

                            return cat;
                        };

                        for (const oneCatId in categoriesTree) {
                            categoriesTree[oneCatId] = checkChildCat(categoriesTree[oneCatId]);
                        }

                        data = categoriesTree;
                    }

                    return reply({
                        success: true,
                        data: data,
                        total: total
                    });
                }).catch(function (e) {
                    console.log(e);
                    return reply(emptyResult);
                });
            });
        })();
    };

    return {
        index: index
    };
};
