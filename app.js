// './sample.csv'
const fs = require('node:fs').promises;
const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');
const rl = readline.createInterface({ input, output });

function promptInterface() {
  rl.question("Enter the file path (or type 'exit' to quit): ", (filePath) => {
    if (filePath.toLowerCase() === 'exit') {
      console.log('exiting')
      rl.close();
      return;
    } else {
      read(filePath);
    }
  });
}
promptInterface();

async function read(filePath){
  filePath = filePath.trim().replace(/\/$/, '');
  if(!filePath.endsWith('.csv')) throw new Error("incorrect file format");
  try{
    const data = await fs.readFile(filePath, 'utf8')
    console.log(data);
    // pass this data into format CSV
  }
  catch (error) {
    console.log("hello", error)
  }
}

// function formatCSV(){

// }


// function printCSV() {
//   return; 
// }

// fs.readFile(filePath, 'utf8', (err, data) => {
//     if (err) {
//       console.error(err);
//       return;
//     }
//     console.log(data);
//   });



