import chrome from 'ui/chrome';
require('jquery.cookie');

let $cf = require('./../../../server/common/function');

let configSiemExportList = require('./../config/siemExportList');

const switchTheme = require('./../helpers/common/switch-theme');
const helpersInitSyncEditors = require('./../helpers/init/sync-editors');
const helpersInitFunctionsMain = require('./../helpers/init/functions/main');

let themeCookie = $.cookie('theme');

const app = require('ui/modules').get('app/socprime_sigma_ui', []).controller('MainController', [
    '$scope',
    '$http',
    '$timeout',
    '$location',
    'modal',
    'spInitMainPage',
    function ($scope, $http, $timeout, $location, modal, spInitMainPage) {
        $scope.basePath = chrome.getBasePath() || '';
        $scope.basePath = $scope.basePath == '/' ? '' : $scope.basePath;
        let currUrl = $location.$$absUrl;
        currUrl = currUrl.split('#');
        $scope.currUrl = currUrl[0] || '';
        $scope.themeCookie = themeCookie;
        $scope.emptySigmaText = 'title: ""\n' + 'description: ""\n' + 'author: ""\n' + 'status: ""\n' + 'logsource:\n' +
            '  product: ""\n' + '  service: ""\n' + 'detection:\n' + '  condition: ""\n' + 'fields:\n' +
            '- ""\n' + 'falsepositives:\n' + '- ""\n' + 'level: ""';
        $scope.emptySigmaJson = {"title": "", "description": "", "author": "", "status": "", "logsource": {"product": "", "service": ""}, "detection": {"condition": ""}, "fields": [""], "falsepositives": [""], "level": ""};
        $scope.currSigma = {
            json: $scope.emptySigmaJson,
            sigma_text: $scope.emptySigmaText,
            translation: ''
        };

        $scope.tdmApiKey = '';

        $scope.siemExportList = configSiemExportList;

        switchTheme($scope);

        helpersInitSyncEditors($scope);

        helpersInitFunctionsMain($scope, modal, $http);

        // Init section
        angular.element(document).ready(() => {
            spInitMainPage($scope);
        });

        $timeout(function () {
            $('.grid-stack').gridstack({
                cellHeight: 90,
                animate: true,
                minWidth: 1100,
                draggable: {
                    handle: 'i.fa.fa-arrows-alt.accordion'
                }
            });
        });
    }])
    .filter('joinBy', function () {
        return function (input, delimiter) {
            if ($cf.isArray(input)) {
                return input.join(delimiter || ',');
            } else {
                let result = [];
                for (let oneRow in input) {
                    result.push(oneRow + ': ' + ($cf.isString(input[oneRow]) ? input[oneRow] : JSON.stringify(input[oneRow])));
                }
                return result.join('; ');
            }
        };
    });

