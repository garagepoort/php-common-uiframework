angular
    .module('com.bendani.php.common.uiframework')
    .directive('multiSelect', function (){
        return {
            scope: {
                allItems: "=",
                selectedItems: "="
            },
            restrict: "E",
            template: '<div ng-include="getTemplateUrl()"></div>',
            controller: ['$scope', '$rootScope', function($scope, $rootScope) {
                function init(){
                    $scope.groups = [];
                    $scope.data = {};
                    $scope.data.searchItemsQuery = "";

                    for(var i = 0; i < $scope.allItems.length; i++){
                        var group = $scope.allItems[i].group;
                        if($scope.groups.indexOf(group) == -1){
                            $scope.groups.push(group);
                        }
                    }
                }

                $scope.selectItem = function selectItem(item){
                    var index = $scope.selectedItems.indexOf(item);
                    if(index > -1){
                        $scope.selectedItems.splice(index, 1);
                    }else{
                        $scope.selectedItems.push(item);
                    }
                };

                $scope.search = function(item){
                    if ( (item.value.toLowerCase().indexOf($scope.data.searchItemsQuery) !== -1)){
                        return true;
                    }
                    return false;
                };


                $scope.getTemplateUrl = function(){
                    return $rootScope.baseUrl + "packages/bendani/php-common/uiframework/multi-select.html";
                };

                init();
            }]
        };
    });