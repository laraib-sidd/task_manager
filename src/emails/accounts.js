const mailgun = require("mailgun-js");
const DOMAIN = process.env.DOMAIN
const apiKey = process.env.SENDGRID_API_KEY
const mg = mailgun({
    apiKey:process.env.SENDGRID_API_KEY,
    domain: DOMAIN
});

const sendWelcomeEmail = (name,email) => {
    const data = {
        from: 'Welcom New User <me@samples.mailgun.org>',
        to: email,
        subject: 'Thank you for joining us',
        text: `Welcome to the app ${name}, Let us know how much you like our app.`
    };
    mg.messages().send(data, function (error, body) {
        // console.log(error);
    });
}

const sendCancellationEmail = (name,email) => {
    const data = {
        from: `Goodbye ${name} <me@samples.mailgun.org>`,
        to: email,
        subject: 'It\'s that you are leaving us',
        text: `I hope you could fill out a feeback form for us.`
    };
    mg.messages().send(data, function (error, body) {
        // console.log(error);
    });
}
module.exports ={
    sendWelcomeEmail,
    sendCancellationEmail
}
