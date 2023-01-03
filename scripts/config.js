const axios = require("axios");
const { Configuration, OpenAIApi } = require("openai");
const dotenv = require("dotenv");

dotenv.config();

const TWITTER_API_URL = "https://api.twitter.com/2/";
const BEARER_TOKEN = process.env.TWITTER_BEARER_TOKEN;
const OPENAI_SECRET_KEY = process.env.OPENAI_SECRET_KEY;

exports.config = {
  credentials: { TWITTER_API_URL, BEARER_TOKEN, OPENAI_SECRET_KEY },
  services: { AXIOS: axios, OPENAI: { Configuration, OpenAIApi } },
};
