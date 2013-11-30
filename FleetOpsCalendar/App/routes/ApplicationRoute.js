App.ApplicationRoute = Ember.Route.extend({
    setupController: function (controller) {
        // Set the IndexController's `title`
        this.controllerFor('application').set('model', App.application.options);
    }
});