angular.module('com.bendani.php.common.uiframework')
    .directive("limitTo", [function() {
    return {
        restrict: "A",
        link: function(scope, elem, attrs) {
            var limit = parseInt(attrs.limitTo);
            angular.element(elem).on("keydown", function() {
                if (this.value == limit) return false;
            });
        }
    }
}]);