const fs = require('fs');
const readline = require('readline');

const setSourceToDest = (mapping, sourceToDest) => {

    let mappingRanges = mapping.split(':')[1].split(',');
    mappingRanges = mappingRanges.filter((num) => num !== '');

    for (let key = 0; key < sourceToDest.length; key++) {
        for(let i = 0; i < mappingRanges.length; i++){
            let sourceStart = parseInt(mappingRanges[i].split(' ')[1]);
            let rangeCount = parseInt(mappingRanges[i].split(' ')[2]);
            if(sourceToDest[key] >= sourceStart && parseInt(sourceToDest[key]) < (sourceStart + rangeCount)){
                let destValue = parseInt(mappingRanges[i].split(' ')[0]) + (sourceToDest[key] - sourceStart);
                sourceToDest[key] = destValue;
                break;
            }
        }
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

  let sourceToDest = [];
  let mappingRanges = '';
  let seedInput = true;

  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.
        if(seedInput){
            let seedValues = line.split(':')[1].split(' ');
            seedValues = seedValues.filter((num) => num !== '');
            for(let i = 0; i < seedValues.length; i++){
                sourceToDest[i] = parseInt(seedValues[i]);
            }
            seedInput = false;
        } else {
            if(line == '' && mappingRanges != ''){
                setSourceToDest(mappingRanges, sourceToDest);
                mappingRanges = '';
            }else {
                mappingRanges += line + ',';
            }
        }
    }

    if(mappingRanges != ''){
        setSourceToDest(mappingRanges, sourceToDest);
    }

    let smallest = Number.MAX_SAFE_INTEGER;
    for (let key = 0; key < sourceToDest.length; key++) {
        if (sourceToDest[key] < smallest) {
            smallest = sourceToDest[key];
        }
    }
  console.log("Smallest", smallest);
}


processLineByLine();
