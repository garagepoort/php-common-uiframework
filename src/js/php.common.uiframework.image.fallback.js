angular.module('com.bendani.php.common.uiframework')
    .directive('srcWithFallback', function () {
    return{
        link: function postLink(scope, element, attrs) {
            var fallback = '';

            attrs.$observe('srcWithFallback', function(newVal, oldVal){
                var img = new Image();

                if(newVal !== undefined && newVal !== ''){
                    img.src = attrs.srcWithFallback;
                    angular.element(img).bind('load', function () {
                        element.attr("src", attrs.srcWithFallback);
                    });
                }else{
                    img.src = fallback;
                    angular.element(img).bind('load', function () {
                        element.attr("src", fallback);
                    });
                }
            });

            element.bind('error', function () {
                angular.element(this).attr("src", fallback);
            });

        }
    };
});