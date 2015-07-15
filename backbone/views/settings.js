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