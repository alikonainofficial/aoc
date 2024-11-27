const fs = require('fs');
const readline = require('readline');

const getTotalSteps = (instructions, map) => {

    let destinationFound = false;
    let stepCount = 0;
    let key = 'AAA';

    while(!destinationFound){
        for (let i = 0; i < instructions.length; i++) {
            stepCount++;
            if(instructions[i] == 'L'){
                key = map[key].left;
            } else {
                key = map[key].right;
            }
            if(key == 'ZZZ'){
                destinationFound = true;
                break;
            }
        }
    }

    return stepCount;
}

async function processLineByLine() {
  
  const fileStream = fs.createReadStream('input1_3.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.


  let map = [];
  let instructions = '';
  let instuctionsFound = false;

  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.

        if(!instuctionsFound){
            instructions = line;
            instuctionsFound = true;
        } else if(line != '') {
            let currentPoint = line.split('=')[0].trim();
            let leftPoint = (line.split('=')[1].split(',')[0]).replace(/[^A-Z]/g, '');
            let rightPoint = (line.split(',')[1]).replace(/[^A-Z]/g, '');
            map[currentPoint] = {
                left: leftPoint,
                right: rightPoint
            };
        }
    }
  
    let totalSteps = getTotalSteps(instructions, map);

    console.log('Total Steps ', totalSteps);
}


processLineByLine();
