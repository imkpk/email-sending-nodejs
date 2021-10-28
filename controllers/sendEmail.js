require('dotenv').config();
const nodeMailer = require('nodemailer');
const sgMail = require('@sendgrid/mail');
const sgTransport = require('nodemailer-sendgrid-transport');
let SibApiV3Sdk = require('sib-api-v3-sdk');

const sendingEmail = async (req, res) => {
  const testAccount = await nodeMailer.createTestAccount();

  const transporter = await nodeMailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'aric.hudson@ethereal.email',
      pass: '8NJGS44fpwSFNKGGdE',
    },
  });

  const info = await transporter.sendMail({
    from: '"Pratibha Kumar 👻" <imkpk@live.com>', // sender address
    to: [ 'uidev.kumark@gmail.com', 'vvkumarpy@gmail.com' ], // list of
    // receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world?', // plain text body
    html: '<h2>Sending email with node.js</h2>', // html body
  });

  res.json(info);

};

const sendGridEmail = async (req, res) => {
  sgMail.setApiKey(process.env.SendEmail);
  const msg = {
    to: 'imkpk@live.in', // Change to your recipient
    from: `uidev.pratibha@gmail.com`, // Change to your verified sender
    subject: 'Sending with SendGrid is Fun',
    text: 'sending mail from nodejs with sendGrid dependency',
    html: '<h2>and easy to do anywhere, this is awesome </h2>',
  };
  try {
    const information = await sgMail.send(msg);
    res.json(information);
  } catch (error) {
    res.json(error);
  }

};

const sendGridTransport = async (req, res) => {
  const options = { auth: { api_key: process.env.SendEmail } };

  const mailer = nodeMailer.createTransport(sgTransport(options));

  const email = {
    to: [ 'imkpk@live.com', 'prathibhakumar.kashapogu@gmail.com' ],
    from: 'uidev.kumark@gmail.com',
    subject: 'Hi there',
    text: 'Awesome sauce',
    html: '<b>Awesome sauce by Vasu </b>',
  };
  try {
    const success = await mailer.sendMail(email);
    res.status(201).json(success);
  } catch (error) {
    res.status(404).json(error);
  }

};

const sendBlue = async (req, res) => {
  SibApiV3Sdk.ApiClient.instance.authentications['api-key'].apiKey = process.env.Blue_Mail;
  const email = {
    'subject': 'Hello from the Node SDK!',
    'sender': { 'email': 'imkpk@lve.com', 'name': 'Pratibha' },
    'replyTo': { 'email': 'uidev.kumark@gmail.com', 'name': 'Kumar K' },
    'to': [
      { 'name': 'Kumar', 'email': 'uidev.pratibha@gmail.com' },
      { 'name': 'Vignesh', 'email': 'vvkumarpy@gmail.com' } ],
    'htmlContent': '<html><body><h1>This is a transactional email {{params.bodyMessage}}</h1></body></html>',
    'params': { 'bodyMessage': 'Made just for you! Vignesh' },
  };
  try {
    const sendMail = await new SibApiV3Sdk.TransactionalEmailsApi().sendTransacEmail(
      email);
    res.status(201).json(sendMail);
  } catch (error) {
    res.status(500).json(error);

  }
};

module.exports = sendBlue;