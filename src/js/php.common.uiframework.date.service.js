'use strict';

angular.module('com.bendani.php.common.uiframework')

    .provider('DateService', function DateServiceProvider() {

        function DateService() {
            var service = {
                dateToString: function(date) {
                    if (date !== undefined && date !== null) {
                        var result = "";
                        if (date.day !== "0" && date.day !== null && date.day !== undefined) {
                            result = date.day + "-";
                        }
                        if (date.month !== "0" && date.month !== null && date.month !== undefined) {
                            result = result + date.month + "-";
                        }
                        if (date.year !== "0" && date.year !== null && date.year !== undefined) {
                            result = result + date.year;
                        }
                        return result;
                    }
                    return "";
                },

                dateToJsonDate: function(date) {
                    if (date !== undefined && date !== null) {
                        return {
                            day: date.getDate(),
                            month: date.getMonth()+1,
                            year: date.getFullYear()
                        };
                    }
                    return {};
                },

                jsonDateToDate: function(jsonDate) {
                    if (jsonDate !== undefined && jsonDate !== null) {
                       return new Date(jsonDate.year, jsonDate.month-1, jsonDate.day);
                    }
                    return new Date();
                }
            };
            return service;
        }

        this.$get = [function () {
            return new DateService();
        }];
    });
