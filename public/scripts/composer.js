
$(document).scroll(function () {
  if ($(this).scrollTop() > 500) { // 300px from top
    $('.fa-arrow-circle-up').fadeIn();
  } else {
    $('.fa-arrow-circle-up').fadeOut();
  }
});

$('.fa-arrow-circle-up').click(() => {
  $('.new-tweet').slideDown();
  $('html, body').animate({ scrollTop: 0 }, 200);
  $('.tweet-text-area').focus();

});