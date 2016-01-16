'use strict';

angular.module('com.bendani.php.common.uiframework')
    .provider('ErrorContainer', function ErrorContainerProvider() {

        function ErrorContainer($rootScope, $location, $window) {

            var _currentErrorCode = "";
            var _skipResetOnNextRouteChange = false;
            var _expanded = false;

            function scrollToErrorContainer() {
                $window.scrollTo(0, 0);
            }

            var _setErrorCode = function (error) {
                _currentErrorCode = error;
                scrollToErrorContainer();
            };

            var _handleRestError = function (data) {
                if (data.data === undefined) {
                    _currentErrorCode = "unexpected error";
                } else if (data.status == 401) {
                    $location.path("/login");
                } else {
                    _currentErrorCode = "Er ging iets mis: " + data.data.message;
                }
                scrollToErrorContainer();
            };

            var _reset = function () {
                _currentErrorCode = "";
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
                errorCode: function () {
                    return _currentErrorCode;
                },
                reset: function () {
                    _reset();
                },
                noError: function () {
                    _reset();
                },
                handleRestError: function (data) {
                    _handleRestError(data);
                },
                setErrorCode: function (error) {
                    _setErrorCode(error);
                },
                handleRestErrorAndScrollToTop: function (data) {
                    _handleRestError(data);
                    //ScrollService.scrollToTop();
                },
                setErrorCodeAndScrollToTop: function (error, params, children) {
                    _setErrorCode(error, params, children);
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

        this.$get = ['$rootScope', '$location', '$window', function ($rootScope, $location, $window) {
            return new ErrorContainer($rootScope, $location, $window);
        }];
    })
    .directive('errorcontainer', function () {
        return {
            restrict: 'E',
            templateUrl: 'packages/bendani/php-common/uiframework/error-container.html',
            replace: true
        };
    });
