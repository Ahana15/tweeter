$(document).ready(function () {
  // --- our code goes here ---

  const maximumLength = 140;
  $(".tweet-text-area").keyup(function (e) {
    let currentTextLength = $(this).val().length;

    if (currentTextLength <= maximumLength) {
      let remainingLength = maximumLength - currentTextLength;
      $(".counter").text(remainingLength);
    }

  });

  $(".tweet-text-area").keydown(function (e) {
    let keycode = e.keyCode;
    let textLength = $(this).val().length;
    if (textLength > maximumLength) {
      if (keycode !== 8) {
        e.preventDefault();
        return false;
      }
    }


  });
});