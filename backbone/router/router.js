var router = Backbone.Router.extend({

  //routes
  routes: {
    "": "home",
    "user/settings": "settings"
  },

  //home route
  home: function () {
    console.log('home page');

    //emptying content then creating home view
    $("#main").empty()
    home = new SimplySocial.Views.HomeView({})
  },

  //settings route
  settings: function () {
    console.log('settings page')

    //emptying content then creating settings view
    $("#main").empty()
    settings = new SimplySocial.Views.SettingsView({})
  }

});


//starting router
new router();
Backbone.history.start();

});