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
