var CustomJSONEditor = require('../../../assets/plugins/jsoneditor/jsoneditor.js');

$(document).ready(function () {
    let sigmaMitreContainer = $('.sigma-mitre-container');
    let visualEditorContainer = document.getElementById("sigma-visual-editor");
    let codeEditorContainer = document.getElementById("sigma-code-editor");
    let generateCodeEditorButton = $('.generate-code-editor');
    let generateVisualEditorButton = $('.generate-visual-editor');
    let saveSigmaDocumentHref = $('a.save-sigma-document');
    let saveSigmaDocumentButton = $(saveSigmaDocumentHref).find('> button');
    let downloadButton = $('.download-report').closest('.btn-group').find('> button');
    let lockWidget = $('a.lock-widget');

    window.codeEditor = null;
    window.visualEditor = null;

    let schema = {};
    let json = {};

    let currentJson = json;
    let sigmaAutoSavedId = 'sigmaAutoSavedId';

    let validateVisualEditor = function () {
        setTimeout(function () {
            if (window.visualEditor.errorNodes && window.visualEditor.errorNodes.length) {
                $(saveSigmaDocumentButton).addClass('disabled');
                $(saveSigmaDocumentHref).addClass('disabled');
                $(downloadButton).addClass('disabled');
            } else {
                $(saveSigmaDocumentButton).removeClass('disabled');
                $(saveSigmaDocumentHref).removeClass('disabled');
                $(downloadButton).removeClass('disabled');
            }
        }, 200);
    };

    let visualEditorOptions = {
        sortObjectKeys: false,
        navigationBar: false,
        name: 'SIGMA',
        modes: ['tree'],
        schema: schema,
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
                currentJson = window.visualEditor.get();

                validateVisualEditor();

                $(window.codeEditor.container).closest('.code-editor').find('.editor-overlay').removeClass('hidden');

            } catch (e) {
                console.log(e);
            }
        },
        templates: '[]'
    };

    let calculateCodeEditorLimit = function () {
        let sourceCodeEditorLimit = 5000;
        let sourceCodeEditorLimitContainer = $('.source-code-editor-limit-container');
        let currentValue = window.codeEditor.aceEditor.getValue();

        $(sourceCodeEditorLimitContainer).text('0 / ' + sourceCodeEditorLimit);

        if (currentValue.length > 0) {
            if (currentValue.length > sourceCodeEditorLimit) {
                let previousPosition = window.codeEditor.aceEditor.getCursorPosition();

                currentValue = currentValue.substring(0, sourceCodeEditorLimit);
                window.codeEditor.aceEditor.setValue(currentValue);

                window.codeEditor.aceEditor.selection.moveTo(previousPosition.row, previousPosition.column);
            }

            $(sourceCodeEditorLimitContainer).text(currentValue.length + ' / ' + sourceCodeEditorLimit);
        }
    };

    let codeEditorOptions = {
        //modes: ['yaml'],
        modes: ['code'],
        schema: schema,
        onChange: function () {
            try {
                currentJson = window.codeEditor.get();

                setTimeout(function () {
                    if ($(window.codeEditor.container).find('.error-footer').length) {
                        $(saveSigmaDocumentButton).addClass('disabled');
                        $(saveSigmaDocumentHref).addClass('disabled');
                        $(downloadButton).addClass('disabled');
                    } else {
                        $(saveSigmaDocumentButton).removeClass('disabled');
                        $(saveSigmaDocumentHref).removeClass('disabled');
                        $(downloadButton).removeClass('disabled');
                    }
                }, 500);

                $(window.visualEditor.container).closest('.code-editor').find('.editor-overlay').removeClass('hidden');

                calculateCodeEditorLimit();
            } catch (e) {
                console.log(e);
            }
        }
    };

    try {
        window.visualEditor = new CustomJSONEditor(visualEditorContainer, visualEditorOptions, json);
    } catch (e) {
        console.log(e);
    }
    validateVisualEditor();

    try {
        window.codeEditor = new CustomJSONEditor(codeEditorContainer, codeEditorOptions, ' ');
        window.codeEditor.aceEditor.setValue('');
        window.codeEditor.aceEditor.session.setOption("useWorker", false);
    } catch (e) {
        console.log(e);
    }

    let generateCodeEditorFunction = function (withMessage) {
        currentJson = window.visualEditor.get();
        let visualEditorData = currentJson;
        let mitre = typeof visualEditorData['mitre-attack'] == 'object' ? visualEditorData['mitre-attack'] : {};

        let editorOverlay = $(window.codeEditor.container).closest('.code-editor').find('.editor-overlay');
        let icon = $(editorOverlay).find('a i');
        let isHidden = $(editorOverlay).hasClass('hidden');

        /*$.ajax({
            url: 'sigma-action/convert',
            type: "POST",
            data: {
                'source': visualEditorData,
                'toYaml': true
            },
            dataType: 'json',
            beforeSend: function () {
                if (isHidden) {
                    $(codeEditorContainer).waitAnimationStart({
                        zIndex: 100
                    });
                } else {
                    $(icon).addClass('fa-spin');
                }
            },
            success: function (json) {
                if (json.success) {
                    window.codeEditor.set(json.data);

                    $(window.visualEditor.container).closest('.code-editor').find('.editor-overlay').addClass('hidden');
                    $(window.codeEditor.container).closest('.code-editor').find('.editor-overlay').addClass('hidden');

                    if (withMessage) {
                        initSetMitreValue(mitre);

                        $(document).createNotify("Code successfully generated", {
                            className: 'success'
                        });
                    }

                    calculateCodeEditorLimit();
                }
            },
            complete: function () {
                if (isHidden) {
                    $(codeEditorContainer).waitAnimationStop();
                } else {
                    $(icon).removeClass('fa-spin');
                    $(editorOverlay).addClass('hidden');
                }
            }
        });*/
    };

    $(generateCodeEditorButton).on('click', function () {
        generateCodeEditorFunction(true);
    });

    generateCodeEditorFunction();

    let generateVisualEditorFunction = function () {
        currentJson = window.codeEditor.get();
        let codeEditorContent = currentJson;
        let mitre = typeof codeEditorContent['mitre-attack'] == 'object' ? codeEditorContent['mitre-attack'] : {};

        let editorOverlay = $(window.visualEditor.container).closest('.code-editor').find('.editor-overlay');
        let icon = $(editorOverlay).find('a i');
        let isHidden = $(editorOverlay).hasClass('hidden');

        $.ajax({
            url: 'sigma-action/convert',
            type: "POST",
            data: {
                'source': codeEditorContent
            },
            dataType: 'json',
            beforeSend: function () {
                if (isHidden) {
                    $(visualEditorContainer).waitAnimationStart({
                        zIndex: 100
                    });
                } else {
                    $(icon).addClass('fa-spin');
                }
            },
            success: function (json) {
                if (json.success) {
                    initSetMitreValue(mitre);
                    window.visualEditor.set(json.data);

                    $(window.visualEditor.container).closest('.code-editor').find('.editor-overlay').addClass('hidden');
                    $(window.codeEditor.container).closest('.code-editor').find('.editor-overlay').addClass('hidden');

                    $(document).createNotify("Code successfully generated", {
                        className: 'success'
                    });
                }
            },
            complete: function () {
                if (isHidden) {
                    $(visualEditorContainer).waitAnimationStop();
                } else {
                    $(icon).removeClass('fa-spin');
                    $(editorOverlay).addClass('hidden');
                }
            }
        });
    };

    $(generateVisualEditorButton).on('click', function () {
        generateVisualEditorFunction();
    });

    $(sigmaMitreContainer).on('click', '.add-to-sigma', function (event) {
        let mitre = getMitreValue();

        let code = currentJson;
        code['mitre-attack'] = mitre;

        window.visualEditor.set(code);
        $(window.visualEditor.container).closest('.code-editor').find('.editor-overlay').addClass('hidden');

        generateCodeEditorFunction(true);
    });

    $('a.choose-sigma-document').on('click', function () {
        let href = $(this).prop('href');
        $(window).createBootstrapConfirm({
            title: 'Attention',
            message: 'You are about to choose existing SIGMA Rules. All unsaved data will be lost.<br>Are you sure?',
            cancelLabel: 'Cancel',
            okLabel: 'Ok',
            okCallback: function () {
                window.location.href = href;
            }
        });
        return false;
    });

    $('a.create-sigma-document').on('click', function () {
        let href = $(this).prop('href');
        $(window).createBootstrapConfirm({
            title: 'Attention',
            message: 'You are about to create a new SIGMA Rule. All unsaved data will be lost.<br>Are you sure?',
            cancelLabel: 'Cancel',
            okLabel: 'Ok',
            okCallback: function () {
                window.location.href = href;
            }
        });
        return false;
    });

    $('a.make-sigma-document-verify').on('click', function () {
        let href = $(this).prop('href');
        let verifyDir = $(this).attr('data-dir');
        $(window).createBootstrapConfirm({
            title: 'Attention',
            message: 'You are about to change SIGMA Rule verification status.<br>Are you sure?',
            cancelLabel: 'Cancel',
            okLabel: 'Ok',
            okCallback: function () {
                $.ajax({
                    url: href,
                    type: "POST",
                    data: {
                        'verifyDir': verifyDir,
                        'id': 'sigma_id'
                    },
                    dataType: 'json',
                    beforeSend: function () {
                        $('.wrapper').waitAnimationStart();
                    },
                    success: function (json) {
                        if (json.success) {
                            $('#preloader').show();
                            window.location.reload();
                        }
                    },
                    complete: function () {
                        $('.wrapper').waitAnimationStop();
                    }
                });
            }
        });
        return false;
    });

    let sentDownloadRequest = false;

    $(".dropdown-menu.download-report a").on('click', function (event) {
        let href = $(this).prop('href');
        if (href && !sentDownloadRequest) {
            sentDownloadRequest = true;

            try {
                $.ajax({
                    url: href,
                    type: "POST",
                    data: {
                        'json': currentJson
                    },
                    dataType: 'json',
                    success: function (json) {
                        if (json.success) {
                            if (json.queryString) {
                                let copyButton = '<button class="btn btn-outline-success pull-right clipboard-query-element-button" title="Press to Copy">Copy <i class="fa fa-clone" style="font-size: 90%;" aria-hidden="true"></i></button>' +
                                    '<textarea class="clipboard-query-element-input">' + json.content + '</textarea>' +
                                    '<script type="text/javascript">\n' +
                                    '   $(document).ready(function () {\n' +
                                    '       let button = document.querySelector(".clipboard-query-element-button");\n' +
                                    '       button.addEventListener("click", function(event) {' +
                                    '           let element = document.querySelector(".clipboard-query-element-input");\n' +
                                    '           element.select();\n' +
                                    '           try {  \n' +
                                    '               let successful = document.execCommand("copy");  \n' +
                                    '               if (successful) {' +
                                    '                    $(document).createNotify("Query successfully copied", {\n' +
                                    '                        className: \'success\'\n' +
                                    '                    });' +
                                    '               }' +
                                    '           } catch(err) {  \n' +
                                    '           }  ' +
                                    '        });\n' +
                                    '    });\n' +
                                    '<\/script>';

                                let noticeMessage = '';

                                if (json.noticeMessage) {
                                    noticeMessage = '<div class="soc-yellow" style="font-size: 16px;padding-bottom: 23px;padding-top: 10px;"><b>Notice</b>:<br/>' + json.noticeMessage + '</div>';
                                }

                                let linkCode = '';

                                if (json.link) {
                                    linkCode = '<a href="' + json.link + '" target="_blank" style="margin-bottom: 19px;line-height: 21px;display: block;color: #969696;text-decoration: underline;word-wrap: break-word;">' + json.link + '</a>';
                                }

                                $(window).createBootstrapAlert({
                                    title: json.reportName ? json.reportName : 'Message',
                                    message: '<div class="sigma-clipboard-query-element-container">' +
                                    noticeMessage +
                                    '<h4 class="mt-0 header-title">' + json.reportDescription + '</h4>' +
                                    linkCode +
                                    '<code>' + json.content + '</code>' + copyButton + '</div>',
                                    okLabel: 'Ok'
                                });
                            } else {
                                setStreamData(json.content, 'application/octet-stream', json.filename);
                            }
                        } else {
                            if (json.message) {
                                alert(json.message);
                            }
                        }
                    },
                    error: function (json) {
                        if (json.statusText) {
                            alert('Error');
                        }
                    },
                    complete: function () {
                        sentDownloadRequest = false;
                    }
                });
            } catch (e) {
                sentDownloadRequest = false;
                return false;
            }
        }

        return false;
    });

    let sentSavedRequest = false;

    $(saveSigmaDocumentHref).on('click', function (event) {
        if (!sentSavedRequest && !$(this).hasClass('disabled')) {
            sentSavedRequest = true;

            let $this = this;

            $.ajax({
                url: 'sigma-action/pre-save',
                type: "POST",
                data: {
                    'json': currentJson
                },
                dataType: 'json',
                beforeSend: function () {
                    $($this).find('button').attr('data-loading-text', " savingText <i class='fa fa-floppy-o m-l-5' aria-hidden='true'></i>").customButtonLoading();
                },
                success: function (json) {
                    if (json.success) {
                        let id = 'savesigma12123123';

                        $('body').append('<a id="' + id + '" href="sigma-action/save/id-sigma_id||0"  data-target="#formModal" data-toggle="modal" data-backdrop="static"></a>');

                        $('#' + id).click();

                        setTimeout(function () {
                            $('body').find('#' + id).detach();
                        }, 1000);
                    }
                },
                complete: function () {
                    setTimeout(function () {
                        sentSavedRequest = false;

                        $($this).find('button').customButtonReset();
                        $($this).find('button').find('div').detach();
                    }, 1000);
                }
            });
        }

        return false;
    });

    let resizeGridStackVisualEditor = function () {
        let gridStackItemContainer = $(visualEditorContainer).closest('.grid-stack-item-content');
        let headerContainer = $(gridStackItemContainer).find('.controls');
        let footerContainer = $(gridStackItemContainer).find('.foot-list');

        $(visualEditorContainer).css({
            'height': 'auto'
        });

        let gridStackItemContainerHeight = $(gridStackItemContainer).height();
        let headerContainerHeight = $(headerContainer).outerHeight();
        let footerContainerHeight = $(footerContainer).outerHeight();

        let calculatedHeight = gridStackItemContainerHeight - headerContainerHeight - footerContainerHeight;

        if (calculatedHeight > 0) {
            $(visualEditorContainer).css({
                'height': calculatedHeight + 'px'
            });
        } else {
            $(visualEditorContainer).css({
                'height': 'auto'
            });
        }
    };

    let resizeGridStackSourceCodeEditor = function () {
        let gridStackItemContainer = $(codeEditorContainer).closest('.grid-stack-item-content');
        let headerContainer = $(gridStackItemContainer).find('.controls');
        let header2Container = $(gridStackItemContainer).find('.embed-nav');
        let footerContainer = $(gridStackItemContainer).find('.foot-list');

        $(codeEditorContainer).css({
            'height': 'auto'
        });

        let gridStackItemContainerHeight = $(gridStackItemContainer).height();
        let headerContainerHeight = $(headerContainer).outerHeight();
        let header2ContainerHeight = $(header2Container).outerHeight();
        let footerContainerHeight = $(footerContainer).outerHeight();

        let calculatedHeight = gridStackItemContainerHeight - headerContainerHeight - header2ContainerHeight - footerContainerHeight;

        if (calculatedHeight > 0) {
            $(codeEditorContainer).css({
                'height': calculatedHeight + 'px'
            });
        } else {
            $(codeEditorContainer).css({
                'height': 'auto'
            });
        }

        window.codeEditor.resize();
    };

    let resizeGridStackMitreAttack = function (item) {
        let bodyLinksContainer = $(item).find('.sigma-mitre-container').find('#faq-links');

        let bodyLinksContainerHeight = $(bodyLinksContainer).outerHeight();

        let grid = $(gridStack).data('gridstack');

        if ($(window).width() >= 1100) {
            if (bodyLinksContainerHeight < 100) {
                grid.minHeight(item, 4);
                grid.resize(item);
            } else if (bodyLinksContainerHeight >= 100 && bodyLinksContainerHeight < 200) {
                grid.minHeight(item, 5);
                grid.resize(item);
            } else if (bodyLinksContainerHeight >= 200 && bodyLinksContainerHeight < 300) {
                grid.minHeight(item, 6);
                grid.resize(item);
            } else if (bodyLinksContainerHeight >= 300 && bodyLinksContainerHeight < 400) {
                grid.minHeight(item, 7);
                grid.resize(item);
            } else if (bodyLinksContainerHeight >= 400 && bodyLinksContainerHeight < 500) {
                grid.minHeight(item, 8);
                grid.resize(item);
            } else if (bodyLinksContainerHeight >= 500 && bodyLinksContainerHeight < 600) {
                grid.minHeight(item, 9);
                grid.resize(item);
            }
        } else {
            grid.minHeight(item, 4);
            grid.resize(item);
        }
    };

    let gridStackSelector = $('.grid-stack');

    let gridStackParams = {
        cellHeight: 90,
        animate: true,
        minWidth: 1100,
        draggable: {
            handle: 'i.fa.fa-arrows-alt.accordion'
        }
    };

    let gridStack = $(gridStackSelector).gridstack(gridStackParams);

    gridStack.on('change', function (event, items) {
        setGridStackWidgets();
    }).on('gsresizestop', function (event, items) {
        if ($(items).find('.sigma-mitre-container').length) {
            resizeGridStackMitreAttack($(items));
        }

        if ($(items).find('#sigma-code-editor').length) {
            window.codeEditor.resize();
        }

        setTimeout(function () {
            $(window).trigger('resize');

            setGridStackWidgets();
        }, 500);
    });

    $(lockWidget).on('click', function (e) {
        let isLocked = $(this).hasClass('locked');

        let elements = $('.grid-stack-item');

        if (elements.length) {
            let grid = $(gridStack).data('gridstack');

            $.each(elements, function (index, item) {
                if (isLocked) {
                    $(item).find('.controls .fa.fa-arrows-alt.accordion').removeClass('disabled');
                } else {
                    $(item).find('.controls .fa.fa-arrows-alt.accordion').addClass('disabled');
                }

                grid.locked(item, !isLocked);
                grid.resizable(item, isLocked);
                grid.movable(item, isLocked);
            });

            let message = '';
            if (isLocked) {
                $(this).removeClass('locked');
                $(this).find('span').text('Lock Workspace');

                message = 'Workspace successfully unlocked';
            } else {
                $(this).addClass('locked');
                $(this).find('span').text('Unlock Workspace');

                message = "Workspace successfully locked";
            }

            $(document).createNotify(message, {
                className: 'success'
            });

            setGridStackWidgets();
        }

        return false;
    });

    let setGridStackWidgets = function () {
        let res = $.map($('.grid-stack .grid-stack-item:visible'), function (el) {
            el = $(el);
            let node = el.data('_gridstack_node');

            if (node) {
                return {
                    id: el.data('gs-id'),
                    x: node.x,
                    y: node.y,
                    width: node.width,
                    height: node.height,
                    locked: node.locked
                };
            }
        });

        $.ajax({
            url: 'sigma-action/set-grid-stack-widgets',
            dataType: 'json',
            type: 'POST',
            data: {
                json: res
            }
        });
    };

    $(window).on('resize', function () {
        let elem = $('.sigma-grid-stack-item');

        if (elem.length) {
            resizeGridStackMitreAttack(elem[0]);
        }

        resizeGridStackVisualEditor();
        resizeGridStackSourceCodeEditor();
    });

    resizeGridStackVisualEditor();
    resizeGridStackSourceCodeEditor();

    /*$.ajax({
        url: 'sigma-action/generate-mitre',
        type: "POST",
        data: {
            'searchLog': false
        },
        dataType: 'html',
        beforeSend: function () {
            if ($(sigmaMitreContainer).height() < 54) {
                $(sigmaMitreContainer).addClass('card').css({
                    'margin-top': 0
                });
                $(sigmaMitreContainer).css({
                    height: $(sigmaMitreContainer).closest('.grid-stack-item-content').height() + 'px'
                });
            }

            $(sigmaMitreContainer).waitAnimationStart({
                zIndex: 100
            });
        },
        success: function (data) {
            $(sigmaMitreContainer).html(data);

            let elem = $('.sigma-grid-stack-item');

            if (elem.length) {
                resizeGridStackMitreAttack(elem[0]);
            }
        },
        complete: function () {
            $(sigmaMitreContainer).removeClass('card');
            $(sigmaMitreContainer).waitAnimationStop();
            $(sigmaMitreContainer).css({
                height: '100%'
            });
        }
    });*/

    let currentJsonInit = currentJson;

    setInterval(function () {
        if (currentJsonInit != currentJson) {
            currentJsonInit = currentJson;

            $.ajax({
                url: 'sigma-auto-save/save',
                type: "POST",
                data: {
                    'json': currentJsonInit,
                    'sigmaId': 'sigma_id',
                    'sigmaAutoSavedId': sigmaAutoSavedId
                },
                dataType: 'json',
                success: function (json) {
                    if (json.sigmaAutoSavedId) {
                        sigmaAutoSavedId = json.sigmaAutoSavedId
                    }
                }
            });
        }
    }, 5000);

    window.onbeforeunload = function (e) {
        if (sigmaAutoSavedId) {
            let dialogText = 'If you reload this page, all unsaved data will be lost. Are you sure?';
            e.returnValue = dialogText;
            return dialogText;
        }
    };

    let initSetMitreValue = function (mitre) {
        if (typeof setMitreValue !== 'undefined' && $.isFunction(setMitreValue)) {
            setMitreValue(mitre);
        }
    };

    let initGetMitreValue = function () {
        let result = [];
        if (typeof getMitreValue !== 'undefined' && $.isFunction(getMitreValue)) {
            result = getMitreValue();
        }

        return result;
    };
});