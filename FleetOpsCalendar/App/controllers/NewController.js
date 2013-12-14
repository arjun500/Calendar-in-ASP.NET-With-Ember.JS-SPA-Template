App.NewController = Ember.Controller.extend({
    // the initial value of the `search` property
    model: this.get('model'),
    end_date: new Date(),
    selectedEventType: null,
    selectedStatus:null,
    needs: ["Index"],
    valueChanged: function () {
        alert('value changed');
    }.observes('selectedEventType'),
    actions: {
        edit: function () {
            this.set('isEditing', true);
        },
        Cancel: function () {
            this.set('isEditing', false);
        },
        newRecord: function () {
            console.log(this.get('eventType'));
            var self = this;
            var obj = {
                title: this.get('title'),
                start: this.get('start'),
                end: this.get('end'),
                eventType: this.get('selectedEventType'),
                desc: this.get('desc')
            };
            //self.get('controllers.Index').eventCreated();
            //var eventList = this.store.createRecord("eventList", obj);
            //eventList.save().then(function (data) {
            //    //todoList.set("eventId", data.get('id'));
            //    $.pnotify({ text: "Event created successfully.", type: 'success', icon: false });
            //    self.transitionToRoute("/");
            //}, function () {
            //    $.pnotify({ text: "Event creation failed.", type: 'error', icon: false });
            //});
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