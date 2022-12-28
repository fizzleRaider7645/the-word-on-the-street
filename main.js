const {
  scripts: { searchTweets, formatTweetData },
} = require("./scripts");

async function main() {
  const tweets = await searchTweets();
  const tweetData = formatTweetData(tweets);
  console.log(tweetData[1]);
}

main();
