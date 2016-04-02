angular
    .module('com.bendani.php.common.uiframework')
    .directive('multiSelect', function () {
        return {
            scope: {
                allItems: "=",
                selectedItems: "=",
                onSelect: "&",
                onDeselect: "&"
            },
            restrict: "E",
            templateUrl: 'packages/bendani/php-common/uiframework/multi-select.html',
            controller: ['$scope', function ($scope) {
                function init() {
                    $scope.data = {};
                    $scope.data.searchItemsQuery = "";
                }

                $scope.selectItem = function selectItem(item) {
                    if ($scope.itemIsSelected(item)) {
                        removeItem(item);
                        if ($scope.onDeselect) {
                            $scope.onDeselect({item: item});
                        }
                    } else {
                        $scope.selectedItems.push(item);
                        if ($scope.onSelect) {
                            $scope.onSelect({item: item});
                        }
                    }
                };

                $scope.itemIsSelected = function (item) {
                    var selectedItem = $.grep($scope.selectedItems, function (si) {
                        return si.key == item.key;
                    });

                    return selectedItem.length > 0;
                };

                $scope.search = function (item) {
                    if ((item.key.toLowerCase().indexOf($scope.data.searchItemsQuery) !== -1)) {
                        return true;
                    }
                    return false;
                };

                function removeItem(item){
                    var indexToRemove = -1;
                    for(var i = 0; i < $scope.selectedItems.length; i++){
                        if($scope.selectedItems[i].key == item.key){
                            indexToRemove = i;
                        }
                    }
                    if(indexToRemove != -1){
                        $scope.selectedItems.splice(indexToRemove, 1);
                    }
                }

                init();
            }]
        };
    });