const {
  config: {
    credentials: { OPENAI_SECRET_KEY },
    services: {
      OPENAI: { Configuration, OpenAIApi },
    },
  },
} = require("./config");

/**
 * Returns Sentiment Analysis
 * @param {string[]} tweetTextArray
 * @returns {Promise<string[]>}
 */
async function getSentiment(tweetTextArray) {
  const configuration = new Configuration({
    apiKey: OPENAI_SECRET_KEY,
  });
  const openai = new OpenAIApi(configuration);
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `Describe the sentiment in these tweets: ${tweetTextArray.toString()}`,
  });
  return completion.data;
}

module.exports = getSentiment;
