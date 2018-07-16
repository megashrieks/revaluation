const msg_generator = (success, error_msg) => {
  return {
    success: success,
    error: error_msg
  }
}

// does both duplicate check and format check.
module.exports = (dataset, format_array, dup_index) => {
  const column_length = format_array.length;
  const dup_check_needed = dup_index !== -1;
  let s = dup_check_needed ? new Set() : null;
    

  for(let data of dataset) {
    // format/type check.
    if(data.length === 0)  // ignoring empty rows if any.
      continue;

    if(data.length !== column_length)
      return msg_generator(false, "invalid data format!!!!");
      
    for(let i=0;i<column_length;++i)
      if(typeof data[i] !== format_array[i])
        return msg_generator(false, "invalid data format!!!");
    
    // duplicate check.
    if(dup_check_needed) {
      if(s.has(data[dup_index]))
        return msg_generator(false, "duplicate id found!!!")
      s.add(data[dup_index])
    }
    
  }
  return msg_generator(true, null);
}