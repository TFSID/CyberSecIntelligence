import {Base64} from "js-base64";

let showInfoAlert = function (scope, modal, title, onHide) {
    onHide = typeof onHide == 'function' ? onHide : false;

    modal.show(scope, {
        title: title,
        size: 'small',
        hideBody: true,
        actions: [{
            label: 'Close',
            cssClass: 'btn btn-outline-danger',
            onClick: function (event) {
                $(event.target).parents('.modal').remove();
                if (onHide) {
                    onHide();
                }
            }
        }],
        onHide: function (event) {
            if (onHide) {
                onHide();
            }
        }
    });
};

module.exports = function (scope, modal, $http) {
    scope.showSigmaChooser = function () {
        let modalClass = 'select-sigma';
        modal.show(scope, {
            title: 'Search Sigma Rules',
            body: `<div sp-select-sigma modal-class="${modalClass}" curr-url="currUrl" curr-sigma="currSigma"></div>`,
            size: 'large',
            actions: [{
                label: "Update <i class='fa fa-refresh'></i>",
                cssClass: 'btn-outline-success',
                onClick: function (e) {
                    $('.cd-main-content').waitAnimationStart();
                    $http({
                        method: "POST",
                        url: scope.currUrl + '/tdm-api-update-sigma',
                        dataType: "json"
                    }).then(function successCallback(response) {
                        $('.cd-main-content').waitAnimationStop();
                        response = response.data || {};
                        if (response.success && response.success == true) {
                            modal.show(scope, {
                                title: 'TDM Updates',
                                size: 'small',
                                body: `<p class="m-b-0"><b>${response.created}</b> Rules created</p>` +
                                      `<p class="m-b-0"><b>${response.updated}</b> Rules updated</p>`,
                                actions: [{
                                    label: 'Done',
                                    cssClass: 'btn btn-outline-danger',
                                    onClick: function (event) {
                                        $(event.target).parents('.modal').remove();
                                    }
                                }],
                                onHide: function (event) {
                                    window.location.reload();
                                }
                            });
                        } else {
                            showInfoAlert(scope, modal, response.message || 'Something went wrong', function () {
                                window.location.reload();
                            });
                        }
                    }, function errorCallback(response) {
                        $('.cd-main-content').waitAnimationStop();
                        showInfoAlert(scope, modal, 'Something went wrong', function () {
                            window.location.reload();
                        });
                    });
                }
            }, {
                label: 'Cancel',
                cssClass: 'btn-outline-danger',
                onClick: function (e) {
                    $(e.target).parents('.modal').modal('hide');
                }
            }, {
                label: 'Open in Editor',
                savingLabel: 'Saving...',
                cssClass: 'btn-submit btn-outline-danger disabled',
                onClick: function (event) {
                    if (!$(event.target).hasClass('disabled')) {
                        $(event.target).parents('.modal').find('.' + modalClass + ' form').trigger('sw.apply_form');
                    }
                }
            }]
        });
    };

    scope.spShowEditApiKey = function () {
        modal.show(scope, {
            title: 'Change TDM API Key',
            body: '<div sp-edit-api-key curr-url="currUrl"></div>',
            size: 'small',
            actions: [{
                label: 'Cancel',
                cssClass: 'btn-outline-danger',
                onClick: function (e) {
                    $(e.target).parents('.modal').modal('hide');
                }
            }, {
                label: 'Save',
                savingLabel: 'Saving...',
                cssClass: 'btn-submit btn-outline-danger',
                onClick: function (event) {
                    if (!$(event.target).hasClass('disabled')) {
                        $(event.target).parents('.modal').trigger('submit-modal');
                    }
                }
            }]
        });
    };

    scope.clearEditor = function () {
        scope.currSigma = {
            json: scope.emptySigmaJson || {},
            sigma_text: scope.emptySigmaText || ''
        };
    };

    scope.exportToSiem = function (siemSlug, siemName) {
        let convertToSiem = 'convert-to-siem';
        modal.show(scope, {
            title: 'Conver to ' + siemName,
            body: `<div sp-convert-to-siem curr-url="currUrl" form-class="${convertToSiem}" siem-slug="${siemSlug}" curr-sigma-text="currSigma.sigma_text" translation="currSigma.translation"></div>`,
            size: 'large',
            actions: (() => {
                let buttons = [];

                buttons.push({
                    label: 'Cancel',
                    cssClass: 'btn btn-outline-danger',
                    onClick: function (e) {
                        $(e.target).parents('.modal').modal('hide');
                    }
                });

                buttons.push({
                    label: 'Copy to clipboard',
                    savingLabel: 'Copying...',
                    cssClass: 'btn btn-submit btn-outline-danger copy-to-clipboard',
                    onClick: function (event) {
                        if (!$(event.target).hasClass('disabled')) {
                            $(event.target).parents('.modal').find(`.${convertToSiem} form`).trigger('sw.apply_form');
                        }
                    }
                });

                if (siemSlug == 'xpack-watcher') {
                    buttons.push({
                        label: 'Deploy Watcher',
                        savingLabel: 'Deploying...',
                        cssClass: 'btn btn-submit btn-danger copy-to-clipboard',
                        onClick: function (event) {
                            if (!$(event.target).hasClass('disabled')) {
                                let watcherContent = Base64.encode(scope.currSigma.translation);

                                modal.show(scope, {
                                    title: 'Confirm Deploying Watcher',
                                    body: '<p class="text-right m-b-0"><button type="button" class="btn btn btn-outline-danger disabled" data-label="Cancel">Customize</button></p>',
                                    size: 'small',
                                    actions: [{
                                        label: 'Close',
                                        cssClass: 'btn btn-outline-danger',
                                        onClick: function (event) {
                                            $(event.target).parents('.modal').remove();
                                        }
                                    }, {
                                        label: 'Deploy',
                                        savingLabel: 'Deploying...',
                                        cssClass: 'btn btn-submit btn-outline-danger',
                                        onClick: function (event) {
                                            if (!$(event.target).hasClass('disabled')) {
                                                $('.cd-main-content').waitAnimationStart();
                                                $http({
                                                    method: "POST",
                                                    url: scope.currUrl + '/sigma-add-watcher',
                                                    dataType: "json",
                                                    params: {
                                                        watcherContent: watcherContent
                                                    }
                                                }).then(function successCallback(response) {
                                                    $('.cd-main-content').waitAnimationStop();
                                                    response = response.data || {};
                                                    if (response.success && response.success == true) {
                                                        showInfoAlert(scope, modal, 'Successfully deployed', function () {
                                                            window.location.reload();
                                                        });
                                                    } else {
                                                        showInfoAlert(scope, modal, 'Something went wrong', function () {
                                                            window.location.reload();
                                                        });
                                                    }
                                                }, function errorCallback(response) {
                                                    $('.cd-main-content').waitAnimationStop();
                                                    showInfoAlert(scope, modal, 'Something went wrong', function () {
                                                        window.location.reload();
                                                    });
                                                });
                                            }
                                        }
                                    }],
                                    onHide: function (event) {
                                        $(event.target).parents('.modal').remove();
                                    }
                                });
                            }
                        }
                    });

                }

                return buttons;
            })()
        });
    };
};