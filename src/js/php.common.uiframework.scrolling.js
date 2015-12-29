'use strict';

angular.module('com.bendani.php.common.uiframework')
    .provider('ScrollingService', function ScrollingServiceProvider() {

        function ScrollingService($window) {
            var pathsToSave = [];
            var scrollPositions = {};

            var service = {
                registerPathForScrollPosition: function(path) {
                    if(pathsToSave.indexOf(path) === -1){
                        pathsToSave.push(path);
                    }
                },

                deregisterPathForScrollPosition: function(path){
                    var index = pathsToSave.indexOf(path);
                    if(index > -1){
                        pathsToSave.splice(index, 1);
                    }
                },

                updateScrollPosition: function(path, position){
                    if(pathsToSave.indexOf(path) !== -1){
                        scrollPositions[path] = position;
                    }
                },

                scrollToLastSavedPosition: function(path){
                    if(pathsToSave.indexOf(path) !== -1 && scrollPositions[path]){
                        $window.scrollTo(0, scrollPositions[path]);
                    }
                },

                getScrollPosition: function(path){
                    return scrollPositions[path];
                }
            };
            return service;
        }

        this.$get = ['$window', function ($window) {
            return new ScrollingService($window);
        }];
    })
    .directive('scrollingDirective', ['$document', '$timeout', '$location', '$window', 'ScrollingService', function ($document, $timeout, $location, $window, ScrollingService) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                scope.okSaveScroll = true;


                $document.bind('scroll', function () {
                    if (scope.okSaveScroll) {
                        ScrollingService.updateScrollPosition($location.path(), $window.pageYOffset);
                    }
                });

                scope.$on('$locationChangeSuccess', function (route) {
                    $timeout(function () {
                        scope.okSaveScroll = true;
                    }, 0);
                });

                scope.$on('$locationChangeStart', function (event) {
                    scope.okSaveScroll = false;
                });
            }
        };
    }]);
