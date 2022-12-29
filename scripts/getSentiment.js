const { Configuration, OpenAIApi } = require("openai");
const dotenv = require("dotenv");

dotenv.config();

/**
 * Returns Sentiment Analysis
 * @param {string[]} tweetTextArray
 * @returns {Promise<string[]>}
 */
async function getSentiment(tweetTextArray) {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_SECRET_KEY,
  });
  const openai = new OpenAIApi(configuration);
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `Describe the sentiment in these tweets: ${tweetTextArray.toString()}`,
  });
  return completion.data;
}

module.exports = getSentiment;
