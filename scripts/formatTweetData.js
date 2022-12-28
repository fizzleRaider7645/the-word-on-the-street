const Sentiment = require("sentiment");

const sentiment = new Sentiment();

function formatTweetData(tweetTextArray) {
  const result = {};
  tweetTextArray.map((tweetText, index) => {
    const tweetSentiment = sentiment.analyze(tweetText);
    const tickerSymbolsReferenced = tweetText
      .split(" ")
      .filter((tweetTextString) => tweetTextString.startsWith("$"));

    result[index + 1] = {
      ticker: tickerSymbolsReferenced,
      text: tweetText,
      sentiment: tweetSentiment,
    };
  });
  return result;
}

module.exports = formatTweetData;
