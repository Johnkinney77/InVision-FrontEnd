$(function () {
  //Name spacing backbone
  SimplySocial = { Models: {}, Collections: {}, Views: {} }

  //checks window size for search screen,
  // if over 550 it removes the inline styles from the fadeToggle
  // so it can go back to its normal position
  $(window).resize(function () {
    screenWidth = $(window).width()
    if (screenWidth > 550) {
      $(".right input").css('display', '')
    }
  })

  //fade toggles the search bar
  $('#mobile-search').on('click', function() {
    $(".right input").fadeToggle();
  })


  //make a toggle fade for the avatar photo nav
  $('#avatar').hover( function(){
    $('#avatar-drop-down').fadeToggle();
  });



mainPageData = [
{ name: 'Sam Soffes',
  comment: 'How to Get Inspired: the Right Way - Designmodo bit.ly/1hqgbQA Good stuff from <a class="link" href="#">@designmodo!</a>',
  img_url: "./public/imgs/profile_pictures/sam-soffes-profile-pic.jpg",
  created: 1436798655952
},
{ name: 'Meg Robichaud',
  comment: 'My view this morning is simply beautiful... <a class="link" href="#">instagram.com/p/mV0PUrHRwQ/</a>',
  img_url: "./public/imgs/profile_pictures/meg-robinchaud-profile-pic.jpg",
  photo_url: "./public/imgs/meg-instagram.jpg",
  created: 1436798591691
},
{ name: 'Kerem Suer',
  comment: '8 Apps to Turn Your Pipe Dreams Into Prototypes <a class="link" href="#">on.mash.to/1oubyu8</a>',
  img_url: "./public/imgs/profile_pictures/kerem-suer-profile-pic.jpg",
  created: 1436798526819
},
{ name: 'Liang Shi',
  comment: 'How to get animations out of your head. <a class="link" href="#">http://bit.ly/1q7BngO</a> Funny and useful.',
  img_url: "./public/imgs/profile_pictures/liang-shi-profile-pic.jpg",
  created: 1436798465516
},
{ name: 'Vitor Leal',
  comment: 'You have to see this bike. It will make your daily commute a absolute joy ride! <a class="link" href="#">vimeo.com/p/mV0PUrHRwQ/</a>',
  img_url: "./public/imgs/profile_pictures/vitor-leal-profile-pic.jpg",
  photo_url: "./public/imgs/vitor-video.jpg",
  created: 1436798373558
}
]
SimplySocial.Models.PostModel = Backbone.Model.extend({});
SimplySocial.Views.PostsView = Backbone.View.extend({

  template: $("#post-template").text(),
  photoTemplate: $("#post-template-image").text(),
  className: "post",
  // events: {
  //   "click": 'clicked'
  // },
  render: function(){

    //gets current time stamp
    var dateNow = new Date();

    //gets created time stamp
    var originallyCreated = this.model.attributes.created;

    //subtracts original from current to get the difference
    //divides by 60 to calculate how many minutes have passed
    var timeAgo = (dateNow - originallyCreated) / 60000

    //logic to do hours, days, and minutes passed
    if (timeAgo > 60){
      this.model.attributes.timeAgo = Math.ceil(timeAgo / 60) + 'h'
    } else if (timeAgo > 1440) {
      this.model.attributes.timeAgo = Math.ceil(timeAgo / 1440) + 'd'
    } else {
      this.model.attributes.timeAgo = Math.ceil(timeAgo) + 'm'
    }
    console.log(this.model.attributes.img_url)
    if (this.model.attributes.photo_url) {
      var renderedPost = Mustache.render(this.photoTemplate, this.model.attributes)
      this.$el.html(renderedPost)
      return this
    } else {
      var renderedPost = Mustache.render(this.template, this.model.attributes)
      this.$el.html(renderedPost)
      return this
    }
  }/*,
  clicked: function () {
    var region = $('#posts')
    region.empty()
    var id = $(this)[0].el.children[0].id - 1;
    var renderedPost = Mustache.render(this.template, mainPageData[id])
    region.html(renderedPost)
  }*/
})

SimplySocial.Views.PostsCollectionView = Backbone.View.extend({
  initialize: function() {
    this.listenTo(this.collection, 'add', this.addPost)
  },
  // template: $('#project-icon-template').text(),
  addPost: function(modelFromCollection){
        var newPostView = new SimplySocial.Views.PostsView({model: modelFromCollection});
        newPostView.render();
        this.$el.append(newPostView.$el)
  }
})
SimplySocial.Collections.PostsCollection = Backbone.Collection.extend({
  model: SimplySocial.Models.PostModel
});
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