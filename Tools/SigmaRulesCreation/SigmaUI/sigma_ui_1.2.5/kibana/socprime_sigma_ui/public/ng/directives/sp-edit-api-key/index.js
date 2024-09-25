import {Base64} from "js-base64";
import directiveTemplate from './view.html'

require('ui/modules').get('app/soc_workflow', []).directive('spEditApiKey', [
    '$http',
    '$route',
    'modal',
    function ($http, $route, modal) {
        const preLink = function (scope, element, attributes, controller, transcludeFn) {
            scope.key = '';
            scope.keyError = false;
        };

        /**
         * @param scope
         * @param element
         * @param attrs
         * @param controller
         * @param transcludeFn
         */
        const link = function (scope, element, attrs, controller, transcludeFn) {
            $(document).ready(function () {
                let href = typeof scope.currUrl == 'string' ? scope.currUrl : false;
                if (href) {
                    $http({
                        method: "POST",
                        url: href + '/get-tdm-api-key',
                        dataType: "json"
                    }).then(function successCallback(response) {
                        response = response.data || {};
                        if (response.success && response.success == true) {
                            scope.key = response.key;
                        }
                    }, function errorCallback(response) {
                        console.log('connection error');
                    });
                }

                $(element).parents('.modal').on('submit-modal', function (event) {
                    if (href) {
                        scope.$apply(() => {
                            scope.keyError = true;
                        });

                        if (typeof scope.key == 'string' && scope.key.length > 0) {
                            scope.$apply(() => {
                                scope.keyError = false;
                            });

                            $http({
                                method: "POST",
                                url: href + '/set-tdm-api-key',
                                dataType: "json",
                                data: {
                                    key: Base64.encode(scope.key)
                                }
                            }).then(function successCallback(response) {
                                response = response.data || {};
                                if (response.success && response.success == true) {
                                    modal.show(scope, {
                                        body: '<h5>TDM API Key was changed!</h5>',
                                        size: 'small',
                                        actions: [{
                                            label: 'Close',
                                            cssClass: 'btn btn-outline-danger',
                                            onClick: function (e) {
                                                $route.reload();
                                            }
                                        }],
                                        onHide: function () {
                                            $route.reload();
                                        }
                                    });
                                }
                            }, function errorCallback(response) {
                                console.log('connection error');
                            });
                        }
                    }
                });
            });
        };

        return {
            compile: function (element, attributes) {
                return {
                    pre: preLink,
                    post: link
                }
            },
            scope: {
                currUrl: '=',
            },
            template: directiveTemplate
        }
    }]);
