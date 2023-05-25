let count=0;

//    The first element of the process.argv array
//   is always 'node', and the second element is always the path to your
//   baby-steps.js file,
// ['node', '/path/to/your/baby-steps.js', '1', '2', '3']

process.argv.forEach((val, index) => {
    if(index > 1){
    count += Number(val);
    }
  });
  console.log(count);