(function(){
    'use strict';
    angular.module('com.bendani.php.common.uiframework')
        .directive("compareTo", compareTo);

    function compareTo() {
        return {
            require: "ngModel",
            scope: {
                otherModelValue: "=compareTo"
            },
            link: function(scope, element, attributes, ngModel) {

                ngModel.$validators.compareTo = function(modelValue) {
                    return modelValue == scope.otherModelValue;
                };

                scope.$watch("otherModelValue", function() {
                    ngModel.$validate();
                });
            }
        };
    }
})();
