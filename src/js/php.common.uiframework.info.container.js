'use strict';

angular.module('com.bendani.php.common.uiframework')

    .provider('InfoContainer', function InfoContainerProvider() {

        function InfoContainer($rootScope) {

            var _currentInfoCode = "";
            var _skipResetOnNextRouteChange = false;
            var _expanded = false;

            var _setInfoCode = function (info) {
                _currentInfoCode = info;
            };

            var _reset = function () {
                _currentInfoCode = "";
                _expanded = false;
            };

            var _isExpanded = function () {
                return _expanded;
            };

            var _isCollapsed = function () {
                return !_isExpanded();
            };

            var _toggleExpansion = function () {
                _expanded = !_expanded;
            };

            var service = {
                infoCode: function () {
                    return _currentInfoCode;
                },
                reset: function () {
                    _reset();
                },
                setInfoCode: function (info) {
                    _setInfoCode(info);
                },
                setInfoCodeAndScrollToTop: function (info) {
                    _setInfoCode(info);
                    //ScrollService.scrollToTop();
                },
                onRouteChangeSuccess: function () {
                    if (_skipResetOnNextRouteChange) {
                        _skipResetOnNextRouteChange = false;
                    } else {
                        service.reset();
                    }
                },
                skipResetOnNextRouteChange: function () {
                    _skipResetOnNextRouteChange = true;
                },
                isCollapsed: function () {
                    return _isCollapsed();
                },
                isExpanded: function () {
                    return _isExpanded();
                },
                toggleExpansion: function () {
                    return _toggleExpansion();
                }
            };

            $rootScope.$on('$routeChangeSuccess', service.onRouteChangeSuccess);

            return service;

        }

        this.$get = ['$rootScope', '$location', function ($rootScope, $location) {
            return new InfoContainer($rootScope, $location);
        }];
    })
    .directive('infocontainer', ['InfoContainer', function (InfoContainer) {
        return {
            restrict: 'E',
            templateUrl: 'packages/bendani/php-common/uiframework/info-container.html',
            replace: true
        };
    }]);
