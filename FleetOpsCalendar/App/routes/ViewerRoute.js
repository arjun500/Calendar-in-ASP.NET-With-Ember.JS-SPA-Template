App.ViewerRoute = Ember.Route.extend({
    //setupController: function (controller) {
    //    // Set the IndexController's `title`
    //    this.controllerFor('application').set('model', App.application.options);
    //}
    model: function (params) {
        var event = this.store.getById("eventList", params.eventId);
        return event;
    },
    //setupController: function (controller, model) {
    //    controller.set("isEditing", false);
 
    //},

});