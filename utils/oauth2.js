const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;

const { google } = require("googleapis");

const oauth2Client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET
);

module.exports = oauth2Client;
