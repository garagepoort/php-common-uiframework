(function () {
    'use strict';

    var VALID_CLASS = 'ng-valid',
        WARNING_VALID_CLASS = 'ng-warning-valid',
        PENDING_CLASS = 'ng-pending',
        WARNING_CLASS = 'ng-warning';

    var ngModelMinErr = angular.$$minErr('ngModel');

    angular.module('com.bendani.php.common.uiframework')
        .config(['$provide', configModule]);

    function configModule($provide) {
        $provide.decorator('ngModelDirective', decorateNgModel);
    }

    function decorateNgModel($delegate) {
        var ngModel = $delegate[0];
        var oldController = ngModel.controller;

        ngModel.controller = ['$scope', '$element', '$attrs', '$injector', '$animate', '$q', DecoratedNgModelController];
        return $delegate;

        function DecoratedNgModelController($scope, $element, $attrs, $injector, $animate, $q) {
            $injector.invoke(oldController, this, {
                '$scope': $scope,
                '$element': $element,
                '$attrs': $attrs
            });

            var currentValidationRunId = 0;
            var ctrl = this;

            this.$warningValidators = {};
            this.$warningAsyncValidators = {};
            this.$warning = {};

            //unknown why this needs to be in a helper method, copied from angular source
            addSetWarningValidityMethod({
                ctrl: this,
                $element: $element,
                set: function (object, property) {
                    object[property] = true;
                },
                unset: function (object, property) {
                    delete object[property];
                },
                $animate: $animate
            });

            this.$$runWarningValidators = function $$runWarningValidators(modelValue, viewValue, doneCallback) {

                currentValidationRunId++;
                var localValidationRunId = currentValidationRunId;

                if (!processSyncWarningValidators()) {
                    validationDone();
                    return;
                }
                processAsyncWarningValidators();

                function processSyncWarningValidators() {
                    var syncWarningsValidatorsValid = true;
                    angular.forEach(ctrl.$warningValidators, function (validator, name) {
                        var result = validator(modelValue, viewValue);
                        syncWarningsValidatorsValid = syncWarningsValidatorsValid && result;
                        setWarning(name, result);
                    });
                    if (!syncWarningsValidatorsValid) {
                        angular.forEach(ctrl.$asyncWarningValidators, function (v, name) {
                            setWarning(name, null);
                        });
                    }
                    return syncWarningsValidatorsValid;
                }

                function processAsyncWarningValidators() {
                    var validatorPromises = [];
                    angular.forEach(ctrl.$warningAsyncValidators, function (validator, name) {
                        var promise = validator(modelValue, viewValue);
                        if (!promise || !angular.isFunction(promise.then)) {
                            throw ngModelMinErr("$asyncWarningValidators",
                                "Expected asynchronous warning validator to return a promise but got '{0}' instead.", promise);
                        }
                        setWarning(name, undefined);
                        validatorPromises.push(promise.then(function () {
                            setWarning(name, true);
                        }, function () {
                            setWarning(name, false);
                        }));
                    });
                    if (!validatorPromises.length) {
                        validationDone();
                    } else {
                        $q.all(validatorPromises).then(function () {
                            validationDone();
                        }, angular.noop) ;
                    }
                }

                function setWarning(name, isValid) {
                    if (localValidationRunId === currentValidationRunId) {
                        ctrl.$setWarningValidity(name, isValid);
                    }
                }

                function validationDone() {
                    if (localValidationRunId === currentValidationRunId) {
                        doneCallback(true);
                    }
                }
            };

            var oldRunValidators = this.$$runValidators;
            this.$$runValidators = function $$decoratedRunValidators(parseValid, modelValue, viewValue, doneCallback) {

                oldRunValidators.apply(this, [parseValid, modelValue, viewValue, validationDoneCallback]);

                function validationDoneCallback(allValid) {
                    if (allValid) {
                        ctrl.$$runWarningValidators(modelValue, viewValue, doneCallback);
                    } else {
                        doneCallback(allValid);
                    }
                }
            };
        }
    }

    // helper methods
    function addSetWarningValidityMethod(context) {
        var ctrl = context.ctrl,
            $element = context.$element,
            classCache = {},
            set = context.set,
            unset = context.unset,
            $animate = context.$animate;

        classCache[WARNING_CLASS] = !(classCache[WARNING_VALID_CLASS] = $element.hasClass(WARNING_VALID_CLASS));

        ctrl.$setWarningValidity = setWarningValidity;

        function setWarningValidity(validationWarningKey, state, controller) {
            if (state === undefined) {
                createAndSet('$pending', validationWarningKey, controller);
            } else {
                unsetAndCleanup('$pending', validationWarningKey, controller);
            }
            if (!_.isBoolean(state)) {
                unset(ctrl.$warning, validationWarningKey, controller);
                unset(ctrl.$$success, validationWarningKey, controller);
            } else {
                if (state) {
                    unset(ctrl.$warning, validationWarningKey, controller);
                    set(ctrl.$$success, validationWarningKey, controller);
                } else {
                    set(ctrl.$warning, validationWarningKey, controller);
                    unset(ctrl.$$success, validationWarningKey, controller);
                }
            }
            if (ctrl.$pending) {
                cachedToggleClass(PENDING_CLASS, true);
                toggleWarningCss('', null);
                suppressNgValidClass();
            } else {
                cachedToggleClass(PENDING_CLASS, false);
                toggleWarningCss('', isObjectEmpty(ctrl.$warning));
                restoreNgValidClass();
            }

            // re-read the state as the set/unset methods could have
            // combined state in ctrl.$warning[validationError] (used for forms),
            // where setting/unsetting only increments/decrements the value,
            // and does not replace it.
            var combinedState;
            if (ctrl.$pending && ctrl.$pending[validationWarningKey]) {
                combinedState = undefined;
            } else if (ctrl.$warning[validationWarningKey]) {
                combinedState = false;
            } else if (ctrl.$$success[validationWarningKey]) {
                combinedState = true;
            } else {
                combinedState = null;
            }

            toggleWarningCss(validationWarningKey, combinedState);
        }

        function createAndSet(name, value, controller) {
            if (!ctrl[name]) {
                ctrl[name] = {};
            }
            set(ctrl[name], value, controller);
        }

        function unsetAndCleanup(name, value, controller) {
            if (ctrl[name]) {
                unset(ctrl[name], value, controller);
            }
            if (isObjectEmpty(ctrl[name])) {
                ctrl[name] = undefined;
            }
        }

        function cachedToggleClass(className, switchValue) {
            if (switchValue && !classCache[className]) {
                $animate.addClass($element, className);
                classCache[className] = true;
            } else if (!switchValue && classCache[className]) {
                $animate.removeClass($element, className);
                classCache[className] = false;
            }
        }

        function suppressNgValidClass() {
            cachedToggleClass(VALID_CLASS, false);
        }

        function restoreNgValidClass() {
            cachedToggleClass(VALID_CLASS, true);
        }

        function toggleWarningCss(validationWarningKey, isValid) {
            validationWarningKey = validationWarningKey ? '-' + snake_case(validationWarningKey, '-') : '';
            cachedToggleClass(WARNING_VALID_CLASS + validationWarningKey, isValid === true);
            cachedToggleClass(WARNING_CLASS + validationWarningKey, isValid === false);
        }
    }

    function isObjectEmpty(obj) {
        if (obj) {
            for (var prop in obj) {
                return false;
            }
        }
        return true;
    }

    var SNAKE_CASE_REGEXP = /[A-Z]/g;

    function snake_case(name, separator) {
        separator = separator || '_';
        return name.replace(SNAKE_CASE_REGEXP, function (letter, pos) {
            return (pos ? separator : '') + letter.toLowerCase();
        });
    }

})();