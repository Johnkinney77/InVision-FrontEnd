$(function () {

  $(window).resize(function () {
    screenWidth = $(window).width()
    if (screenWidth > 550) {
      $("#nav #right input").css('display', '')
    }
  });

  $('#avatar').hover( function(){
    $('#avatar-drop-down').fadeToggle();
  });
  $('#mobile-search').on('click', function() {
    $("#nav #right input").fadeToggle();
  })

});
