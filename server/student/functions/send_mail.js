const nodemailer = require('nodemailer');
const pdfmake = require('pdfmake/build/pdfmake');
const vfs_fonts = require('pdfmake/build/vfs_fonts');
pdfmake.vfs = vfs_fonts.pdfMake.vfs;

const { mail_add, mail_pwd } = require('../../../credentials/credentials');
const get_docdef = require('../../utils/get_docdef');

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: mail_add,
    pass: mail_pwd
  },
  tls: {
    rejectUnauthorized: false
  }
})


module.exports.sendMail = (name, email, sub_arr) => {
  return new Promise((resolve, reject) => {
    pdfmake.createPdf(get_docdef(name, req.usn, sub_arr))
    .getBase64(base_64_data => {
      transporter.sendMail(
        {
          from: mail_add, to: email,
          subject: "Revaluation application.",
          html: '<h3>wattup</h3>', 
          attachments: [
            { 
              filename: 'revaluationInfo.pdf', 
              content: base_64_data, 
              encoding: 'base64',
              contentType: 'text/pdf'
            }
          ]
        }, (error, info) => {
          error !== null ? reject("error while sending the mail!")
          : resolve('mail sent successfuly'); 
        }
      );
    })
  }) 
}

  
