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

  //fade toggles the search bar
  $('#mobile-search').on('click', function() {
    console.log('hi')
    $(".right input").fadeToggle();
  })


  //make a toggle fade for the avatar photo nav
  $('#avatar').hover( function(){
    $('#avatar-drop-down').fadeToggle();
  });


