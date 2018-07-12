const xlsx = require('node-xlsx').default;
const { student } = require('../../models');

const format_array = [
  "string",
  "string",
  "number",
  "string",
  "string"
], column_length = 5;

const msg_generator = (success, error_msg) => {
  return {
    success: success,
    error: error_msg
  }
}
// does both duplicate check and format check.
const is_valid = (students) => {
  let s = new Set();
  for(let stud of students) {
    // format/type check.
    if(!stud.length)
      continue;
    if(stud.length !== column_length)
      return msg_generator(false, "invalid data format!!!!");
    for(let i=0;i<column_length;++i)
      if(typeof stud[i] !== format_array[i])
        return msg_generator(false, "invalid data format!!!");
    
    // duplicate usn check.
    if(s.has(stud[0]))
      return msg_generator(false, "duplicate id found!!!")
    s.add(stud[0])
  }
  return msg_generator(true, null);
}

module.exports = (req, res) => {
  if(!req.files)
    return res.json({ error: "error while receiving the file" });

  let file = req.files.file_input;  // uploaded file.
  let namearr = file.name.split(".");  // for checking extension.
  if(namearr[namearr.length-1] !== 'xlsx')  // checking extension type.
    return res.json({ error: "invalid file type!! .xlsx file expected!!" })
  
  let data_from_buffer = xlsx.parse(file.data); 
  let student_data = data_from_buffer[0].data;

  let check = is_valid(student_data);
  if(!check.success)
    res.json({ error: check.error });
  else 
    Promise.all(student_data.map(stud => {
      return new student({
        usn: stud[0],
        name: stud[1],
        dob: new Date((stud[2] - (25567+2))*86400*1000),
        branch: stud[3],
        email: stud[4]
      }).save();
    }))
    .then(data => res.json({ data: "data succesfully uploaded to db" }))
    .catch(err => res.json({ error: "error while uploading to db" }));
}