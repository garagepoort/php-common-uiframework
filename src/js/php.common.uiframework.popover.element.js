angular
    .module('com.bendani.php.common.uiframework')
    .directive('popoverElem', function(){
        return{
            link: function(scope, element, attrs) {
                element.on('click', function(){
                    element.addClass('trigger');
                });
            }
        }
    });

angular
    .module('com.bendani.php.common.uiframework')
    .directive('popoverClose', ['$timeout', function($timeout){
        return{
            scope: {
                excludeClass: '@'
            },
            restrict: 'A',
            link: function(scope, element, attrs) {
                var trigger = document.getElementsByClassName('trigger');

                function closeTrigger(i) {
                    $timeout(function(){
                        angular.element(trigger[0]).click();
                        angular.element(trigger[0]).removeClass('trigger');
                    });
                }

                element.on('click', function(event){
                    var etarget = angular.element(event.target);
                    var tlength = trigger.length;

                    if(!etarget.hasClass('trigger') && !etarget.parents('.exclude').length) {
                        for(var i=0; i<tlength; i++) {
                            closeTrigger(i)
                        }
                    }
                });
            }
        };
    }]);