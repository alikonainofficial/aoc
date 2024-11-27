const fs = require('fs');
const readline = require('readline');

const getPossibleGamesCount = (input, highestColorValues) => {

    let gameSets = input.split(":")[1].split(";");

    for(let i = 0; i < gameSets.length; i++){
        let gameSet = gameSets[i].split(",");
        for(let j = 0; j < gameSet.length; j++){
            let colorValueSet = gameSet[j].split(" ");
            if(parseInt(colorValueSet[1]) > highestColorValues[colorValueSet[2]]){
                highestColorValues[colorValueSet[2]] = parseInt(colorValueSet[1]);
            }
        }
    }
    return highestColorValues['red'] * highestColorValues['blue'] * highestColorValues['green'];
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

  let highestColorValues = {red: 1, blue: 1, green: 1};
  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.
    
    let value = getPossibleGamesCount(line, highestColorValues); 
    totalSum += value;
    highestColorValues = {red: 1, blue: 1, green: 1};
  }
  console.log("Sum", totalSum);
}


processLineByLine();
