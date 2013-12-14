App.IndexRoute = Ember.Route.extend({
    //setupController: function (controller) {
    //    // Set the IndexController's `title`
    //    this.controllerFor('application').set('model', App.application.options);
    //}
    activate: function () {
        $(document).attr('title', 'FleetOps Calendar');
    },

    model: function () {
        return this.store.findAll('eventList');
    },
    setupController: function (controller, model) {
        this.controllerFor('index').set('model', model);
    },

});