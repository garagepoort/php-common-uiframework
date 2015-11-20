angular
    .module('php.common.uiframework.date', [])
    .directive('date', function (){
        return {
            scope: {
                label: '@',
                dateModel: "=ngModel",
                required: '@'
            },
            restrict: "E",
            template: '<div ng-include="getTemplateUrl()"></div>',
            controller: ['$rootScope', '$scope', function($rootScope, $scope) {

                function init(){
                    if($scope.dateModel === undefined){
                        $scope.dateModel = {};
                    }
                }

                $scope.getTemplateUrl = function(){
                    return $rootScope.baseUrl + "packages/bendani/php-common/uiframework/date-directive.html";
                };

                $scope.isYearRequired = function(){
                    if($scope.required === true){
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
                    return string !== undefined && string !== '';
                }

                init();
            }]
        };
    });
