App.application= Ember.Object.create({
     options: {
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        },
        selectable: true,
        selectHelper: true,
        select: function (start, end, allDay) {
            //TODO findout how to get values from the html elements
        },
        editable: true,
        droppable: true,
        defaultView: "agendaWeek",
        drop: function (date, allDay) {
            //TODO findout how to add a dropped event
            //  $('#calendar').fullCalendar('renderEvent', copiedEventObject, true);
        },
        eventClick: function (calEvent, jsEvent, view) {
            //TODO how to handle event click event
            alert('event click');
        },
        loading: function (isLoading, view) {
            //  $('body').modalmanager('loading');
        },
        events: {
        }
    }
});