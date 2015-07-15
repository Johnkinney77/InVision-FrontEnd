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

  var listActive = true;
  var tilesActive = false;

  //fade toggles the search bar
  $('#mobile-search').on('click', function() {
    $(".right input").fadeToggle();
  })


  //make a toggle fade for the avatar photo nav
  $('#avatar').hover( function(){
    $('#avatar-drop-down').fadeToggle();
  });

  //opens new message model
  $('[data-button="new-message"]').on('click', function () {
    $('#new-message-model').fadeIn()
  })

  //closes new message model and clears out textarea val
  $('#new-message-exit').on('click', function() {
    $('#new-message-model').fadeOut()
    $('[data-input="message"]').val('')
  })

   //for submits on modal
  $('[data-submit="submit"]').on('click', function () {

    //gets current date and time
    var created = new Date().getTime()
    var message = $('[data-input="message"]').val()

    //hard coded some data right now as example
    postsCollection.add([{
      name: 'Jessica Tuan',
      comment: message,
      img_url: "./public/imgs/profile_pictures/jessica-tuan-profile-pic.jpg",
      created: created
    }]);
    //fades out and sets text area value to nothing
    $('#new-message-model').fadeOut()
    $('[data-input="message"]').val('')
  })



mainPageData = [
{ name: 'Sam Soffes',
  comment: 'How to Get Inspired: the Right Way - Designmodo bit.ly/1hqgbQA Good stuff from <a class="link" href="#">@designmodo!</a>',
  img_url: "./public/imgs/profile_pictures/sam-soffes-profile-pic.jpg",
  created: 1436798655952,
  expand: true
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
  video_url: "./public/imgs/vitor-video.jpg",
  created: 1436798373558
}
]
SimplySocial.Models.PostModel = Backbone.Model.extend({});
SimplySocial.Views.HomeView = Backbone.View.extend({
  el: $("#main"),

  //template from DOM
  template: $("#home-page-template").text(),
  className: "post",

  //starts the render of the home page
  initialize: function() {
    this.render()
  },
  render: function(){

    //renders page
    this.$el.append(this.template)

    //start sthe render of the posts
    this.renderPosts()
  },

  renderPosts: function () {

    //new post model
    postModel = new SimplySocial.Models.PostModel({});

    // new post collection
    postsCollection = new SimplySocial.Collections.PostsCollection({
      model: postModel
    });

    // new post collection view
    postsCollectionView = new SimplySocial.Views.PostsCollectionView({collection: postsCollection,
      el: $("#posts")
    });

    //putting in data for each post
    //not retrieving from database in data file
    mainPageData.forEach(function (e) {
      postsCollection.add(e)
    });
  },
  events: {
    'click #list': 'list',
    'click #tiles': 'tiles',
  },
  list: function (event) {
    var list = event.target

    //switch view toggle on javascript side
    tilesActive = false;
    listActive = true;

    //switches the tile icon selected to the list icon selected
    $(list).parent().parent().find('#list').addClass("selected").siblings().removeClass('selected')

    //shows and hides the like, back, and time ago on each post, from top to bottom
    $('.post .right').show()
    $('.right-bottom').hide()

    //changes classes for the appropraite elements
    var posts = $(document).find("#posts")
    posts.parent().removeClass('grid-container').addClass('inner-container')
    posts.removeClass('grid')
    posts.children().removeClass("grid-item")

    //resets inline styling
    posts.css({"position": "", "height": ""});
    posts.children().css({"position": "", "left": "", "top": ""});
  },
  tiles: function (event) {
    var tiles = event.target

    //switch view toggle on javascript side
    tilesActive = true;
    listActive = false;

    //switches the list icon selected to the tile icon selected
    $(tiles).parent().parent().find('#tiles').addClass("selected").siblings().removeClass('selected');

    //shows and hides the like, back, and time ago on each post, from top to bottom
    $('.post .right').hide()
    $('.right-bottom').css("display", "inline-block")

    //changes classes for the appropraite elements
    var posts = $(document).find("#posts")
    posts.parent().removeClass('inner-container').addClass('grid-container')
    posts.addClass('grid')
    posts.children().addClass("grid-item")
    posts.children().css('position', "absolute")

    //sets grids column width
    $('.grid').masonry({
      itemSelector: '.grid-item',
      columnWidth: 200
    });


  }
})

SimplySocial.Views.PostsView = Backbone.View.extend({

  template: $("#post-template").text(),
  photoTemplate: $("#post-template-photo").text(),
  videoTemplate: $("#post-template-video").text(),
  expandTemplate: $("#post-template-expand").text(),
  className: "post",
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
    // console.log(this.model.attributes.img_url)
    if (this.model.attributes.photo_url) {
      var renderedPost = Mustache.render(this.photoTemplate, this.model.attributes)
      this.$el.html(renderedPost)
    } else if (this.model.attributes.video_url) {
      var renderedPost = Mustache.render(this.videoTemplate, this.model.attributes)
      this.$el.html(renderedPost)
    } else if (this.model.attributes.expand) {
      var renderedPost = Mustache.render(this.expandTemplate, this.model.attributes)
      this.$el.html(renderedPost)
    } else {
      var renderedPost = Mustache.render(this.template, this.model.attributes)
      this.$el.html(renderedPost)
    }
    console.log(tilesActive)
    // determines if being viewed as tiles or list
    // then adds class for grid-til, and shows the right elements
    if (tilesActive) {
      $(this.el).addClass('grid-item')
      $(this.el).find(".right").hide()
      $(this.el).find(".right-bottom").show()
    }
    return this
  }
})

//collection view of posts
SimplySocial.Views.PostsCollectionView = Backbone.View.extend({
  initialize: function() {

    //listens to see if a post has been added to collection
    this.listenTo(this.collection, 'add', this.addPost)
  },
  addPost: function(modelFromCollection) {

    //if post has been added, creates a new instance
    var newPostView = new SimplySocial.Views.PostsView({model: modelFromCollection});

    //instances renders itself and is returned from the model
    newPostView.render();

    // determines of tiles are active
    if (tilesActive) {

      // append items to grid
      $('.grid').append( newPostView.$el )

        // add and lay out newly appended items
        .masonry( 'appended', newPostView.$el );

    } else {
      // otherwise appends as normal
      this.$el.append(newPostView.$el)
    }
  }
})
SimplySocial.Views.SettingsView = Backbone.View.extend({
  
  el: $("#main"),

  //template from DOM
  template: $("#settings-page-template").text(),
  className: "post",
  initialize: function() {

    //initiating the render
    this.render()
  },
  render: function(){

    //rending the static settings page
    this.$el.append(this.template)
  },
  events: {
    "click .toggle": 'toggle'
  },

  //slide toggle for settings page
  toggle: function (event) {
    var toggle = event.target
    if ($(toggle).attr('id') === "toggled-on") {
      $(toggle).children().animate({ left: '0px'}, 300, function() {
      $(toggle).attr("id", "")
      });
    } else {
      $(toggle).children().animate({ left: '25px'}, 300, function() {
        $(toggle).attr("id", "toggled-on");
      });
    }
  }
});
//posts collection
SimplySocial.Collections.PostsCollection = Backbone.Collection.extend({
  model: SimplySocial.Models.PostModel,
  comparator: "created"
});
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