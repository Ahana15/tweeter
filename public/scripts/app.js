// /*
//  * Client-side JS logic goes here
//  * jQuery is already loaded
//  * Reminder: Use (and do all your DOM work in) jQuery's document ready function
//  */


const escape = function (str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const daysLessThanSeven = (tweetDate) => {
  return (Date.now() >= tweetDate && tweetDate > (Date.now() - 604800000));
};

const daysAgo = (tweetDate) => {
  if (daysLessThanSeven(tweetDate)) {
    return `<span class="time" data-livestamp="${tweetDate / 1000}"></span>`;
  } else {
    return `<span class="time">${moment(tweetDate).format('MMMM Do YYYY, h:mm a')}</span>`;
  }
};

const renderTweets = (tweets) => {
  $("#tweet-container").empty();
  for (let tweet of tweets) {
    $("#tweet-container").prepend(createTweetElement(tweet));
  }
};

const createTweetElement = (tweet) => {
  let $tweet = (
    `<article class="tweets">
      <header>
      <div>
      <img src="${escape(tweet.user.avatars)}" class="avatar">
      <p>${escape(tweet.user.name)}</p>
      </div>
      <p class = "Username">${escape(tweet.user.handle)}</p>
      </header>
      <p>${escape(tweet.content.text)}</p>
      <footer>
        ${daysAgo(Number(escape(tweet.created_at)))}
        <span class="icons"><i class="fa fa-flag" width="100px" height="100px"></i>
          <i class="fa fa-heart"></i>
          <i class="fa fa-retweet"></i></span>
      </footer>
    </article>`
  );
  return $tweet;
};

const loadTweets = async () => {
  const response = await $.ajax({
    url: '/tweets/',
    type: 'GET',
  });
  renderTweets(response);
};

const validateUserInput = (input) => {
  if (input === "") {
    $('.error').text('❗️🙄Tweet field cannot be left blank. 🙄❗️');
    $('.error').slideDown();
    return false;
  } else if (input.length > 140) {
    $('.error').text('❗️🙄Tweet cannot be more than 140 characters.🙄❗️');
    $('.error').slideDown();
    return false;
  } else {
    return true;
  }
};

const getSerializedUserInput = () => {
  return $('.tweet-text-area').serialize();
};

$('#compose-tweet').submit(async (event) => {
  event.preventDefault();
  const input = $('.tweet-text-area').val();

  if (validateUserInput(input)) {
    if ($('p').hasClass('error')) {
      $('.error').slideUp();
    }
    await $.ajax('/tweets/', { method: 'POST', data: getSerializedUserInput() });
    $('.tweet-text-area').val("");
    $('.tweet-text-area').keyup();
    loadTweets();
  }
});

$(".arrows").click(() => {
  $(".new-tweet").slideToggle();
});

$(window).scroll(function () {
  if ($(this).scrollTop() > 300) { // 300px from top
    $('.fa-arrow-circle-up').fadeIn();
  } else {
    $('.fa-arrow-circle-up').fadeOut();
  }
});

$(".fa-arrow-circle-up").click(() => {
  $('.new-tweet').slideDown();
  $("html, body").animate({ scrollTop: 0 }, 200);
  $('.tweet-text-area').focus();

});

loadTweets();