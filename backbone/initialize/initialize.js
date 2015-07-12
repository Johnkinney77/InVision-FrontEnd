$(function () {
  $('#avatar').on('mouseenter', function(){
    $('#avatar-drop-down').fadeIn();
  });
  $('#avatar').on('mouseleave', function(){
    $('#avatar-drop-down').fadeOut();
  });
  $('#mobile-search').on('click', function() {
    $("#right input").fadeToggle();
  })

});