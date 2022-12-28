const getSentiment = require("./getSentiment");

async function formatTweetData(tweetTextArray) {
  const result = {};
  for (let i = 0; i < tweetTextArray.length; i++) {
    const tweetText = tweetTextArray[i];
    const { choices, usage } = await getSentiment(tweetText);
    const tickerSymbolsReferenced = tweetText
      .split(" ")
      .filter((tweetTextString) => tweetTextString.startsWith("$"));

    result[i + 1] = {
      ticker: tickerSymbolsReferenced,
      text: tweetText,
      sentiment: { choices: choices[0].text, usage },
    };
  }
  return result;
}

module.exports = formatTweetData;
