var router = Backbone.Router.extend({

  routes: {
    "": "home",
    "user/settings": "settings"
  },

  home: function () {
    console.log('home page');
    postModel = new SimplySocial.Models.PostModel({});

    postsCollection = new SimplySocial.Collections.PostsCollection({
      model: postModel
    });

    postsCollectionView = new SimplySocial.Views.PostsCollectionView({collection: postsCollection,
      el: $("#posts")})

    mainPageData.forEach(function (e) {
      postsCollection.add(e)
    });
  },

  settings: function () {
    console.log('settings page')
  }

});

new router();
Backbone.history.start();

});