const {
  scripts: { searchTweets, formatTweetData },
} = require("./scripts");

// silly helpers
function twirlTimer() {
  const P = ["\\", "|", "/", "-"];
  let x = 0;
  return setInterval(function () {
    process.stdout.write("\r" + P[x++]);
    x &= 3;
  }, 250);
}

function logResult(logger, content, intervalId) {
  clearInterval(intervalId);
  console.clear();
  logger(content);
}
// silly helpers

async function main() {
  // const intervalId = twirlTimer();
  try {
    const tweets = await searchTweets();
    // const result = await formatTweetData(tweets);
    // logResult(console.log, tweets, intervalId);
  } catch (error) {
    // logResult(console.error, error.response.data.error, intervalId);
    // logResult(console.error, error, intervalId);
  }
}

main();
