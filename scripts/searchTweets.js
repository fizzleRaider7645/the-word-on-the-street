const axios = require("axios");
const env = require("./index");

const TWITTER_API_BASE_URL = "https://api.twitter.com/2";

/**
 * @returns {Promise<string[]>}
 */
async function searchTweets() {
  const symbols = process.argv.slice(2) || "AAPL";

  try {
    const {
      data: { data },
    } = await axios.get(`${TWITTER_API_BASE_URL}/tweets/search/recent`, {
      params: {
        query: `${symbols.join(" OR ")} lang:en`,
        expansions: "author_id",
        max_results: 30,
      },
      headers: {
        Authorization: `Bearer ${env.credentials.BEARER_TOKEN}`,
        "Content-Type": "application/json",
      },
    });
    console.log(data);
    data.forEach((tweet) => {});
    // return data.map((tweet) => tweet.text);
  } catch (error) {
    console.error(error.response.data.errors);
  }
}

module.exports = searchTweets;
