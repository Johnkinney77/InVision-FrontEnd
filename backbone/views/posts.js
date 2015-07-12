SimplySocial.Views.PostsView = Backbone.View.extend({

  template: $("#post-template").text(),
  className: "post",
  // events: {
  //   "click": 'clicked'
  // },
  render: function(){
    console.log('rendered')
      var renderedPost = Mustache.render(this.template, this.model.attributes)
      this.$el.html(renderedPost)
      return this
  },
  clicked: function () {
    var region = $('#posts')
    region.empty()
    var id = $(this)[0].el.children[0].id - 1;
    var renderedPost = Mustache.render(this.template, mainPageData[id])
    region.html(renderedPost)
  }
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