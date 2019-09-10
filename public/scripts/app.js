// /*
//  * Client-side JS logic goes here
//  * jQuery is already loaded
//  * Reminder: Use (and do all your DOM work in) jQuery's document ready function
//  */

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];
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
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
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





renderTweets(data);