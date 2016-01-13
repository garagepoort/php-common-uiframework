angular
    .module('com.bendani.php.common.uiframework')
    .directive('multiSelect', function (){
        return {
            scope: {
                allItems: "=",
                selectedItems: "=",
                onSelect: "&",
                onDeselect: "&",
            },
            restrict: "E",
            templateUrl: 'packages/bendani/php-common/uiframework/multi-select.html',
            controller: ['$scope', function($scope) {
                function init(){
                    $scope.data = {};
                    $scope.data.searchItemsQuery = "";
                }

                $scope.selectItem = function selectItem(item){
                    var index = $scope.selectedItems.indexOf(item);
                    if(index > -1){
                        $scope.selectedItems.splice(index, 1);
                        if($scope.onDeselect){
                            $scope.onDeselect({item: item});
                        }
                    }else{
                        $scope.selectedItems.push(item);
                        if($scope.onSelect){
                            $scope.onSelect({item: item});
                        }
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