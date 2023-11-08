require("dotenv").config();
const { template } = require("./utils/email");
const oauth2Client = require("./utils/oauth2");
const nodemailer = require("nodemailer");
const {
  GOOGLE_REFRESH_TOKEN,
  GOOGLE_SENDER_EMAIL,
  GOOGLE_RECEIVER_EMAIL,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
} = process.env;

oauth2Client.setCredentials({
  refresh_token: GOOGLE_REFRESH_TOKEN,
});

const sendEmail = async (to, subject, html) => {
  const accessToken = await oauth2Client.getAccessToken();

  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: GOOGLE_SENDER_EMAIL,
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      refreshToken: GOOGLE_REFRESH_TOKEN,
      accessToken: accessToken,
    },
  });

  await transport.sendMail({ to, subject, html });
};

sendEmail(GOOGLE_RECEIVER_EMAIL, "Test", template);
