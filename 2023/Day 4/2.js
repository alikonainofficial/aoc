const fs = require('fs');
const readline = require('readline');

const fillMapWithMatchingNumCount = (input, cardMap, cardNumber) => {

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

    for (let i = 0; i < winningNumbers.length; i++) {
        if(userNumbersMap[winningNumbers[i]]){
            cardMap[cardNumber].matchingNum++;
        }
    }
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

  let cardMap = {};
  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.
    let cardNumber = line.split(":")[0].split(' ');
    cardNumber = parseInt(cardNumber.filter((num) => num !== '')[1]);
    cardMap[cardNumber] = {
        instanceCount: 1,
        matchingNum: 0
    };
    fillMapWithMatchingNumCount(line, cardMap, cardNumber);
  }

  for (const key in cardMap) {
    let cardsWon = cardMap[key].matchingNum + parseInt(key);
    for (let i = parseInt(key) + 1; i <= cardsWon && cardMap.hasOwnProperty(i); i++) {
        cardMap[i].instanceCount += cardMap[key].instanceCount;
    }
  }

  let instanceSum = 0;
  for (const key in cardMap) {
    instanceSum += cardMap[key].instanceCount;   
  }
  console.log("Sum", instanceSum);
}


processLineByLine();
