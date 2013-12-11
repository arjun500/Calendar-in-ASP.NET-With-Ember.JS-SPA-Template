/// <reference path="../../@JSense.js" />
App.NewView = Ember.View.extend({
    templateName: 'New',
    didInsertElement: function () {
    }
});
App.DatePickerField = Ember.View.extend({
    templateName: "Datepicker",
    didInsertElement: function () {
        var OnChangeDate, self;
        self = this;
        OnChangeDate = function (evt) {
            return self.set('value', evt.date.toString());
        };
        return $('.date').datetimepicker({
            language: 'en',
        }).on('changeDate', OnChangeDate);
    }
});