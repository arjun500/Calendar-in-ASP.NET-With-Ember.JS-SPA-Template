/// <reference path="../../@JSense.js" />
App.IndexView = Ember.View.extend({
    templateName:'index',
    didInsertElement: function () {
        //var events = this.get('controller.model').map(function (record) {
        //    return record.toJSON();
        //});
        //alert(events);                                                    
         var self= this.get('controller');
        var events = this.get('controller.model').map(function (record) {
            record._data.eventId = record.id;
          return record._data;
        });
        //the view has been completely inserted into the dom
        //  $('#calendar').fullCalendar(this.get('controller.model'));
        $('#calendar').fullCalendar({
           // header: {
             //   left: 'prev,next today',
               // center: 'title',
            //    right: 'month,agendaWeek,agendaDay'
            //},
            selectable: true,
            selectHelper: true,
            select: function (start, end, allDay) {
                alert('event click');
                //TODO findout how to get values from the html elements
            },
            editable: true,
            droppable: true,
         //   defaultView: "agendaWeek",
            drop: function (date, allDay) {
                //TODO findout how to add a dropped event
                //  $('#calendar').fullCalendar('renderEvent', copiedEventObject, true);
            },
            eventClick: function (calEvent, jsEvent, view) {
                //TODO how to handle event click event
              //  App.IndexView.self.send('getEventDetails', {});
                self.send('getEventDetails', calEvent);
            },
            loading: function (isLoading, view) {
                //  $('body').modalmanager('loading');
            },
            events: events
        });

    },
    //willDestroyElement: function () {
    //    //called when the view is about to be destroyed, there is also another event that triggers when the view is about to rerender
    //}

    //click: function (event) {
    //    alert('clicked');
    //}
})
