App.ViewerController = Ember.Controller.extend({
    // the initial value of the `search` property
    search: '',
    needs:["Viewer"]   //says we need the viewer route for this, not necessary to type in
    //actions: {
    //    query: function () {
    //        // the current value of the text field
    //        var query = this.get('search');
    //        this.transitionToRoute('search', { query: query });
    //    }
    //}
});