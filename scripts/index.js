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

const apiUrl = "https://api.twitter.com/2/";
const bearerToken = process.env.TWITTER_BEARER_TOKEN;

async function searchTweets(searchQuery, lang = "en") {
  try {
    const response = await axios.get(`${apiUrl}tweets/search/recent`, {
      params: {
        query: `${searchQuery} lang:${lang}`,
        expansions: "author_id",
      },
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    });
    console.log(response.data.includes);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

async function getUser(userId) {
  try {
    const response = await axios.get(`${apiUrl}users/${userId}`, {
      params: {
        "user.fields": "username,location,profile_image_url,verified",
        expansions: "pinned_tweet_id",
      },
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error.response.data.errors);
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
  // console.log(users);
  // // Filter the users to only include those with over 100k followers
  const topUsers = users.filter((user) => user.followers_count >= 20);
  // console.log(topUsers);
}

main();
