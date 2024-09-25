let $cf = require('./../../common/function');

let fs = require('fs');
let path = require("path");

/**
 *
 */
module.exports = function () {
    let data = [];
    try {
        data = JSON.parse(fs.readFileSync(path.resolve(__dirname + '/../../../config/sigma_category_tree.json'), 'utf8'));
    } catch (e) {}

    let result = [];
    data.forEach(function (cat) {
        cat.items = cat.items || [];
        if (!$cf.isString(cat.parent_id)) {
            result.push(cat);
        } else {
            data.forEach(function (catOther) {
                cat.items = cat.items || [];
                if (cat.parent_id == catOther.id) {
                    catOther.items.push(cat);
                }
            });
        }
    });

    return result;
};