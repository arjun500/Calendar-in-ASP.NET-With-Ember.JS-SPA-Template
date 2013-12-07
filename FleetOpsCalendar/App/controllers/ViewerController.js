App.ViewerController = Ember.ObjectController.extend({
    // the initial value of the `search` property
    search: '',
    isEditing: false,
    mode:this.get('model'),
    needs:["Viewer"], //says we need the viewer route for this, not necessary to type in
    actions: {
        edit: function () {
        this.set('isEditing', true);
    }
    }
});