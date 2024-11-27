const fs = require('fs');
const readline = require('readline');

const getCaliberationValue = (input) => {

    let firstValue = null;
    let lastValue = null;

    for (let i = 0; i < input.length; i++) {
        if(input[i] >= '0' && input[i] <= '9'){
            if(firstValue == null) firstValue = input[i];
            else lastValue = input[i];
        }
    }

    if(lastValue == null) lastValue = firstValue;
    return parseInt(firstValue+lastValue);
    
}

async function processLineByLine() {
  
  var totalSum = 0;
  const fileStream = fs.createReadStream('input1.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.
    
    let value = getCaliberationValue(line);
    console.log(`Line from file: ${line}: ${value}`);
    totalSum += value;
  }
  console.log("Sum", totalSum);
}


processLineByLine();
