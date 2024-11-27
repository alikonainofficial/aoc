const fs = require('fs');
const readline = require('readline');

const getPossibleGamesCount = (input, highestColorValues) => {

    let gameSets = input.split(":")[1].split(";");

    for(let i = 0; i < gameSets.length; i++){
        let gameSet = gameSets[i].split(",");
        for(let j = 0; j < gameSet.length; j++){
            let colorValueSet = gameSet[j].split(" ");
            if(parseInt(colorValueSet[1]) > highestColorValues[colorValueSet[2]]){
                return false;
            }
        }
    }
    return true;
}

async function processLineByLine() {
  
  let totalSum = 0;
  const fileStream = fs.createReadStream('input1.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  let gameID = 1;
  let highestColorValues = {red: 12, blue: 14, green: 13};
  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.
    
    if(getPossibleGamesCount(line, highestColorValues)) totalSum += gameID;
    // console.log(`Line from file: ${line}: ${value}`);
    gameID++;
  }
  console.log("Sum", totalSum);
}


processLineByLine();
