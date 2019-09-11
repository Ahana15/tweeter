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

const daysAgo = (dateOfTweet) => {

  let todaysDate = new Date();
  let days = Math.floor(Math.abs((todaysDate.getTime() - dateOfTweet) / (1000 * 60 * 60 * 24)));
  if (days < 7 && days > 1) {
    return (`${days} days ago`);
  } else {
    return (new Date(dateOfTweet));
  }
};

const renderTweets = (tweets) => {
  if (Array.isArray(tweets)) {
    for (let tweet of tweets) {
      $("#tweet-container").prepend(createTweetElement(tweet));
    }
  } else {
    $("#tweet-container").prepend(createTweetElement(tweets));
  }

};

const createTweetElement = (tweet) => {
  let $tweet = `<article class="tweets">
  <header>
  <div>
  <img src="${escape(tweet.user.avatars)}" class="avatar">
  <p>${escape(tweet.user.name)}</p>
  </div>
  <p class = "Username">${escape(tweet.user.handle)}</p>
  </header>
  <p>${escape(tweet.content.text)}</p>
  <footer>
    <span class="time">${escape(daysAgo(tweet.created_at))}</span>
    <span class="icons"><i class="fa fa-flag" width="100px" height="100px"></i>
      <i class="fa fa-heart"></i>
      <i class="fa fa-retweet"></i></span>
  </footer>
</article>`;

  return $tweet;
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

const getUserTweetInput = () => {
  const input = $('.tweet-text-area');
  return input.serialize();
};

const loadCurrentTweet = async () => {
  const response = await $.ajax({
    url: '/tweets/',
    type: 'GET',
  });

  renderTweets(response[(response.length) - 1]);
};

$('#compose-tweet').submit(async (event) => {
  event.preventDefault();
  const input = $('textarea').val();

  // if (input === "") {
  //   $('.error').text('❗️🙄Tweet field cannot be left blank. 🙄❗️');
  //   // $('.error').show();
  //   $('.error').slideDown();


  // } else if (input.length > 140) {
  //   $('.error').text('❗️🙄Tweet cannot be more than 140 characters.🙄❗️');
  //   // $('.error').show();
  //   $('.error').slideDown();

  // } else {
  if (validateUserInput(input)) {

    if ($('p').hasClass('error')) {
      // $('.error').hide();
      $('.error').slideUp();
    }

    await $.ajax('/tweets/', { method: 'POST', data: getUserTweetInput() });
    loadCurrentTweet();

    $('.tweet-text-area').val("");
    $('.tweet-text-area').keyup();

  }


});

$(".arrows").click(() => {
  $(".new-tweet").slideToggle();
});

const loadTweets = async () => {
  const response = await $.ajax({
    url: '/tweets/',
    type: 'GET',
  });
  renderTweets(response);
};


loadTweets();