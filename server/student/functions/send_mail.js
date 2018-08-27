const nodemailer = require('nodemailer');
const HummusRecipe = require('hummus-recipe');
const fs = require('fs');

const { mail_add, mail_pwd } = require('../../../credentials/credentials');
const font_style_12 = {
  fontSize: 12, color: '111111'
}, font_style_10 = {
  fontSize: 10, color: '111111'  
}, font_style_11 = {
  fontSize: 11, color: '111111'  
}

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
    let pdfDoc = new HummusRecipe('./reval.pdf', `./${usn}_info.pdf`);

    let my_pdf = pdfDoc.editPage(1);
    let d = new Date(), usn_len = usn.length;

    // adding DATE to the pdf.
    my_pdf.text(`${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}`, 
    488, 158, font_style_12);

    // adding NAME to the pdf.
    my_pdf.text(name, 175, 173, font_style_12);

    // adding USN to the pdf.
    for(let i=0;i<usn_len;++i) {
      let col = 185 + i*24.8;
      my_pdf.text(`${usn[i]}`, col, 212, font_style_12);
    }

    // adding SUBJECTS to the pdf. 
    for(let i=0;i<sub_arr.length;++i) {
      let sub = sub_arr[i];
      let row = 311 + i*22;
      my_pdf.text(`${sub.sem}`, 124, row, font_style_10);
      my_pdf.text(`${sub.sub_code}`, 171, row, font_style_10);
      my_pdf.text(`${String(sub.sub_name).toLowerCase()}`, 233, row, font_style_10);
    }

    // adding count and Amount.
    my_pdf.text(`${sub_arr.length}`, 318, 555, font_style_10);
    my_pdf.text(`Rs. ${sub_arr.length*1000}`, 390, 550, font_style_10);    

    my_pdf.endPage().endPDF(
      () => {
        transporter.sendMail(
          {
            from: mail_add, to: email,
            subject: "Revaluation application.",
            html: `<h4>Your application for revaluation has been attached with this email.
            Please show this to academic section and pay the fee specified.</h4>`, 
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
            fs.unlinkSync(`./${usn}_info.pdf`);
          }
        );
      }
    );
  }) 
}

  
