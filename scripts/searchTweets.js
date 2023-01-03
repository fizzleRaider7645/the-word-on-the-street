const axios = require("axios");

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

    return response.data;
  } catch (error) {
    console.error(error);
  }
}

module.exports = searchTweets;
