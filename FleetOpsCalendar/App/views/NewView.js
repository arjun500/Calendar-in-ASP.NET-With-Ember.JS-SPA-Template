/// <reference path="../../@JSense.js" />
App.NewView = Ember.View.extend({
    templateName: 'New',
    didInsertElement: function () {
    }
});
App.DatePickerField = Ember.View.extend({
    classNameBindings: ['span'],
    span:"span10",
    templateName: "Datepicker",
    didInsertElement: function () {
        var OnChangeDate, self;
        self = this;
        OnChangeDate = function (evt) {
            return self.set('value',(evt.date)==null?null:evt.date.toString());
        };
        //console.log($('.date'));
        //console.log(this.$('.date'));
        return $(this.$('.date')).datetimepicker({
            language: 'en',
        }).on('changeDate', OnChangeDate);
    }
});

App.SelectViewType = Ember.Select.extend({
    attributeBindings: ['class'],
    prompt: "Please select a category",
    didInsertElement: function () {
        Ember.run.scheduleOnce("afterRender", this, "processChildElements");
    },
    processChildElements: function () {
        var self = this;
        $(this.$()).select2({}).on('change', function (e) {
            var context = self.get('context');
            self.get('controller').set("selectedEventType", e.val);
        })
    },
    propertyWillChange: function () { alert('se');},
    willDestroyElement: function () {
        $(this.$()).select2('destroy');
    }
});

App.Select2ViewStatus = Ember.Select.extend({
    attributeBindings: ['class'],
    prompt: "Please select a category",
    didInsertElement: function () {
        Ember.run.scheduleOnce("afterRender", this, "processChildElements");
    },
    processChildElements: function () {
        var self = this;
        $(this.$()).select2({}).on('change', function (e) {
            var context = self.get('context');
            self.get('controller').set("selectedStatus", e.val);
        })
    },
    propertyWillChange: function () { alert('se'); },
    willDestroyElement: function () {
        $(this.$()).select2('destroy');
    }
});


