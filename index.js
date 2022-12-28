const { scripts } = require("./scripts");

async function main() {
  const tweets = await scripts.searchTweets();
  const tweetData = scripts.formatTweetData(tweets);
  console.log(tweetData[1].text);
}

main();
