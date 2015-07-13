SimplySocial.Collections.PostsCollection = Backbone.Collection.extend({
  model: SimplySocial.Models.PostModel,
  comparator: function( collection ){
    console.log(collection.get( 'created' ))
    return( collection.get( 'created' ) );
  }
});