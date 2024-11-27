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

const constructMatrix = (line, totalMachineParts, row) => {
    for(let i = 0; i < line.length; i++){
        totalMachineParts[row][i] = line[i];
    }
}

const getGearRatio = (symbolRowIndex, symbolColIndex, totalMachineParts) => {

    let tempVal = 0;
    let rowLength = totalMachineParts[symbolRowIndex].length;
    let colLength = totalMachineParts.length;
    let firstNumber = false;
    let secondNumber = false;
    
    if(symbolColIndex - 1 >= 0 && isDigit(totalMachineParts[symbolRowIndex][symbolColIndex - 1])){
        firstNumber = getEntireNumber(symbolRowIndex, symbolColIndex - 1, totalMachineParts);
    }
    if(symbolColIndex - 1 >= 0 && symbolRowIndex - 1 >= 0 && isDigit(totalMachineParts[symbolRowIndex - 1][symbolColIndex - 1])){
        let i = symbolColIndex - 1;
        while(i < rowLength && isDigit(totalMachineParts[symbolRowIndex - 1][i])) i++;
        tempVal = getEntireNumber(symbolRowIndex - 1, i - 1, totalMachineParts);
        if(firstNumber == false) firstNumber = tempVal;
        else secondNumber = tempVal;
    }
    if(symbolRowIndex - 1 >= 0 && isDigit(totalMachineParts[symbolRowIndex - 1][symbolColIndex])){
        if(firstNumber != false && secondNumber != false) return 0;
        let i = symbolColIndex;
        while(i < rowLength && isDigit(totalMachineParts[symbolRowIndex - 1][i])) i++;
        tempVal = getEntireNumber(symbolRowIndex - 1, i - 1, totalMachineParts);      
        if(firstNumber == false) firstNumber = tempVal;
        else secondNumber = tempVal;  
    }
    if(symbolRowIndex - 1 >= 0 && symbolColIndex + 1 < rowLength && isDigit(totalMachineParts[symbolRowIndex - 1][symbolColIndex + 1])){
        if(firstNumber != false && secondNumber != false) return 0;
        let i = symbolColIndex + 1;
        while(i < rowLength && isDigit(totalMachineParts[symbolRowIndex - 1][i])) i++;
        tempVal = getEntireNumber(symbolRowIndex - 1, i - 1, totalMachineParts);
        if(firstNumber == false) firstNumber = tempVal;
        else secondNumber = tempVal;  
    }
    if(symbolColIndex + 1 < rowLength && isDigit(totalMachineParts[symbolRowIndex][symbolColIndex + 1])){
        if(firstNumber != false && secondNumber != false) return 0;
        let i = symbolColIndex + 1;
        while(i < rowLength && isDigit(totalMachineParts[symbolRowIndex][i])) i++;
        tempVal = getEntireNumber(symbolRowIndex, i - 1, totalMachineParts);
        if(firstNumber == false) firstNumber = tempVal;
        else secondNumber = tempVal;  
    }
    if(symbolRowIndex + 1 < colLength && symbolColIndex + 1 < rowLength && isDigit(totalMachineParts[symbolRowIndex + 1][symbolColIndex + 1])){
        if(firstNumber != false && secondNumber != false) return 0;
        let i = symbolColIndex + 1;
        while(i < rowLength && isDigit(totalMachineParts[symbolRowIndex + 1][i])) i++;
        tempVal = getEntireNumber(symbolRowIndex + 1, i - 1, totalMachineParts);
        if(firstNumber == false) firstNumber = tempVal;
        else secondNumber = tempVal;  
    } 
    if(symbolRowIndex + 1 < colLength && symbolColIndex < rowLength && isDigit(totalMachineParts[symbolRowIndex + 1][symbolColIndex])){
        if(firstNumber != false && secondNumber != false) return 0;
        tempVal = getEntireNumber(symbolRowIndex + 1, symbolColIndex, totalMachineParts);
        if(firstNumber == false) firstNumber = tempVal;
        else secondNumber = tempVal;  
    } 
    if(symbolRowIndex + 1 < colLength && symbolColIndex - 1 >= 0 && isDigit(totalMachineParts[symbolRowIndex + 1][symbolColIndex - 1])){
        if(firstNumber != false && secondNumber != false) return 0;
        tempVal = getEntireNumber(symbolRowIndex + 1, symbolColIndex - 1, totalMachineParts);
        if(firstNumber == false) firstNumber = tempVal;
        else secondNumber = tempVal;  
    } 
    return firstNumber*secondNumber;
}

const getSumOfGearRatios = (totalMachineParts) => {

    let sum = 0;

    for(let i = 0; i < totalMachineParts.length; i++){
        for(let j = 0; j < totalMachineParts[i].length; j++){
            if(totalMachineParts[i][j] == '*'){
                sum += getGearRatio(i, j, totalMachineParts);
            }
        }
    }
    return sum;
}

async function processLineByLine() {
  
  let totalSum = 0;
  const fileStream = fs.createReadStream('input2_2.txt');

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
  totalSum = getSumOfGearRatios(totalMachineParts);
  console.log("Sum", totalSum);
}


processLineByLine();
