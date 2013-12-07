App.IndexController = Ember.ArrayController.extend({
    sortProperties: ['eventId'],
    sortAscending: false,
    events: Ember.computed.alias('model'),
    getEventDetails: function (obj) {
        this.transitionToRoute('viewer', obj.eventId);
    }
});