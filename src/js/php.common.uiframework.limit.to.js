angular.module('com.bendani.php.common.uiframework')
    .directive("limitTo", ['$timeout', function($timeout) {
    return {
        restrict: "A",
        link: function(scope, elem, attrs) {
            var limit = parseInt(attrs.limitTo);

            angular.element(elem).on("keydown", function() {
                this.value = this.value.substring(0, limit - 1);
            });
        }
    }
}]);