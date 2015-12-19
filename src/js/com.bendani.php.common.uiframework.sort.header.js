angular
    .module('com.bendani.php.common.uiframework')
    .directive('sortHeader', function (){
        return {
            scope: {
                reverseOrder: "=",
                sortOptions: "=",
                currentPredicate: "=",
            },
            restrict: "E",
            template: '<div ng-include="getTemplateUrl()"></div>',
            controller: ['$scope', '$rootScope', function($scope, $rootScope) {

                $scope.order = function(sortOption) {
                    $scope.reverseOrder = ($scope.currentPredicate === sortOption.predicate) ? !$scope.reverseOrder : false;
                    $scope.currentPredicate = sortOption.predicate;
                };

                $scope.getTemplateUrl = function(){
                    return $rootScope.baseUrl + "packages/bendani/php-common/uiframework/sort-header.html";
                };
            }]
        };
    });