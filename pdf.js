const HummusRecipe = require('hummus-recipe');
const pdfDoc = new HummusRecipe('reval.pdf', 'output.pdf');
pdfDoc
    .editPage(1)
    .text('Add some texts to an existing pdf file', 150, 300)
    .rectangle(20, 20, 40, 100)
    .comment('Add 1st comment annotaion', 200, 300)
    .endPage()
    .endPDF();