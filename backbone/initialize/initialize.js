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

  var listActive = true;
  var tilesActive = false;

  //fade toggles the search bar
  $('#mobile-search').on('click', function() {
    $(".right input").fadeToggle();
  })


  //make a toggle fade for the avatar photo nav
  $('#avatar').hover( function(){
    $('#avatar-drop-down').fadeToggle();
  });

  //opens new message model
  $('[data-button="new-message"]').on('click', function () {
    $('#new-message-model').fadeIn()
  })

  //closes new message model and clears out textarea val
  $('#new-message-exit').on('click', function() {
    $('#new-message-model').fadeOut()
    $('[data-input="message"]').val('')
  })

   //for submits on modal
  $('[data-submit="submit"]').on('click', function () {

    //gets current date and time
    var created = new Date().getTime()
    var message = $('[data-input="message"]').val()

    //hard coded some data right now as example
    postsCollection.add([{
      name: 'Jessica Tuan',
      comment: message,
      img_url: "./public/imgs/profile_pictures/jessica-tuan-profile-pic.jpg",
      created: created
    }]);
    //fades out and sets text area value to nothing
    $('#new-message-model').fadeOut()
    $('[data-input="message"]').val('')
  })


