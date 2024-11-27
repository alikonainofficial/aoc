const fs = require('fs');
const readline = require('readline');

const gcd = (a, b) => {
    while (b != 0){
        let temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

const lcm = (a, b) => {
    return Math.abs(a * b) / gcd(a, b);
}

const isEndingWithZ = (point) => {
    return point[point.length - 1] == 'Z';
}

const getTotalSteps = (instructions, map, key) => {

    let destinationFound = false;
    let stepCount = 0;

    while(!destinationFound){
        for (let i = 0; i < instructions.length; i++) {
            stepCount++;
            if(instructions[i] == 'L'){
                key = map[key].left;
            } else {
                key = map[key].right;
            }
            if(isEndingWithZ(key)){
                destinationFound = true;
                break;
            }
        }
    }

    return stepCount;
}

async function processLineByLine() {
  
  const fileStream = fs.createReadStream('input2_2.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.


  let map = [];
  let instructions = '';
  let instuctionsFound = false;
  let currentPointsEndingWithA = [];

  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.

        if(!instuctionsFound){
            instructions = line;
            instuctionsFound = true;
        } else if(line != '') {
            let currentPoint = line.split('=')[0].trim();
            if(currentPoint[currentPoint.length - 1] == 'A'){
                currentPointsEndingWithA.push(currentPoint);
            }
            let leftPoint = (line.split('=')[1].split(',')[0]).replace(/[^A-Z0-9]/g, '');
            let rightPoint = (line.split(',')[1]).replace(/[^A-Z0-9]/g, '');
            map[currentPoint] = {
                left: leftPoint,
                right: rightPoint
            };
        }
    }
  
    let stepCountArr = [];
    for (let i = 0; i < currentPointsEndingWithA.length; i++) {
        stepCountArr[i] = getTotalSteps(instructions, map, currentPointsEndingWithA[i]);
    }
    let currentLcm = stepCountArr[0];
    for (let i = 1; i < stepCountArr.length; i++) {
        currentLcm = lcm(currentLcm, stepCountArr[i]);
    }

    console.log('Total Steps ', currentLcm);
}


processLineByLine();
