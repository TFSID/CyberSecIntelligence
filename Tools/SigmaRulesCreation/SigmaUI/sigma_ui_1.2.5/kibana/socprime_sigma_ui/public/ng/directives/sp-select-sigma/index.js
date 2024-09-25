let $cf = require('./../../../../server/common/function');

import functionInit from './functionInit';

import directiveTemplate from './view.html';
import showMenuTemplate from './show-menu-view.html';

require('ui/modules').get('app/socprime_sigma_ui', ['ui.tree']).directive('spSelectSigma', ['$http', function ($http) {
    const preLink = function (scope, element, attributes, controller, transcludeFn) {
        scope.formId = 'form-' + parseInt(Math.random() * 1000);
    };

    const link = function (scope, element, attrs, controller, transcludeFn) {
        scope.list = [];
        scope.totalSigma = 0;
        scope.currentSigma = null;
        scope.currentSigmaText = null;
        let localScope = scope;
        functionInit(localScope, $http);

        scope.sigmaFilter = '';

        scope.loadAllSigmas(scope.sigmaFilter);

        scope.$watch('currentSigma', function (newVal, oldVal) {
            if (newVal && $cf.isString(newVal.sigma_text)) {
                let sigmaText = '' + newVal.sigma_text;
                if ($cf.isString(scope.sigmaFilter)) {
                    sigmaText = sigmaText.split(scope.sigmaFilter).join(`<span class="badge-danger">${scope.sigmaFilter}</span>`);
                }
                scope.currentSigmaText = sigmaText;
                $(`body .modal .select-sigma form#${scope.formId}`).parents('.modal-content').find('.modal-footer .btn.btn-submit').removeClass('disabled');
            } else {
                scope.currentSigmaText = null;
            }
        }, true);

        // Form submit processing
        $('body').on('sw.apply_form', `.modal .select-sigma form#${scope.formId}`, function (event) {
            if (scope.currentSigma) {
                scope.$apply(function () {
                    scope.currSigma = scope.currentSigma;
                    $(element).parents('.modal').modal('hide');
                });
            }
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
            modalClass: '@',
            currSigma: '=',
            currUrl: '=?'
        },
        template: directiveTemplate
    }
}]).directive('spShowMenu', [function () {
    return {
        link: function (scope, element, attrs, controller, transcludeFn) {
            scope.handleSigmaClick = function () {
                scope.collapsed = !scope.collapsed;
                scope.$treeScope.$callbacks.toggle(scope.collapsed, scope);
            };
        },
        scope: {
            items: '=',
            loadSigma: '='
        },
        template: showMenuTemplate
    }
}]);