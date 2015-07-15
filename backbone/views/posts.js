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