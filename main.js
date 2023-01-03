const {
  scripts: { searchTweets, formatTweetData, getUser },
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
  const intervalId = twirlTimer();

  try {
    // Search for tweets related to the stock market
    const { data } = await searchTweets("stock market");

    // Get the user object for each tweet
    const users = await Promise.all(
      data.map(async (tweet) => {
        return await getUser(tweet.author_id);
      })
    );

    // Filter the users to only include those with over 100k followers
    const topUsers = users.filter(
      (user) => user.data.public_metrics.followers_count >= 1000
    );

    logResult(console.log, topUsers, intervalId);
  } catch (error) {
    logResult(console.error, error, intervalId);
  }
}

main();
