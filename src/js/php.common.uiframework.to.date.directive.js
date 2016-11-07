(function(){
    'use strict';
    angular.module('com.bendani.php.common.uiframework')
        .directive('toDate', function() {
            return {
                scope: {
                    date: '='
                },
                template: "<span>{{ vm.formattedDate }}</span>",
                controller: ['DateService', ToDateController],
                controllerAs: 'vm',
                bindToController: true
            };
        });

    function ToDateController(DateService){
        var vm = this;
        vm.formattedDate = DateService.dateToString(vm.date);
    }

})();
