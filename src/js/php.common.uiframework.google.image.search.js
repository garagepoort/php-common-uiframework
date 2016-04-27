angular
    .module('com.bendani.php.common.uiframework', [])
    .factory('GoogleImage', ['$resource', function ($resource) {

        return $resource('https://www.googleapis.com/customsearch/v1', {
            cx: decodeURIComponent('003701006117915782863%3Agrbhoeigwrg'),
            key: 'AIzaSyBPkSNgxg9ZjRgYnS0Fj6fZ9xw-Xn5l_pw',
            searchType: 'image',
            imgSize: 'medium',
            alt: 'json'
        });
    }])
    .directive('googleImageSearch', function () {
        return {
            scope: {
                imageModel: "=ngModel",
                query: "=",
                loaderImage: "@"
            },
            restrict: "E",
            template: '<div ng-include="getTemplateUrl()"></div>',
            controller: ['$rootScope', '$scope', 'GoogleImage', function ($rootScope, $scope, GoogleImage) {

                $scope.getTemplateUrl = function(){
                    return $rootScope.baseUrl + "packages/bendani/php-common/uiframework/google-image-search-directive.html";
                };

                function init() {
                    $scope.loading = false;
                    $scope.$watch('query', function() {
                        executeSearch();
                    });
                }

                $scope.selectImageUrl = function(url){
                    $scope.imageModel = url;
                };

                function executeSearch() {
                    if($scope.query !== undefined && $scope.query != ''){
                        $scope.loading = true;
                        GoogleImage.get({q: $scope.query}, function (data) {
                            $scope.images = data.items;
                            $scope.loading=false;
                        });
                    }
                }

                init();
            }]
        };
    });