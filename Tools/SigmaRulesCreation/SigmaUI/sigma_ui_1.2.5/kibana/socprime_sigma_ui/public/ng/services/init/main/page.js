require('ui/modules').get('app/socprime_sigma_ui', []).service('spInitMainPage', [
    '$http',
    '$route',
    'spCF',
    'modal',
    function ($http, $route, spCF, modal) {
        return function ($scope) {
            let href = $scope.currUrl || false;
            if (href) {
                $('.cd-main-content').waitAnimationStart();
                $http({
                    method: "GET",
                    url: href + '/main',
                    dataType: "json",
                    params: {}
                }).then(function successCallback(response) {
                    $('.cd-main-content').waitAnimationStop();
                    response = response.data || {};

                    if (response.success && response.success == true) {
                        $scope.tdmApiKey = response.key || '';
                    }
                }, function errorCallback(response) {
                    $('.cd-main-content').waitAnimationStop();
                    console.log('connection error');
                });
            }
        };
    }]);
