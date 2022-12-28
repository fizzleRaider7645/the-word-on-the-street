const axios = require("axios");
const Sentiment = require("sentiment");
const dotenv = require("dotenv");

dotenv.config();

const sentiment = new Sentiment();
const TWITTER_API_BASE_URL = "https://api.twitter.com/2";
const BEARER_TOKEN = process.env.BEARER_TOKEN;

async function searchTweets() {
  const symbols = process.argv.slice(2);

  try {
    const {
      data: { data },
    } = await axios.get(`${TWITTER_API_BASE_URL}/tweets/search/recent`, {
      params: {
        query: symbols.join(" OR "),
        max_results: 100,
      },
      headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`,
        "Content-Type": "application/json",
      },
    });
    const tweetTexts = data.map((tweet) => tweet.text);
    const tweetTextsSentiment = tweetTexts.map((text) =>
      sentiment.analyze(text)
    );
    const result = { tweetTexts, tweetTextsSentiment };
    console.dir(result);
    return result;
  } catch (error) {
    console.error(error);
  }
}

exports.searchTweets = searchTweets;
