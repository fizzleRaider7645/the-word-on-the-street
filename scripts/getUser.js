const {
  config: {
    credentials: { TWITTER_API_URL, BEARER_TOKEN },
    services: { AXIOS },
  },
} = require("./config");

/**
 * Returns Sentiment Analysis
 * @typedef {Object} UserData
 * @property {string} location
 * @property {string} profile_image_url
 * @property {string} id
 * @property {string} username
 * @property {string} name
 * @property {Object} public_metrics
 * @property {boolean} verified
 */

/**
 * Returns Sentiment Analysis
 * @param {string} userId
 * @returns {Promise<{UserData}>}
 */
async function getUser(userId) {
  try {
    const response = await AXIOS.get(`${TWITTER_API_URL}users/${userId}`, {
      params: {
        "user.fields":
          "username,location,profile_image_url,verified,public_metrics,url",
      },
      headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error.response.data.errors);
  }
}

module.exports = getUser;
