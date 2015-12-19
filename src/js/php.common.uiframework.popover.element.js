angular
    .module('com.bendani.php.common.uiframework')
    .directive('popoverElem', function(){
        return{
            link: function(scope, element, attrs) {
                element.on('click', function(){
                    if(element.hasClass('trigger')){
                        element.removeClass('trigger');
                    }else{
                        element.addClass('trigger');
                    }
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

                element.on('click', function(event){
                    var etarget = angular.element(event.target);
                    var tlength = trigger.length;

                    for(var i=0; i<tlength; i++) {
                        if(trigger[0] === etarget[0]){
                            return;
                        }else if(etarget.parents('.' + scope.excludeClass).length){
                            return;
                        }else{
                            closeTrigger(i);
                        }
                    }
                });

                function closeTrigger(i) {
                    $timeout(function(){
                        angular.element(trigger[0]).click();
                    });
                }
            }
        };
    }]);