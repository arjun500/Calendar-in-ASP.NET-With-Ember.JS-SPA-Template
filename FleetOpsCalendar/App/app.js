window.App = Em.Application.create();
App.ApplicationAdapter = DS.WebAPIAdapter.extend({
    namespace: 'api',
    antiForgeryTokenSelector: "#antiForgeryToken",
    LOG_TRANSITIONS: true
});
Ember.TextField.reopen({
    attributeBindings: ['data-type']
});
