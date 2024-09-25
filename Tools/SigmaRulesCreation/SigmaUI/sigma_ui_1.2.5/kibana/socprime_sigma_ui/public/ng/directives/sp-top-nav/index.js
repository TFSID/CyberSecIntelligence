import chrome from 'ui/chrome';
import directiveTemplate from './view.html'

const getCurrentPage = function (route) {
    let page = '';
    if (route.indexOf('\/') > -1) {
        page = 'main';
    }
    return page;
};

require('ui/modules')
    .get('app/socprime_sigma_ui', [])
    .directive('spTopNav', ['$rootScope', '$location', '$routeParams', function ($rootScope, $location, $routeParams) {
        const link = function (scope, element, attrs, controller, transcludeFn) {
            scope.basePath = chrome.getBasePath() || '/';
            scope.basePath = scope.basePath == '/' ? '' : scope.basePath;
            scope.currentPage = getCurrentPage($location.path());
            $rootScope.$on('$routeChangeSuccess', function (e, current, pre) {
                scope.currentPage = getCurrentPage($location.path());
            });
        };

        return {
            link: link,
            template: directiveTemplate
        }
    }]);
