import directiveTemplate from './view.html'

require('ui/modules')
    .get('app/socprime_sigma_ui', [])
    .directive('spFooter', ['$rootScope', '$location', '$route', '$routeParams', '$http', 'modal', function ($rootScope, $location, $route, $routeParams, $http, modal) {
        const link = function (scope, element, attrs, controller, transcludeFn) {
            scope.LICENSE = '';

            let alertPattern = {
                title: '',
                body: '',
                actions: [{
                    label: 'Close',
                    cssClass: 'btn btn-outline-danger',
                    onClick: function (event) {
                        $(event.target).parents('.modal').remove();
                    }
                }],
                onHide: function (event) {
                    $(event.target).parents('.modal').remove();
                }
            };

            let href = scope.currUrl ? scope.currUrl : null;
            if (href) {
                $http({
                    method: "GET",
                    url: href + '/get-file',
                    dataType: "json",
                    params: {
                        file: '/../../../LICENSE'
                    }
                }).then(function successCallback(response) {
                    response = response.data || {};
                    if (response.success && response.success == true && response.text) {
                        scope.LICENSE = response.text;
                    }
                }, function errorCallback(response) {
                    console.log('connection error');
                });
            }

            scope.showLicenseModal = function () {
                modal.show(scope, Object.assign({}, alertPattern, {
                    title: 'LICENSE',
                    body: '<div ng-bind-html="LICENSE"></div>',
                    size: 'middle',
                    customClass: 'license-modal'
                }));
            }
        };

        return {
            link: link,
            scope: {
                'currUrl': '=',
            },
            template: directiveTemplate
        }
    }]);
