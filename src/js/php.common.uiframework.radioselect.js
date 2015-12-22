angular
    .module('com.bendani.php.common.uiframework')
    .directive('radioSelect', function (){
        return {
            scope: {
                model: '='
            },
            restrict: "E",
            templateUrl: 'packages/bendani/php-common/uiframework/radio-select.html',
            controller: ['$scope', function($scope) {
                function init(){
                    $scope.data = {};
                    $scope.data.searchItemsQuery = "";
                }

                $scope.selectItem = function selectItem(item){
                    $scope.model.selected = item;
                };

                $scope.search = function(item){
                    if ( (item.key.toLowerCase().indexOf($scope.data.searchItemsQuery) !== -1)){
                        return true;
                    }
                    return false;
                };

                init();
            }]
        };
    });