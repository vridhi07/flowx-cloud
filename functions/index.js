const functions = require("firebase-functions");
const nodemailer = require("nodemailer");
// const sgMail = require('@sendgrid/mail')
// sgMail.setApiKey('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')

//when this cloud function is already deployed, change the origin to 'https://your-deployed-app-url
const cors = require("cors")({ origin: true });

exports.sendEmail = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "join.flowx.team@gmail.com",
          pass: "bkqvaxwdhmwschqc",
        },
      });
      const email = req.body.email;
      const name = req.body.name;
      const message = req.body.message;
      const url = req.body.url;

      const mailOptions = {
        from: "join.flowx.team@gmail.com",
        to: `${email}`,
        subject: "Welcome to the FlowX Workplace Performance Challenge",
        text: `${name} says: ${message} <br /> ${url}`,
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          return res?.status(500).send({
            status: 500,
            message: error.toString(),
          });
        } else {
          return res?.status(200).send({
            status: 200,
            message: "sent",
          });
        }
      });
    } catch (error) {
      throw new Error(error);
    }
  });
});
