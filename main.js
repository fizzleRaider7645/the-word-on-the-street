const shell = require("shelljs");
const {
  scripts: { searchTweets, formatTweetData },
} = require("./scripts");

// silly helper
const twirlTimer = function () {
  const P = ["\\", "|", "/", "-"];
  let x = 0;
  const intervalId = setInterval(function () {
    process.stdout.write("\r" + P[x++]);
    x &= 3;
  }, 250);

  return intervalId;
};

function main() {
  console.log("Running Analysis...");
  const intervalId = twirlTimer();
  searchTweets()
    .then((tweets) => formatTweetData(tweets))
    .then((result) => {
      clearInterval(intervalId);
      shell.exec("clear");
      console.log("Analysis Complete!");
      console.log(result);
    })
    .catch((error) => {
      clearInterval(intervalId);
      shell.exec("clear");
      console.error("Analysis Failed!");
      console.error(error);
    });
}

main();
