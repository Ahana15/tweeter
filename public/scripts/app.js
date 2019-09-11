// /*
//  * Client-side JS logic goes here
//  * jQuery is already loaded
//  * Reminder: Use (and do all your DOM work in) jQuery's document ready function
//  */

const daysAgo = (dateOfTweet) => {

  let todaysDate = new Date();
  let days = Math.floor(Math.abs((todaysDate.getTime() - dateOfTweet) / (1000 * 60 * 60 * 24)));
  if (days < 7) {
    return (`${days} days ago`);
  } else {
    return (new Date(dateOfTweet));
  }
};

const renderTweets = (tweets) => {
  for (let tweet of tweets) {
    $("#tweet-container").append(createTweetElement(tweet));
  }
};

const createTweetElement = (tweet) => {
  let $tweet = `<article class="tweets">
  <header>
  <div>
  <img src="${tweet.user.avatars}" class="avatar">
  <p>${tweet.user.name}</p>
  </div>
  <p class = "Username">${tweet.user.handle}</p>
  </header>
  <p>${tweet.content.text}</p>
  <footer>
    <span class="time">${daysAgo(tweet.created_at)}</span>
    <span class="icons"><i class="fa fa-flag" width="100px" height="100px"></i>
      <i class="fa fa-heart"></i>
      <i class="fa fa-retweet"></i></span>
  </footer>
</article>`;

  return $tweet;
};

const validateUserInput = (input) => {
  if (input === "") {
    alert("Tweet field cannot be left blank");
  } else if (input.length > 140) {
    alert("Tweet cannot be more than 140 characters.");
  }

  return true;
};

const getUserTweetInput = () => {
  const input = $('.tweet-text-area');

  return input.serialize();
};

$('#compose-tweet').submit((event) => {
  event.preventDefault();
  const input = $('textarea').val();

  if (validateUserInput(input)) {
    $.ajax('/tweets/', { method: 'POST', data: getUserTweetInput() });
  }
});

const loadTweets = async () => {
  const response = await $.ajax({
    url: '/tweets/',
    type: 'GET',
  });
  renderTweets(response);
};

loadTweets();