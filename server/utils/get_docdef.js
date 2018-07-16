module.exports = (name, usn, sub_arr) => {
  return {
    content: [
      `name:  ${name}\n`,
      `usn:  ${usn}\n\n`,
      'details...\n',

      {
        table: {
          widths: [50, 50, '*', '*', 50, 50],
          body: [
            ['sl.no', 'semester', 'course code', 'course title',
              'CIE marks', 'SEE marks'
            ],
            ...sub_arr.map((sub, index) => [index+1, sub.sem, sub.sub_code,
            sub.sub_name, null, null])
          ]
        }
      }
      
    ]
  }
}