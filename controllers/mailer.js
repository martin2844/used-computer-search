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
    

    // const html = `
    // <div>
    // <h4>Found new differences for</h4>
    // ${termy}
    // <br>
    // check them out @ <a href="localhost:5001/difference"> HERE </a>
    
    // </div>
    
    // `

    let html = '<div>' + terms.map((item)=> {
        let intItems = item.data.map((subitem) => {
            return(
                `
                <div>
                    <h3>${subitem.title} <strong style="color: red;">$${subitem.price}</strong></h3>
                    <p>${subitem.city} ${subitem.state}</p>
                    <a href="${subitem.link}">Link</a>
                </div>
                `
            )
        })
        return(
            `<div style="max-width: 200px; background-color: #ccc; border: 1px solid black; margin: 20px 10px">
                ${intItems}
            </div>`
        )
    }).join('') + '</div>' + "\n";


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