const fs = require('fs');
const readline = require('readline');

const getNewSourceToDest = (mapping, sourceToDest) => {

    let mappingRanges = mapping.split(':')[1].split(',');
    mappingRanges = mappingRanges.filter((num) => num !== '');
    let len = sourceToDest.length;

    for (let key = 0; key < sourceToDest.length; key++) {
        for(let i = 0; i < mappingRanges.length; i++){
            let sourceStart = parseInt(mappingRanges[i].split(' ')[1]);
            let rangeCount = parseInt(mappingRanges[i].split(' ')[2]);
            let destValue = parseInt(mappingRanges[i].split(' ')[0]) + (sourceToDest[key].startRange - sourceStart);
            let lastMappedValueInDest = sourceStart + rangeCount - 1;
            let lastMappedValueInSource = sourceToDest[key].startRange + sourceToDest[key].range - 1;

            if(sourceToDest[key].startRange >= sourceStart && lastMappedValueInSource <= lastMappedValueInDest){
                sourceToDest[key].startRange = destValue;
                break;
            }else if(sourceToDest[key].startRange >= sourceStart && sourceToDest[key].startRange <= lastMappedValueInDest){
                sourceToDest[key].range = sourceToDest[key].range - (lastMappedValueInSource - lastMappedValueInDest);
                sourceToDest[key].startRange = destValue;
                sourceToDest[len++] = {
                    startRange: lastMappedValueInDest + 1,
                    range: parseInt(lastMappedValueInSource - lastMappedValueInDest)
                };
                break;
            }
        }
    }

    return sourceToDest;
}

async function processLineByLine() {
  
  const fileStream = fs.createReadStream('input2_2.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  let sourceToDest = [];
  let mappingRanges = '';
  let seedInput = true;
  let mapIndex = 0;

  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.
        if(seedInput){
            let seedValues = line.split(':')[1].split(' ');
            seedValues = seedValues.filter((num) => num !== '');
            for(let i = 0; i < seedValues.length; i += 2){
                sourceToDest[mapIndex++] = {
                    startRange: parseInt(seedValues[i]),
                    range: parseInt(seedValues[i+1])
                }
            }
            seedInput = false;
        } else {
            if(line == '' && mappingRanges != ''){
                sourceToDest = getNewSourceToDest(mappingRanges, sourceToDest);
                mappingRanges = '';
            }else {
                mappingRanges += line + ',';
            }
        }
    }

    if(mappingRanges != ''){
        sourceToDest = getNewSourceToDest(mappingRanges, sourceToDest);
    }

    let smallest = Number.MAX_SAFE_INTEGER;
    for (let key = 0; key < sourceToDest.length; key++) {
        if (sourceToDest[key].startRange < smallest) {
            smallest = sourceToDest[key].startRange;
        }
    }
  console.log("Smallest", smallest);
}


processLineByLine();
