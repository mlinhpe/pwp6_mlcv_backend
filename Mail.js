const express = require("express")
const port= 10011
const app = express()
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false});
const PDFDocument = require('pdfkit')
const fs = require('fs')

var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'pwptesterml@gmail.com',
      pass: 'pwptestml123456789'
    }
  });


app.post('/mail', urlencodedParser, (req, res) => {
    const email = req.body.email
    const subject = req.body.subject
    const message = req.body.message

    var mailOptions = {
        from: email,
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

const resumeText =
`
Resume

Mai Linh Pham
mai_linh.pham@campus.lmu.de


- Education

University
-- B.Sc. Business Administration, LMU (2014)
-- B.Sc. Computational Linguistics, LMU (2017)
-- M.Sc. Computer Science, LMU (tba)


- Work

EQS Group AG
-- Working Student, Backend Developer (May 2017 - Sept. 2017)

gutefrage.net
-- Working Student, Data Engineer (Oct. 2017 - Mar. 2018)

ProsiebenSat1 Tech-Solutions GmbH
-- Data Engineer (Apr. 2018 - now)


- Skills

Scala: 50%
Python | NLP: 20%
SQL: 45%
Java: 25%
JavaScript | CSS | HTML: 10%

`

app.get('/download-cv', (req, res) => {
    let pdfDoc = new PDFDocument;
    pdfDoc.pipe(fs.createWriteStream('Mailinh_Pham_CV.pdf')).on("finish", function() {
        res.download("Mailinh_Pham_CV.pdf");
    });
    pdfDoc.text(resumeText)
    pdfDoc.end();
});

app.listen(port)
