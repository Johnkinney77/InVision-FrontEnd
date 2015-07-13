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