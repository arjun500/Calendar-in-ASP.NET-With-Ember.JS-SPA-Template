App.NewRoute = Ember.Route.extend({

    activate: function () {
        $(document).attr('title', 'New Event');
    },

    setupController: function (controller,model) {
        // Set the IndexController's `title`
        this.controllerFor('New').set('model', model);
        
    },
    model: function () {
        //var record = this.store.createRecord("eventList", { id: "1909", title: "new" });
        //var event = this.store.getById("eventList", "1909");
        //return event;
    },
    //setupController: function (controller, model) {
    //    controller.set("isEditing", false);

    //},

});