# ui-rCalendar directive

A pure AngularJS responsive calendar directive

# Demo
http://twinssbc.github.io/AngularJS-ResponsiveCalendar/demo/

# Usage

Bower Install: `bower install ng-responsive-calendar`

Load the necessary dependent files:

    <link rel="stylesheet" href="../lib/bootstrap/dist/css/bootstrap.css"/>
    <link rel="stylesheet" href="<bower lib installation path>/ng-responsive-calendar/dist/css/calendar.min.css"/>
    <script src="../lib/angular/angular.js"></script>
    <script src="<bower lib installation path>/ng-responsive-calendar/dist/js/calendar-tpls.min.js"></script>


Add the calendar module as a dependency to your application module:

    var myAppModule = angular.module('MyApp', ['ui.rCalendar'])

Add the directive in the html page

    <calendar calendar-mode="mode" event-source="eventSource">

# Options

* formatDay    
The format of the date displayed in the month view.    
Default value: 'dd'
* formatDayHeader    
The format of the header displayed in the month view.    
Default value: 'EEE'
* formatDayTitle    
The format of the title displayed in the month view.    
Default value: 'MMMM dd, yyyy'
* formatWeekTitle    
The format of the title displayed in the week view.    
Default value: 'MMMM yyyy, Week w'
* formatMonthTitle    
The format of the title displayed in the month view.    
Default value: 'MMMM yyyy'
* calendarMode    
The initial mode of the calendar.    
Default value: 'month'
* showWeeks    
If set to true, a week number column will be displayed in the month view.       
Default value: false
* showEventDetail    
If set to true, when selecting the date in the month view, the events happened on that day will be shown below.    
Default value: true
* startingDay    
Control month view starting from which day.    
Default value: 0
* eventSource    
The data source of the calendar, when the eventSource is set, the view will be updated accordingly.    
Default value: null    
The format of the eventSource is described in the EventSource section
* queryMode    
If queryMode is set to 'local', when the range or mode is changed, the calendar will use the already bound eventSource to update the view    
If queryMode is set to 'remote', when the range or mode is changed, the calendar will trigger a callback function rangeChanged.    
Users will need to implement their custom loading data logic in this function, and fill it into the eventSource. The eventSource is watched, so the view will be updated once the eventSource is changed.    
Default value: 'local'
* rangeChanged    
The callback function triggered when the range or mode is changed if the queryMode is set to 'remote'

        $scope.rangeChanged = function (StartTime, EndTime) {
            Events.query({StartTime: StartTime, EndTime: EndTime}, function(events){
                $scope.eventSource=events;
            });
        };

* eventSelected    
The callback function triggered when an event is clicked

        <calendar ... event-selected="onEventSelected(event)"></calendar>
    
    
        $scope.onEventSelected = function (event) {
            console.log(event.title);
        };

* timeSelected
The callback function triggered when a date is selected in the monthview

        <calendar ... time-selected="onTimeSelected(selectedTime)"></calendar>
        
        $scope.onTimeSelected = function (selectedTime) {
            console.log(event.selectedTime);
        };

* eventsTypes
Optional array of string represent the types of events if the events has types

* showTitle
Optional to show or hide the title in the week view
    <calendar ... show-title="true"></calendar>

* hideWeekend
Optional boolean to hide Saturday and Sunday in Month and Week views

* allDayTitle
Optional to Override the all day text in Month and Day view

* noEventsTitle
Optional to override the text in the month view when there is no events

* timeMode
Optional 12 or 24

* dayStart
Optional display from hour (0 .. 23) 

* dayEnd
Optional display till hour (0 .. 23) 

* hideAllday
Optional hide allDay events 

# EventSource

EventSource is an array of event object which contains at least below fields:

* title
* StartTime    
If allDay is set to true, the StartTime has to be as a UTC date which time is set to 0:00 AM, because in an allDay event, only the date is considered, the exact time or timezone doesn't matter.    
For example, if an allDay event starting from 2014-05-09, then StartTime is

        var StartTime = new Date(Date.UTC(2014, 4, 8));

* EndTime    
If allDay is set to true, the StartTime has to be as a UTC date which time is set to 0:00 AM, because in an allDay event, only the date is considered, the exact time or timezone doesn't matter.    
For example, if an allDay event ending to 2014-05-10, then EndTime is

        var EndTime = new Date(Date.UTC(2014, 4, 9));

* allDay    
Indicates the event is allDay event or regular event
* type
Optional property if there is a special type for this event
**Note 1**
In the current version, the calendar controller only watches for the eventSource reference as it's the least expensive.
That means only you manually reassign the eventSource value, the controller get notified, and this is usually fit to the scenario when the range is changed, you load a new data set from the backend.
In case you want to manually insert/remove/update the element in the eventSource array, you can call broadcast the 'eventSourceChanged' event to notify the controller manually.
**Note 2**
If you want to edit the default color for an event with a specific type, you can do that with css by targeting event-type-EVENTTYPE.

# Events

* changeDate
When receiving this event, the calendar will move the current view to previous or next range.  
Parameter: direction  
1 - Forward  
-1 - Backward

        $scope.$broadcast('changeDate', 1);

* eventSourceChanged
This event is only needed when you manually modify the element in the eventSource array.  
Parameter: value  
The whole event source object

        $scope.$broadcast('eventSourceChanged',$scope.eventSource);