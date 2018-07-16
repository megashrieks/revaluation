const nodemailer = require('nodemailer');
const pdfmake = require('pdfmake/build/pdfmake');
const vfs_fonts = require('pdfmake/build/vfs_fonts');
pdfmake.vfs = vfs_fonts.pdfMake.vfs;

const { mail_add, mail_pwd } = require('../../../credentials/credentials');
const get_docdef = require('../../utils/get_docdef');
// const { student } = require('../../models');

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

const mailOptions = {
    from: mail_add, 
    to: "prabhusachin44@gmail.com",
    subject: "Revaluation application.",
    html: '<h3>wattup</h3>', 
    attachments: [
      { 
        filename: 'reval.pdf', 
        content: null, 
        encoding: 'base64',
        contentType: 'text/pdf'
      }
    ]
};


module.exports = (req, res) => {
  const doc_def = get_docdef(
    4, req.body.name, req.body.usn, req.body.sub_arr
  );
  pdfmake.createPdf(doc_def).getBase64(base_64_data => {
    mailOptions.attachments[0].content = base_64_data;
    transporter.sendMail(mailOptions, (error, info) => {
      if (error)
        return res.json({ error: "error while sending the mail!" });
      mailOptions.attachments[0].content = null;
      res.json('mail sent successfuly'); 
    });
  })
}
  