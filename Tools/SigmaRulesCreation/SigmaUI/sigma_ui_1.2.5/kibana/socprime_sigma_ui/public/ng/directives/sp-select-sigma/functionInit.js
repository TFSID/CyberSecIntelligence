let $cf = require('./../../../../server/common/function');

module.exports = function (scope, $http) {
    // Load all sigmas
    scope.loadAllSigmas = function (filter) {
        if ($cf.isString(scope.currUrl)) {
            let params = {};
            if ($cf.isString(filter)) {
                params.filter = filter;
            }

            $('.cd-main-content').waitAnimationStart();
            $http({
                method: "GET",
                url: scope.currUrl + '/sigma-doc',
                dataType: "json",
                params: params
            }).then(function successCallback(response) {
                $('.cd-main-content').waitAnimationStop();
                response = response.data || {};
                if (response.success && response.success == true && $cf.isArray(response.data)) {
                    scope.totalSigma = response.total || 0;
                    scope.list = response.data;
                }
            }, function errorCallback(response) {
                $('.cd-main-content').waitAnimationStop();
                console.log('connection error');
            });
        }
    };

    // Load one sigma handler
    scope.loadSigma = function (item) {
        if ($cf.isString(scope.currUrl)) {
            if (!item.items && $cf.isString(item.id)) {
                $('.cd-main-content').waitAnimationStart();
                $http({
                    method: "GET",
                    url: scope.currUrl + '/sigma-doc',
                    dataType: "json",
                    params: {
                        id: item.id
                    }
                }).then(function successCallback(response) {
                    $('.cd-main-content').waitAnimationStop();
                    response = response.data || {};
                    if (response.success && response.success == true && typeof response.data == 'object') {
                        scope.currentSigma = response.data;
                    }
                }, function errorCallback(response) {
                    $('.cd-main-content').waitAnimationStop();
                    console.log('connection error');
                });
            }
        }
    };

    scope.filterSigma = function () {
        scope.currentSigma = null;
        $('body .modal .select-sigma form#' + scope.formId).parents('.modal-content').find('.modal-footer .btn.btn-submit').addClass('disabled');
        scope.loadAllSigmas(scope.sigmaFilter);
    };
};