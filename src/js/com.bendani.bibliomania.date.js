angular
    .module('php.common.uiframework.date', [])
    .directive('date', function (){
        return {
            scope: {
                label: '@',
                dateModel: "=ngModel",
                required: '@',
                submitAttempted: '='
            },
            restrict: "E",
            templateUrl: 'packages/bendani/php-common/uiframework/date-directive.html',
            controller: ['$rootScope', '$scope', function($rootScope, $scope) {

                function init(){
                    if($scope.dateModel === undefined){
                        $scope.dateModel = {};
                    }
                }

                $scope.$watch('dateModel.day', function(newVal, oldVal) {
                    if(newVal !== undefined && newVal.length > 2) {
                        $scope.dateModel.day = oldVal;
                    }
                    //if(newVal.month !== undefined && newVal.month.length > 2) {
                    //    $scope.dateModel.month = oldVal.month;
                    //}
                    //if(newVal.year !== undefined && newVal.year.length > 2) {
                    //    $scope.dateModel.year = oldVal.year;
                    //}
                });

                $scope.isYearRequired = function(){
                    if($scope.required === "true"){
                        return true;
                    }
                    if($scope.dateModel === undefined){
                        return false;
                    }
                    return !isBlank($scope.dateModel.day) || !isBlank($scope.dateModel.month);
                };

                $scope.isMonthRequired = function(){
                    if($scope.dateModel === undefined){
                        return false;
                    }
                    return !isBlank($scope.dateModel.day);
                };

                function isBlank(string){
                    return string === undefined || string === null;
                }

                init();
            }]
        };
    });
