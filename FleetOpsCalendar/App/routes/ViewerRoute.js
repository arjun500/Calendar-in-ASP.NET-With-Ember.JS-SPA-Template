App.ViewerRoute = Ember.Route.extend({
    //setupController: function (controller) {
    //    // Set the IndexController's `title`
    //    this.controllerFor('application').set('model', App.application.options);
    //}
    model: function () {
        
        return this.store.find('eventList');
    },
    setupController: function (controller, model) {
        this.controllerFor('Viewer');
    },

});