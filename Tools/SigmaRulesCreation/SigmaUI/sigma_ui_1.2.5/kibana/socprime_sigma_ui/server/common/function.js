import moment from 'moment';

let fs = require('fs');
let path = require("path");

module.exports = {
    getRandomColor: function () {
        let letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }

        return color;
    },
    getConfigFile: function (filename) {
        let data = null;
        try {
            data = JSON.parse(fs.readFileSync(path.resolve(__dirname + '/../../config/' + filename), 'utf8'));
        } catch (e) {
        }

        return data;
    },
    createTextLinks: function (text) {
        let result = text;
        try {
            result = (text || "").replace(
                /([^\S]|^)(((https?\:\/\/)|(www\.))(\S+))/gi,
                function (match, space, url) {
                    let hyperlink = url;
                    if (!hyperlink.match('^https?:\/\/')) {
                        hyperlink = 'http://' + hyperlink;
                    }
                    return space + '<a href="' + hyperlink + '" target="_blank">' + url + '</a>';
                }
            );

        } catch (e) {
        }

        return result;
    },
    getDateInFormat: function (date, format, alternative) {
        let needDate = '';
        alternative = alternative || '';

        if (typeof date == "string") {
            let tmpTimestamp = date.replace(/\.[0-9]+Z$/, '');
            needDate = moment(tmpTimestamp, 'YYYY-MM-DDTHH:mm:ss').format(format);
        } else {
            needDate = moment(date).format(format);
            if (format == 'x') {
                needDate = parseInt(needDate);
            }
        }
        needDate = (needDate == 'Invalid date') ? alternative : needDate;

        return needDate;
    },
    getHitsHits: function (response) {
        response = response['hits'] || {};

        return response['hits'] || [];
    },
    extractArrayFromSource: function (array) {
        let spCF = this;
        let response = [];
        if (spCF.isArray(array)) {
            array.forEach(function (el) {
                el._source = el._source || {};
                if (el["_id"]) el._source['id'] = el["_id"];
                if (el["_index"]) el._source['index'] = el["_index"];
                response.push(el._source);
            });
        }

        return response;
    },
    getArrayOrEmpty: function (value) {
        return ((obj) => this.isArray(obj) ? obj : [])(value);
    },
    isSet: function (value) {
        return typeof value != 'undefined';
    },
    isArray: function (value) {
        return typeof value != 'undefined' && Array.isArray(value);
    },
    isObject: function (value) {
        return typeof value == 'object' && value !== null;
    },
    isString: function (value) {
        return typeof value == 'string' && value.length > 0;
    },
    isFunction: function (value) {
        return typeof value == 'function';
    },
    isBool: function (value) {
        return typeof value == 'boolean';
    },
    isNumber: function (value) {
        return typeof value == 'number';
    },
    isDate: function (value) {
        return value instanceof Date;
    },
    arrayUnique: function (needArray) {
        let a = needArray.concat();
        for (let i = 0; i < a.length; ++i) {
            for (let j = i + 1; j < a.length; ++j) {
                if (a[i] === a[j])
                    a.splice(j--, 1);
            }
        }

        return a;
    },
    suiConfigKey: {
        tdmApi: 'tdm_api_key'
    }
};