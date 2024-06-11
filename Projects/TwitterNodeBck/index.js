const express = require('express');
const { TwitterApi } = require('twitter-api-v2');

// Set up the Express app
const app = express();
const port = 3000;

// Twitter API credentials
const client = new TwitterApi({
  appKey: "HG2hud2o3d3WKxo30qEMm9aOS",
  appSecret: "9YrkrwiQvUgooiO2cTBLwx5ZKzOeMsFZa8dp10sNgOYpnLpy1o",
  accessToken: "1423604730782126083-t2xAT8IB2u7qpV2Ky04hYOVeOF68hv",
  accessSecret: "l7c0SsPDRkOCNctIdDHTWjsQQ6phLcHdl5Ngp5vgKwhAB"
});

const twitterClient = client.readOnly;

// Function to get latest tweets from a user
const getLatestTweets = async (username) => {
  try {
    const user = await twitterClient.v2.userByUsername(username);
    const userId = user.data.id;
    const tweets = await twitterClient.v2.userTimeline(userId, { max_results: 5 });

    return tweets.data;
  } catch (error) {
    console.error('Error fetching tweets:', error);
    return [];
  }
};

// Endpoint to start monitoring a user's tweets
app.get('/monitor/:username', async (req, res) => {
  const username = req.params.username;
  console.log(`Started monitoring tweets for user: ${username}`);

  setInterval(async () => {
    const tweets = await getLatestTweets(username);
    if (tweets.length > 0) {
      console.log(`Latest tweets for ${username}:`);
      tweets.forEach(tweet => console.log(tweet.text));
    } else {
      console.log(`No recent tweets found for ${username}.`);
    }
  }, 60000); // Check every minute

  res.send(`Started monitoring tweets for user: ${username}`);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
