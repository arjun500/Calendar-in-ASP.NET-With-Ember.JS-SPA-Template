/// <reference path="../../@JSense.js" />

  App.ViewerController = Ember.ObjectController.extend({
    // the initial value of the `search` property
    search: '',
    isEditing: false,
    mode: this.get('model'),
    //needs: ["Viewer"], //says we need the viewer route for this, not necessary to type in
    actions: {
        edit: function () {
            this.set('isEditing', true);
        },
        Cancel: function () {
            this.set('isEditing', false);
        },
        newRecord: function () {
            alert('new record');
        },
        updateRecord: function () {
            console.log(this);
            //var updated = this.store.update("eventList", this);
            var toupdate = this.get('content').save().then(function () {
                $.pnotify({ text: "Event updated.", type: 'success', icon: false });
            });


        }
    }
});