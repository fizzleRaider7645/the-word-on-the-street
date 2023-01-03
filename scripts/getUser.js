async function getUser(userId) {
  try {
    const response = await axios.get(`${API_URL}users/${userId}`, {
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
