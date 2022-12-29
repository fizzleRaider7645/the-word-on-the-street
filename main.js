const {
  scripts: { searchTweets, formatTweetData },
} = require("./scripts");

// silly helpers
const twirlTimer = function () {
  const P = ["\\", "|", "/", "-"];
  let x = 0;
  const intervalId = setInterval(function () {
    process.stdout.write("\r" + P[x++]);
    x &= 3;
  }, 250);

  return intervalId;
};

function logResult(logger, content, intervalId) {
  clearInterval(intervalId);
  console.clear();
  logger(content);
}
// silly helpers

async function main() {
  const intervalId = twirlTimer();
  try {
    const tweets = await searchTweets();
    const result = await formatTweetData(tweets);
    logResult(console.log, result, intervalId);
  } catch (error) {
    logResult(console.error, error.response.data.error, intervalId);
  }
}

main();
