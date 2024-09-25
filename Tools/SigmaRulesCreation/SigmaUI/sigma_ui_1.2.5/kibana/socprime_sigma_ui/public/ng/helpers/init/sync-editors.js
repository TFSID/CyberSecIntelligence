let $cf = require('./../../../../server/common/function');

module.exports = function (scope) {
    let fromText = false;
    let fromJson = false;

    scope.$watch('currSigma.sigma_text', function (newVal, oldVal) {
        if (newVal !== oldVal) {
            if (!fromJson) {
                fromText = true;
                if ($cf.isString(newVal)) {
                    try {
                        scope.currSigma.json = YAML.parse(newVal);
                    } catch (e) {
                    }
                } else {
                    scope.currSigma.json = {};
                }
            } else {
                fromJson = false;
            }
        }
    });

    scope.$watch('currSigma.json', function (newVal, oldVal) {
        if (newVal !== oldVal) {
            if ($cf.isString(newVal.title)) {
                scope.currSigma.title = newVal.title;
            }
            if ($cf.isString(newVal.author)) {
                scope.currSigma.author = newVal.author;
            }
            if (typeof newVal.logsource == 'object') {
                scope.currSigma.logsource = newVal.logsource;
            }

            if (!fromText) {
                fromJson = true;
                if (newVal != {}) {
                    try {
                        scope.currSigma.sigma_text = YAML.stringify(newVal, 4);
                    } catch (e) {
                    }
                } else {
                    scope.currSigma.sigma_text = '';
                }
            } else {
                fromText = false;
            }
        }
    });
};