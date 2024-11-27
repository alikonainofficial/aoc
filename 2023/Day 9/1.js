const fs = require('fs');
const readline = require('readline');

const hasAllSameValues = (map) => {
    for (let i = 0; i < map.length - 1; i++) {
        if(map[i] != map[i+1]){
            return false;
        }
    }
    return true;
}

const getNextValue = (map) => {
    if(hasAllSameValues(map)){
        return map[0];
    } else {
        let newHistory = [];
        for (let i = 0; i < map.length - 1; i++) {
            newHistory.push(map[i + 1] - map[i]);
        }
        let value = map[map.length - 1] + getNextValue(newHistory);
        return value;
    }
} 

async function processLineByLine() {
  
  const fileStream = fs.createReadStream('input1_2.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.
  let historyMap = [];
  let total = 0;

  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.

        historyMap = line.split(' ').map((num) => parseInt(num));
        total += getNextValue(historyMap);

    }
  
    console.log('Total ', total);
}


processLineByLine();
