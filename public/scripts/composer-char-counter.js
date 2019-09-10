$(document).ready(function () {
  // --- our code goes here ---

  const maximumLength = parseInt($(".counter").text());


  $(".tweet-text-area").keyup(function (e) {
    let currentTextLength = $(this).val().length;
    let remainingLength = maximumLength - currentTextLength;
    $(".counter").text(remainingLength);

    if (remainingLength < 0) {
      $(".counter").css('color', 'red');

    } else {
      $(".counter").css('color', 'black');

    }

  });

  // $(".tweet-text-area").keydown(function (e) {
  //   let keycode = e.keyCode;
  //   let textLength = $(this).val().length;
  //   if (textLength > maximumLength) {
  //     // $(".counter").css('colour', 'red');
  //     // $(".counter").text(maximumLength - textLength);
  //     if (keycode !== 8) {
  //       e.preventDefault();
  //       return false;
  //     }
  //   }


  // });
});