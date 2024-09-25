let $cf = require('./../../../../server/common/function');
let shajs = require('sha.js');
let helpersInitGetEditorSchema = require('./../../helpers/init/getEditorSchema');
let CustomJSONEditor = require('../../../assets/plugins/jsoneditor/jsoneditor.js');

import directiveTemplate from './view.html'

const initEditor = function (scope, editorContainer) {
    scope.safeApply = function (fn) {
        var phase = this.$root.$$phase;
        if (phase == '$apply' || phase == '$digest') {
            if (fn && (typeof(fn) === 'function')) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };

    let visualEditor = null;
    let content = scope.content || '';
    let visualEditorOptions = {
        sortObjectKeys: false,
        navigationBar: false,
        name: 'SIGMA',
        modes: ['tree'],
        schema: helpersInitGetEditorSchema(),
        onEditable: function (node) {
            if (node.path && node.path.length == 1) {
                switch (node.path[0]) {
                    case 'title':
                    case 'status':
                    case 'description':
                    case 'author':
                    case 'logsource':
                    case 'detection':
                    case 'fields':
                    case 'falsepositives':
                    case 'level':
                        return {
                            field: false,
                            value: true,
                            path: node.path
                        };
                }
            }

            return true;
        },
        onChange: function () {
            try {
                let updatedContent = scope.content;
                scope.localCahges = true;
                try {
                    if (typeof window.visualEditor != 'undefined') {
                        updatedContent = window.visualEditor.get();
                    }
                } catch (e) {
                    console.log(e);
                }
                if (updatedContent !== scope.content) {
                    scope.safeApply(function () {
                        scope.content = updatedContent;
                    });
                }
            } catch (e) {
                console.log(e);
            }
        },
        templates: '[]'
    };

    try {
        visualEditor = new CustomJSONEditor(editorContainer, visualEditorOptions, content);
        visualEditor.set(content);
    } catch (e) {
        console.log(e);
    }

    return visualEditor;
};

const updateEditorHeight = function (editorContainer) {
    try {
        let gridStackItemContainer = $(editorContainer).closest('.grid-stack-item-content');
        let gridStackItemContainerHeight = $(gridStackItemContainer).height();
        let headerContainerHeight = $(gridStackItemContainer).find('.controls').outerHeight();
        let header2ContainerHeight = $(gridStackItemContainer).find('.embed-nav').outerHeight();
        let footerContainerHeight = $(gridStackItemContainer).find('.foot-list').outerHeight();

        $(editorContainer).css({'height': 'auto'});

        let calculatedHeight = gridStackItemContainerHeight - headerContainerHeight - header2ContainerHeight - footerContainerHeight;

        if (calculatedHeight > 0) {
            $(editorContainer).css({
                'height': calculatedHeight + 'px'
            });
        } else {
            $(editorContainer).css({
                'height': 'auto'
            });
        }
    } catch (e) {
        console.log(e);
    }
};

require('ui/modules')
    .get('app/socprime_sigma_ui', [])
    .directive('spVisualEditor', ['$timeout', function ($timeout) {
        const preLink = function (scope, element, attributes, controller, transcludeFn) {
            scope.editorId = 'sigma-visual-editor';
            scope.lengthCount = 0;
        };

        const link = function (scope, element, attrs, controller, transcludeFn) {
            scope.localCahges = false;

            $timeout(function () {
                window.visualEditor = initEditor(scope, document.getElementById(scope.editorId));
                updateEditorHeight(document.getElementById(scope.editorId));
            });

            scope.$watch('content', function (newVal, oldVal) {
                if (newVal !== oldVal) {
                    if (!scope.localCahges) {
                        scope.lengthCount = typeof newVal == 'string' ? newVal.length : 0;
                        try {
                            window.visualEditor.set(newVal);
                        } catch (e) {
                            console.log(e);
                        }
                    }
                    scope.localCahges = false;
                    updateEditorHeight(document.getElementById(scope.editorId));
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
                content: '=?',
                showUpdate: '=?',
                updateHandler: '=?',
            },
            template: directiveTemplate
        }
    }]);