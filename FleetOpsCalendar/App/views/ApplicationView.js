/// <reference path="../../@JSense.js" />
App.ApplicationView = Ember.View.extend({
    didInsertElement: function () {
       // alert(this.get('controller.model'));
        //the view has been completely inserted into the dom
        $('#calendar').fullCalendar(this.get('controller.model'));
    },
    //willDestroyElement: function () {
    //    //called when the view is about to be destroyed, there is also another event that triggers when the view is about to rerender
    //}

    //click: function (event) {
    //    alert('clicked');
    //}
})
