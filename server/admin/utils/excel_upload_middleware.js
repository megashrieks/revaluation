const xlsx = require('node-xlsx').default;

module.exports = (req, res, next) => {
  if(!req.files)
    return res.json({ error: "error while receiving the file" });

  let file = req.files.file_input;  // uploaded file.
  let namearr = file.name.split(".");  // for checking extension.
  if(namearr[namearr.length-1] !== 'xlsx')  // checking extension type.
    return res.json({ error: "invalid file type!! .xlsx file expected!!" })

  let data_from_buffer = xlsx.parse(file.data); 
  req.file_data = data_from_buffer[0].data; 
  next();
}