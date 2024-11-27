const fs = require('fs');
const readline = require('readline');

const getTotalPointsForCard = (input) => {

    let numberList = input.split(":")[1];
    let winningNumbers = numberList.split("|")[0];
    let userNumbers = numberList.split("|")[1];

    winningNumbers = winningNumbers.trim().split(' ');
    winningNumbers = winningNumbers.filter((num) => num !== '');
    userNumbers = userNumbers.trim().split(' ');
    userNumbers = userNumbers.filter((num) => num !== '');

    let userNumbersMap = [];
    for (let i = 0; i < userNumbers.length; i++) {
        userNumbersMap[userNumbers[i]] = true;
    }

    let totalCardPoints = 0;
    for (let i = 0; i < winningNumbers.length; i++) {
        if(userNumbersMap[winningNumbers[i]]){
            totalCardPoints = totalCardPoints == 0? 1: totalCardPoints * 2;
        }
    }

    return totalCardPoints;
    
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

  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.
    totalSum += getTotalPointsForCard(line);
  }
  console.log("Sum", totalSum);
}


processLineByLine();
