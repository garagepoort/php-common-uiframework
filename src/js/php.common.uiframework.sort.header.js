angular
    .module('com.bendani.php.common.uiframework')
    .directive('sortHeader', function (){
        return {
            scope: {
                reverseOrder: "=",
                sortOptions: "=",
                currentPredicate: "="
            },
            restrict: "A",
            replace: true,
            templateUrl: 'packages/bendani/php-common/uiframework/sort-header.html',
            controller: ['$scope', function($scope) {

                $scope.order = function(sortOption) {
                    $scope.reverseOrder = ($scope.currentPredicate === sortOption.predicate) ? !$scope.reverseOrder : false;
                    $scope.currentPredicate = sortOption.predicate;
                };
            }]
        };
    });