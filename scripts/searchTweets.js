const {
  config: {
    credentials: { TWITTER_API_URL, BEARER_TOKEN },
    services: { AXIOS },
  },
} = require("./config");

async function searchTweets(searchQuery, lang = "en") {
  try {
    const response = await AXIOS.get(`${TWITTER_API_URL}tweets/search/recent`, {
      params: {
        query: `${searchQuery} lang:${lang}`,
        expansions: "author_id",
        max_results: 50,
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
