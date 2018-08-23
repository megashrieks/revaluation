const nodemailer = require('nodemailer');
const HummusRecipe = require('hummus-recipe');
const fs = require('fs');

const { mail_add, mail_pwd } = require('../../../credentials/credentials');
const font_style = { 
  fontSize: 13,
  color: '111111'
},
sub_font_style = {
  ...font_style,
  fontSize: 12
};

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


module.exports.sendMail = (name = "Dummy Name", email, sub_arr, usn) => {
  return new Promise((resolve, reject) => {
    let pdfDoc = new HummusRecipe('./reval.pdf', `${usn}_info.pdf`);

    let my_pdf = pdfDoc.editPage(1);
    let d = new Date(), usn_len = usn.length;

    // adding DATE to the pdf.
    my_pdf.text(`${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}`, 
    488, 158, sub_font_style);

    // adding NAME to the pdf.
    my_pdf.text(name, 175, 173, font_style);

    // adding USN to the pdf.
    for(let i=0;i<usn_len;++i) {
      let col = 185 + i*24.6;
      my_pdf.text(`${usn[i]}`, col, 210, font_style);
    }

    // adding SUBJECTS to the pdf.    
    sub_arr.forEach((sub, index) => {
      let row = 310 + index*22;
      my_pdf.text(`${sub.sem}`, 124, row, font_style);
      my_pdf.text(`${sub.sub_code}`, 171, row, font_style);
      my_pdf.text(`${sub.sub_name}`, 240, row, sub_font_style);
    })

    my_pdf.endPage().endPDF(
      () => {
        transporter.sendMail(
          {
            from: mail_add, to: email,
            subject: "Revaluation application.",
            html: '<h3>wattup</h3>', 
            attachments: [
              { 
                filename: 'revaluationInfo.pdf', 
                path: `./${usn}_info.pdf`, 
                contentType: 'text/pdf'
              }
            ]
          }, (error, info) => {
            error !== null ? reject("error while sending the mail!")
            : resolve('mail sent successfuly'); 
            fs.unlink(`./${usn}_info.pdf`);
          }
        );
      }
    );
  }) 
}

  
