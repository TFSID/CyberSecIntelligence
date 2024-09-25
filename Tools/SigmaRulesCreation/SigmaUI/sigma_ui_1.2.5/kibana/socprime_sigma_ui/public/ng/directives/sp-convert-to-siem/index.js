import {Base64} from 'js-base64';
const copy = require('clipboard-copy');

let $cf = require('./../../../../server/common/function');

import directiveTemplate from './view.html'

const defaultErrorMessage = 'Translation temporarily unavailable';

const addElasticLink = function (element, currUrl, baseIndexId, query) {
    baseIndexId = baseIndexId.replace('index-pattern:', '');
    baseIndexId = baseIndexId.length > 0 ? ",index:'" + baseIndexId + "'" : '';

    query = typeof query == 'string' ? query : '';

    currUrl = currUrl.split('#');
    currUrl = currUrl[0];

    let drilldownLink = currUrl.replace('socprime_sigma_ui', 'kibana');
    drilldownLink += "#/discover?_g=()&_a=(columns:!(_source)" + baseIndexId + ",interval:auto,query:(language:lucene,query:'" + query + "'),sort:!('@timestamp',desc))";
    drilldownLink = encodeURI(drilldownLink);
    drilldownLink = '<a class="btn btn-outline-danger" href="' + drilldownLink + '" target="_blank">View in Discover</a>';

    $(element).parents('.modal').find('.modal-footer').append(drilldownLink);
};

require('ui/modules')
    .get('app/socprime_sigma_ui', [])
    .directive('spConvertToSiem', ['$http', '$timeout', '$route', 'modal', function ($http, $timeout, $route, modal) {
        const preLink = function (scope, element, attributes, controller, transcludeFn) {
            let href = scope.currUrl || false;
            scope.formId = 'form-' + parseInt(Math.random() * 1000);

            scope.translation = false;
            if (href && $cf.isString(scope.siemSlug) && $cf.isString(scope.currSigmaText)) {
                $('.cd-main-content').waitAnimationStart();
                $http({
                    method: "GET",
                    url: href + '/sigma-translation',
                    dataType: "json",
                    params: {
                        siemTo: scope.siemSlug,
                        sigmaText: Base64.encode(scope.currSigmaText)
                    },
                    headers: {'Content-Type': 'application/json'}
                }).then(function successCallback(response) {
                    response = response.data || {};
                    if (response.success && response.success == true && response.data && $cf.isString(response.data.translation)) {
                        scope.translation = Base64.decode(response.data.translation);
                        let baseIndexId = $cf.isString(response.data.baseIndexId) ? response.data.baseIndexId : '';
                        if (scope.siemSlug == 'es-qs') {
                            addElasticLink(element, scope.currUrl, baseIndexId, scope.translation);
                        }
                    } else {
                        $(element).parents('.modal').find('.modal-content .modal-footer .copy-to-clipboard').hide();
                        scope.translation = 'Something went wrong';
                    }

                    $('.cd-main-content').waitAnimationStop();
                }, function errorCallback(response) {
                    $('.cd-main-content').waitAnimationStop();
                    console.log('connection error');
                });
            } else {
                scope.translation = defaultErrorMessage;
            }
        };

        const link = function (scope, element, attrs, controller, transcludeFn) {
            // Form submit processing
            $('body').on('sw.apply_form', '.modal .' + scope.formClass + ' form#' + scope.formId, function (event) {
                copy(scope.translation);
                $(element).parents('.modal').modal('hide');
                modal.show(scope, {
                    title: 'Info',
                    body: 'Translation successfully copied to clipboard',
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
                formClass: '@',
                currUrl: '=',
                siemSlug: '@',
                currSigmaText: '=',
                translation: '=?'
            },
            template: directiveTemplate
        }
    }]);