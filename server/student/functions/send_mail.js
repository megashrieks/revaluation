const nodemailer = require('nodemailer');
const pdfmake = require('pdfmake/build/pdfmake');
const vfs_fonts = require('pdfmake/build/vfs_fonts');
pdfmake.vfs = vfs_fonts.pdfMake.vfs;

const { mail_add, mail_pwd } = require('../../../credentials/credentials');
const get_docdef = require('../../utils/get_docdef');
const { reval, student } = require('../../models');

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
    to: null,
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


// { email: '' } 

module.exports = (req, res) => {
  Promise.all(
    [
      student.findOne({ usn: req.usn }, { name: 1 }), 
      reval.find({ usn: req.usn }, { sub_code: 1, sub_name: 1, sem: 1 })
    ]
  )
  .then(data => {
    pdfmake.createPdf(get_docdef(data[0].name, req.usn, data[1]))
    .getBase64(base_64_data => {
      mailOptions.to = req.body.email;
      mailOptions.attachments[0].content = base_64_data;
      transporter.sendMail(mailOptions, (error, info) => {
        if (error)
          return res.json({ error: "error while sending the mail!" });
        mailOptions.attachments[0].content = null;
        res.json('mail sent successfuly'); 
      });
    })

  })
  
}
  
