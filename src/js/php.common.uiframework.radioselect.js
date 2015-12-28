angular
    .module('com.bendani.php.common.uiframework')
    .directive('radioSelect', function (){
        return {
            scope: {
                model: '=',
                onSelect: '&',
                showSearchBox: '='
            },
            restrict: "E",
            templateUrl: 'packages/bendani/php-common/uiframework/radio-select.html',
            controller: ['$scope', function($scope) {
                function init(){
                    if($scope.showSearchBox === undefined || $scope.showSearchBox === null){
                        $scope.showSearchBox = true;
                    }
                    $scope.data = {};
                    $scope.data.searchItemsQuery = "";
                }

                $scope.selectItem = function selectItem(item){
                    $scope.model.selected = item;
                    if($scope.onSelect){
                        $scope.onSelect({item: item});
                    }
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