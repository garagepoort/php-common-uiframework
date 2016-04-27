angular
    .module('com.bendani.php.common.uiframework', [])
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
