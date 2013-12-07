App.Router.map(function () {
    this.resource("calendar", function () {
        this.resource("viewer", { path: '/viewer/:eventId' });
    });
    
    //this.route("about");
    //this.route("application", { path: "/application" });
    //this.route("viewer"); //this.route("viewer", { path: "/viewer" }); are the same, mention this way only if path name is different from route name


});