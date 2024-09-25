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

    let codeEditor = null;
    let content = scope.content || '';
    let codeEditorOptions = {
        //modes: ['yaml'],
        modes: ['code'],
        schema: helpersInitGetEditorSchema(),
        onChange: function () {
            let updatedContent = scope.content;
            try {
                if (typeof window.codeEditor != 'undefined') {
                    updatedContent = window.codeEditor.getText();
                }
            } catch (e) {
                console.log(e);
            }
            if (updatedContent !== scope.content) {
                scope.safeApply(function () {
                    scope.content = updatedContent;
                });
            }
        }
    };

    try {
        codeEditor = new CustomJSONEditor(editorContainer, codeEditorOptions, content);
        codeEditor.aceEditor.setValue(content, 1);
        codeEditor.aceEditor.session.setOption("useWorker", false);
        codeEditor.aceEditor.setWrapBehavioursEnabled(false);
    } catch (e) {
        console.log(e);
    }

    return codeEditor;
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

        if (typeof window.codeEditor != 'undefined') {
            window.codeEditor.resize();
        }
    } catch (e) {
        console.log(e);
    }
};

require('ui/modules')
    .get('app/socprime_sigma_ui', [])
    .directive('spYamlEditor', ['$timeout', function ($timeout) {
        const preLink = function (scope, element, attributes, controller, transcludeFn) {
            scope.editorId = 'sigma-code-editor';
            scope.sigmaHash = false;
            scope.lengthCount = typeof scope.content == 'string' ? scope.content.length : 0;
        };

        const link = function (scope, element, attrs, controller, transcludeFn) {
            $timeout(function () {
                window.codeEditor = initEditor(scope, document.getElementById(scope.editorId));
                updateEditorHeight(document.getElementById(scope.editorId));
                scope.sigmaHash = $cf.isString(scope.content) ? shajs('sha256').update(scope.content).digest('hex') : false;
            });

            scope.$watch('content', function (newVal, oldVal) {
                if (newVal !== oldVal) {
                    scope.lengthCount = typeof newVal == 'string' ? newVal.length : 0;
                    try {
                        let prevCursorPosition = window.codeEditor.aceEditor.getCursorPosition();
                        window.codeEditor.aceEditor.setValue(newVal, 1);
                        window.codeEditor.aceEditor.moveCursorToPosition(prevCursorPosition);
                    } catch (e) {
                        console.log(e);
                    }

                    updateEditorHeight(document.getElementById(scope.editorId));
                    scope.sigmaHash = $cf.isString(scope.content) ? shajs('sha256').update(scope.content).digest('hex') : false;
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