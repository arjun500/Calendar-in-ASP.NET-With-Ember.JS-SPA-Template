App.EventList = DS.Model.extend({
    eventId: DS.attr('string'),
    title: DS.attr('string'),
    start: DS.attr('string'),
    end: DS.attr('string'),
    allDay: DS.attr('string')
});

App.EventListSerializer = DS.WebAPISerializer.extend({
    primaryKey: 'eventId'

    //extractArray: function (store, primaryType, payload) {
    //    var primaryTypeName = primaryType.typeKey;
    //    var typeName = primaryTypeName,
    //        type = store.modelFor(typeName);
    //    var data = {};
    //    data[typeName] = payload;
    //    data.eventsList = [];
    //    var normalizedArray = payload.each(function (i, event) {
    //        data.eventsList.push(event);
    //    });
    //    var normalizedArray = payload.map(function (item, index, enumerable){
    //        hash.eventList.map(function (event) {
               
    //        });
    //        return hash;
    //    }, this);

    //    payload = data;
    //    return this._super.apply(this, arguments);
    //}


});

