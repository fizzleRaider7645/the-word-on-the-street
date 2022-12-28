const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const TWITTER_API_BASE_URL = "https://api.twitter.com/2";
const BEARER_TOKEN = process.env.TWITTER_BEARER_TOKEN;

async function searchTweets() {
  const symbols = process.argv.slice(2);

  try {
    const {
      data: { data },
    } = await axios.get(`${TWITTER_API_BASE_URL}/tweets/search/recent`, {
      params: {
        query: `${symbols.join(" OR ")} lang:en`,
        max_results: 30,
      },
      headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`,
        "Content-Type": "application/json",
      },
    });
    return data.map((tweet) => tweet.text);
  } catch (error) {
    console.error(error);
  }
}

module.exports = searchTweets;
