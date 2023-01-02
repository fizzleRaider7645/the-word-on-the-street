const dotenv = require("dotenv");
const searchTweets = require("./searchTweets");
const formatTweetData = require("./formatTweetData");
const getSentiment = require("./getSentiment");

dotenv.config();

exports.credentials = {
  OPENAI_SECRET_KEY: process.env.OPENAI_SECRET_KEY,
  BEARER_TOKEN: process.env.TWITTER_BEARER_TOKEN,
};

exports.scripts = {
  searchTweets,
  formatTweetData,
  getSentiment,
};
