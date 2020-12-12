const express = require("express")
const port=10011
const app = express()
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false});

var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'pwptesterml@gmail.com',
      pass: 'pwptestml123456789'
    }
  });


app.post('/mail', urlencodedParser, (req, res) => {
    const currentDate = new Date()
    const name = req.body.name
    const email = req.body.email
    const subject = req.body.subject
    const message = req.body.message

    var mailOptions = {
        from: name,
        to: 'pwptesterml@gmail.com',
        subject: subject,
        text: message
      };

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
          res.end();
        } else {
          console.log('Email sent: ' + info.response);
          res.end();
        }
      });

})

app.listen(port)
