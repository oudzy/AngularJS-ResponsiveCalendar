angular.module('calendarDemoApp', ['ui.rCalendar']);

angular.module('calendarDemoApp').controller('CalendarDemoCtrl', ['$scope', function ($scope) {
    'use strict';
    $scope.changeMode = function (mode) {
        $scope.mode = mode;
    };

    $scope.today = function () {
        $scope.currentDate = new Date();
    };

    $scope.isToday = function () {
        var today = new Date(),
            currentCalendarDate = new Date($scope.currentDate);

        today.setHours(0, 0, 0, 0);
        currentCalendarDate.setHours(0, 0, 0, 0);
        return today.getTime() === currentCalendarDate.getTime();
    };

    $scope.loadEvents = function () {
        $scope.eventsTypes = ['Available', 'busy'];
        $scope.eventSource = createRandomEvents($scope.eventsTypes);
    };

    $scope.onEventSelected = function (event) {
        $scope.event = event;
    };

    function createRandomEvents(eventsTypes) {
        var events = [];
        
        for (var i = 0; i < 20; i += 1) {
            var date = new Date();
            var eventType = Math.floor(Math.random() * 2);
            var eventsType = Math.floor(Math.random() * 2);
            var startDay = Math.floor(Math.random() * 90) - 45;
            var endDay = Math.floor(Math.random() * 2) + startDay;
            var StartTime;
            var EndTime;
            if (eventType === 0) {
                StartTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + startDay));
                if (endDay === startDay) {
                    endDay += 1;
                }
                EndTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + endDay));
                events.push({
                    title: 'All Day - ' + i,
                    StartTime: StartTime,
                    EndTime: EndTime,
                    allDay: true,
                    type: eventsTypes[eventsType]
                });
            } else {
                var startMinute = Math.floor(Math.random() * 24 * 60);
                var endMinute = Math.floor(Math.random() * 180) + startMinute;
                StartTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + startDay, 0, date.getMinutes() + startMinute);
                EndTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + endDay, 0, date.getMinutes() + endMinute);
                events.push({
                    StartTime: StartTime,
                    EndTime: EndTime,
                    allDay: false,
                    type: eventsTypes[eventsType]
                });
            }
        }
        return events;
    }
}]);