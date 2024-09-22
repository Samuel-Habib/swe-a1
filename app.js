const readline = require('readline');
const fs = require('fs');
const { exit } = require('process');
const { machine } = require('os');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

function promptInterface(){
    rl.question('CSV File Name [Ex. sample.csv] (type \'exit\' to quit): ', (filePath) => {
        if (filePath.toLowerCase() === 'exit') {
            console.log('Exiting...');
            rl.close();
            return;
        }
        read(filePath); 
    });
}
promptInterface();


function read(filePath){
  console.log(filePath)
  if(!filePath.endsWith('.csv')) throw new Error("incorrect file format");
  fs.readFile(filePath, 'utf8', (err, content) => {
      if (err) throw new Error('Error reading the file')
      const array = Arr(content, filePath)
      const max = maxLength(array)
      const maxColVar = maxLengthInCol(array)
      const diffArr = diff(array, maxColVar)
      var divLength = divderlength(diffArr, max)
      makeTable(array, diffArr, divLength)

  });
}

function Arr(data){
  // RETURNS ARRAY
  // This funciton creates an array from the csv

  let arr = [];
  const rawRows = data.trim().split('\n')
  /*Creates a new array rawRows with no spaces that splits the inputted data 
  (the csv file) by /n which is a new line
  */
  console.log(rawRows)
  for(let i = 0; i<rawRows.length;i++){
    if(rawRows[i].length > 100) throw new Error("Array won't fit in the console")
    const Row = rawRows[i].trim().split(',')
    //Splits the rows by commas
    arr.push(Row)
    console.log(Row)
    //If row lengths are valid, they will be pushed into the stack of the new array
  }
  return arr
}

function maxLength(Arr){
  // Takes in the array just created and returns the length of the longest value
  // RETURNS INT
  const N = Arr.length
  var count = 0;
  for(let i = 0; i<N; i++){
    let rowLength =0;
    for(let j = 0; j< Arr[i].length; j++){
      // add up all of the items in the row first (all of the j items in col i)
      rowLength += Arr[i][j].length
    }
    if(rowLength > count) {
      count = rowLength
    }
    else continue
  }
  return count
}

function maxLengthInCol(Arr){
  // i-th row, j-th column
  // RETURNS a 1D array with the length of the largest element in the col
  // [[all of the val of the first col] [second col] ...]

  // Init countArr 2D array
  let countArr = new Array(0);
  for(let i = 0; i<Arr[i].length; i++){
    countArr[i] = new Array(0);
  }
  
  // Array of length Arr[1].length
  for(let i = 0;i<Arr[i].length; i++){
    for(let j = 0; j<Arr.length; j++){
      // Arr[i].length is the length of the columns at every row i 
      countArr[i].push(Arr[j][i].length)
    }
  }
  // Reducing the column lengths to the max length
  const max = []
  for(let i =0; i<countArr.length; i++) {
    max.push(Math.max(...countArr[i]))
    // the Math.max requires the ... operator to work on arrays
  }

  return max

}

function diff(Arr, maxColVar){
    // This function does not handle spaces, that is done directly in makeTable
    // Creates a 2D array with the differences from the max length in each column from the current length
    let diffArr = new Array(Arr.length); 
    for (let i = 0; i < Arr.length; i++) {
      diffArr[i] = new Array(Arr[i].length).fill(0); 
        // MAKE SURE TO INITIALIZE IF YOU ARE ACCESSING
        // otherwise you must push values into the 2d array
    }
    console.log(diffArr)
  
    for (let i = 0; i < Arr.length; i++) {
      for (let j = 0; j < Arr[i].length; j++) {
        if(Arr[i][j].length == maxColVar[j]){
          continue
        } else{
          diffArr[i][j] = maxColVar[j]- Arr[i][j].length
        }
      }
    }
    return diffArr
}

function divderlength(diff, maxLength){
  // bars + maxlength + spaces + 1 space per column
  var rowLen  = diff[0].length*2
  console.log(rowLen)
  var rowTotalSpace = []
  var currRowSpace = 0
  var divider = ""

  // account for rowLength
  for (let i = 0; i < (rowLen); i++) {
    // divide by 2 because just the length of the row doesn't add that much
    divider += "-"
  }

  // add the maxLength 
  for(let i = 0; i <maxLength; i++){
    divider += "-"
  }

  // find the row with the most spaces
  

  for (let i = 0; i < diff.length; i++) {
    currRowSpace = 0
    for (let j = 0; j < diff[i].length-1; j++) {
      currRowSpace += diff[i][j]
    }
    rowTotalSpace.push(currRowSpace)
  }
  let RS = Math.max(...rowTotalSpace)
  // account for the total spaces
  console.log("totoal spaces are:   " + rowTotalSpace)
  for (let i = 0; i < RS; i++) {
    divider += "-"
  }
  return divider;
    
}

function makeTable(Arr, diff, divider){
  var spaces = ""
  var countPerItem = 0

  console.log(diff)
  for (let i = 0; i < Arr.length; i++) {
    for (let j = 0; j < Arr[i].length; j++) {
      countPerItem = diff[i][j]
      spaces = ""
      for (let m = 0; m < countPerItem; m++) {
        spaces += " "
      }
      process.stdout.write("|" + Arr[i][j] + spaces + " ")
    }
    process.stdout.write("|")
      console.log('')
      console.log(divider)
  }
}








