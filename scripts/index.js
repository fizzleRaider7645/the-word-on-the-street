const dotenv = require("dotenv");
// const searchTweets = require("./searchTweets");
const formatTweetData = require("./formatTweetData");
const getSentiment = require("./getSentiment");
const axios = require("axios");

dotenv.config();

// exports.credentials = {
//   OPENAI_SECRET_KEY: process.env.OPENAI_SECRET_KEY,
//   BEARER_TOKEN: process.env.TWITTER_BEARER_TOKEN,
// };

// exports.scripts = {
//   searchTweets,
//   formatTweetData,
//   getSentiment,
// };

const API_URL = "https://api.twitter.com/2/";
const BEARER_TOKEN = process.env.TWITTER_BEARER_TOKEN;

async function searchTweets(searchQuery, lang = "en") {
  try {
    const response = await axios.get(`${API_URL}tweets/search/recent`, {
      params: {
        query: `${searchQuery} lang:${lang}`,
        expansions: "author_id",
      },
      headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`,
      },
    });
    // console.log(response.data.includes);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

async function main() {
  // Search for tweets related to the stock market
  const { data } = await searchTweets("stock market");

  // Get the user object for each tweet
  const users = await Promise.all(
    data.map(async (tweet) => {
      return await getUser(tweet.author_id);
    })
  );

  // // Filter the users to only include those with over 100k followers
  const topUsers = users.filter(
    (user) => user.data.public_metrics.followers_count >= 1000
  );
  console.log(topUsers);
}

main();
