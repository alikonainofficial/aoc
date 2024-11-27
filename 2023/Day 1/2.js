const fs = require('fs');
const readline = require('readline');

const getCaliberationValue = (input) => {

    let firstValue = null;
    let lastValue = null;
    let charDigitsMap = [];
    charDigitsMap["zero"] = '0';
    charDigitsMap["one"] = '1';
    charDigitsMap["two"] = '2';
    charDigitsMap["three"] = '3';
    charDigitsMap["four"] = '4';
    charDigitsMap["five"] = '5';
    charDigitsMap["six"] = '6';
    charDigitsMap["seven"] = '7';
    charDigitsMap["eight"] = '8';
    charDigitsMap["nine"] = '9';
    
    let arrayInput = input.split("");

    for(let i = 0; i < arrayInput.length; i++){
        for(let j = 3; j < 6; j++){
            let word = input.substring(i,i+j);
            if(charDigitsMap[word] != undefined){
                arrayInput.splice(i,word.length,charDigitsMap[word]);
                input = arrayInput.join("");
            }
        }
    }

    input = arrayInput.join("");
    console.log("input",input);
    
    for (let i = 0; i < input.length; i++) {
        if(input[i] >= '0' && input[i] <= '9'){
            if(firstValue == null) firstValue = input[i];
            else lastValue = input[i];
        }
    }

    if(lastValue == null) lastValue = firstValue;
    return parseInt(firstValue+lastValue);
    
}

function getSumOfCalibrationValues(data) {
    const lines = extractNumbers(data);
    let total = 0;
    lines.map(line => {
      const digits = line.replace(/\D/g, '');
      const firstDigit = digits[0];
      const lastDigit = digits[digits.length - 1];
      const sum = Number(firstDigit + lastDigit);
      total += sum;
    });
  
    return total;
  }
  
  function extractNumbers(data) {
  
    /*
      Note: we want to extract the numbers without losing important information such as the first and last letters which could prevent extraction of other numbers.
      for example: 'eightwo' where we want to extract 82, we want to avoid ending up with 8wo or eigh2
    */
  
    const copy = {
      'one': 'o1e',
      'two': 't2o',
      'three': 't3e',
      'four': 'f4r',
      'five': 'f5e',
      'six': 's6x',
      'seven': 's7n',
      'eight': 'e8t',
      'nine': 'n9e'
    };
  
    Object.keys(copy).forEach(key => {
      data = data.replaceAll(key, copy[key]);
    });
  
    return data.split('\n');
  }
  
//   console.log(`the total is: ${getSumOfCalibrationValues(data)}`);

async function processLineByLine() {
  
  var totalSum = 0;
  const fileStream = fs.createReadStream('input2.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.
    
    let value = getSumOfCalibrationValues(line);
    console.log(`Line from file: ${line}: ${value}`);
    totalSum += value;
  }
  console.log("Sum", totalSum);
}


processLineByLine();
