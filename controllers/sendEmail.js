const nodeMailer = require('nodemailer');
const sgMail = require('@sendgrid/mail');

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
  try{
    const information = await sgMail.send(msg);
    res.json(information)
  }catch (error) {
    res.json(error);
  }

};

module.exports = sendGridEmail;