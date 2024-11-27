const fs = require('fs');
const readline = require('readline');

const isDigit = (val) => {
    return val >= '0' && val <= '9';
}

const getEntireNumber = (row, col, totalMachineParts) => {
    let number = [];
    while(col >= 0 && isDigit(totalMachineParts[row][col])) {
        number.splice(0,0,totalMachineParts[row][col]);
        totalMachineParts[row][col] = '.';
        col--;
    } 
    return parseInt(number.join(""));
}

function containsSpecialChars(chr) {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?~]/;
    return specialChars.test(chr);
  }

const constructMatrix = (line, totalMachineParts, row) => {
    for(let i = 0; i < line.length; i++){
        totalMachineParts[row][i] = line[i];
    }
}

const getNearbyNumbersSum = (symbolRowIndex, symbolColIndex, totalMachineParts) => {

    let sum = 0;
    let rowLength = totalMachineParts[symbolRowIndex].length;
    let colLength = totalMachineParts.length;
    
    if(symbolColIndex - 1 >= 0 && isDigit(totalMachineParts[symbolRowIndex][symbolColIndex - 1])){
        sum += getEntireNumber(symbolRowIndex, symbolColIndex - 1, totalMachineParts);
    }
    if(symbolColIndex - 1 >= 0 && symbolRowIndex - 1 >= 0 && isDigit(totalMachineParts[symbolRowIndex - 1][symbolColIndex - 1])){
        let i = symbolColIndex - 1;
        while(i < rowLength && isDigit(totalMachineParts[symbolRowIndex - 1][i])) i++;
        sum += getEntireNumber(symbolRowIndex - 1, i - 1, totalMachineParts);
    }
    if(symbolRowIndex - 1 >= 0 && isDigit(totalMachineParts[symbolRowIndex - 1][symbolColIndex])){
        let i = symbolColIndex;
        while(i < rowLength && isDigit(totalMachineParts[symbolRowIndex - 1][i])) i++;
        sum += getEntireNumber(symbolRowIndex - 1, i - 1, totalMachineParts);
    }
    if(symbolRowIndex - 1 >= 0 && symbolColIndex + 1 < rowLength && isDigit(totalMachineParts[symbolRowIndex - 1][symbolColIndex + 1])){
        let i = symbolColIndex + 1;
        while(i < rowLength && isDigit(totalMachineParts[symbolRowIndex - 1][i])) i++;
        sum += getEntireNumber(symbolRowIndex - 1, i - 1, totalMachineParts);
    }
    if(symbolColIndex + 1 < rowLength && isDigit(totalMachineParts[symbolRowIndex][symbolColIndex + 1])){
        let i = symbolColIndex + 1;
        while(i < rowLength && isDigit(totalMachineParts[symbolRowIndex][i])) i++;
        sum += getEntireNumber(symbolRowIndex, i - 1, totalMachineParts);
    }
    if(symbolRowIndex + 1 < colLength && symbolColIndex + 1 < rowLength && isDigit(totalMachineParts[symbolRowIndex + 1][symbolColIndex + 1])){
        let i = symbolColIndex + 1;
        while(i < rowLength && isDigit(totalMachineParts[symbolRowIndex + 1][i])) i++;
        sum += getEntireNumber(symbolRowIndex + 1, i - 1, totalMachineParts);
    } 
    if(symbolRowIndex + 1 < colLength && symbolColIndex < rowLength && isDigit(totalMachineParts[symbolRowIndex + 1][symbolColIndex])){
        sum += getEntireNumber(symbolRowIndex + 1, symbolColIndex, totalMachineParts);
    } 
    if(symbolRowIndex + 1 < colLength && symbolColIndex - 1 >= 0 && isDigit(totalMachineParts[symbolRowIndex + 1][symbolColIndex - 1])){
        sum += getEntireNumber(symbolRowIndex + 1, symbolColIndex - 1, totalMachineParts);
    } 
    return sum;
}

const getTotalPartsSum = (totalMachineParts) => {

    let sum = 0;

    for(let i = 0; i < totalMachineParts.length; i++){
        for(let j = 0; j < totalMachineParts[i].length; j++){
            if(containsSpecialChars(totalMachineParts[i][j])){
                sum += getNearbyNumbersSum(i, j, totalMachineParts);
            }
        }
    }
    return sum;
}

async function processLineByLine() {
  
  let totalSum = 0;
  const fileStream = fs.createReadStream('input1_2.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  let totalMachineParts = [];
  let row = 0; 
  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.
    totalMachineParts[row] = [];
    constructMatrix(line, totalMachineParts, row);
    row++;
  }
  totalSum = getTotalPartsSum(totalMachineParts);
  console.log("Sum", totalSum);
}


processLineByLine();
