App.NewController = Ember.Controller.extend({
    // the initial value of the `search` property
    model: this.get('model'),
    end_date: new Date(),
    //needs: ["Viewer"], //says we need the viewer route for this, not necessary to type in
    actions: {
        edit: function () {
            this.set('isEditing', true);
        },
        Cancel: function () {
            this.set('isEditing', false);
        },
        newRecord: function () {

            var obj = {
                title: this.get('title'),
                start: this.get('start'),
                end: this.get('end_date'),
                eventType: "xx",
                desc: this.get('desc')
            };
            var eventList = this.store.createRecord("eventList", obj);
            eventList.save().then(function () {
                alert('event saved');
            });

        },
        updateRecord: function () {
            console.log(this);
            //var updated = this.store.update("eventList", this);
            var toupdate = this.get('content').save().then(function () {
                alert('haa');
            });


        }
    }
});