App.ViewerView = Ember.View.extend({
    templateName: 'viewer',
    eventDetials: this.get('controller.model'),
    didInsertElement: function () {
        console.log(this.get('controller.model'));
    }
});