angular.module('com.bendani.php.common.uiframework')
    .directive('imageLoading', function () {
        return {
            link: function postLink(scope, element, attrs) {
                $(element).hide();
                $(element).on('load', function () {
                    $('#' + attrs.imageLoadingId).hide();
                    $(element).show();
                });

            }
        };
    });