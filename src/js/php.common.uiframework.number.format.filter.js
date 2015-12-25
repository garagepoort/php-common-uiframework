angular
    .module('com.bendani.php.common.uiframework')
    .filter('numberFormatFilter', function () {
        return function (text) {
            if(text){
                var str = text.toString().replace('.', ',');
                return str;
            }
        };
    });