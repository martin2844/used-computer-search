const { json } = require("body-parser");
const nodemailer = require("nodemailer");
require('dotenv').config();


const mail = async (terms, email) => {

    let transporter = nodemailer.createTransport({
        host: 'smtp.zoho.com',
        port: 587,
        auth: {
           user: process.env.EMAIL,
           pass: process.env.MAILPASS
        }
    });
    
    let termy = JSON.stringify(terms);

    const html = `
    <div>
    <h4>Found new differences for</h4>
    ${termy}
    <br>
    check them out @ <a href="localhost:5001/difference"> HERE </a>
    
    </div>
    
    `

    // mensaje del nodemailer
    const message = await transporter.sendMail({
        from: process.env.EMAIL, // sender address
        to: email || "martinchammah@gmail.com", // list of receivers
        subject: `New differences of ` + Date(), // Subject line
        html: html
      });

      return message;

}


module.exports = mail;