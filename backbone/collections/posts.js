//posts collection
SimplySocial.Collections.PostsCollection = Backbone.Collection.extend({
  model: SimplySocial.Models.PostModel,
  comparator: "created"
});