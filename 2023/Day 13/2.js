const fs = require('fs');
const readline = require('readline');

const transpose = (a) => {
    return Object.keys(a[0]).map(function(c) {
        return a.map(function(r) { return r[c]; }).join('');
    });
}


const getRowBasedCount = (patternMap, discardLine='') => {
    let rowTotal = 0;
    let reflectionFound = '';

    for(let i = 0; i < patternMap.length - 1; i++){
        let firtRow = patternMap[i];
        reflectionFound = firtRow;
        let secondRow = patternMap[i + 1];
        if(firtRow != secondRow || firtRow == discardLine){
            reflectionFound = '';
        }
        if(reflectionFound.length > 0){
            if(i == 0){
                rowTotal = 1;
            } else if(i + 2 == patternMap.length){
                rowTotal = patternMap.length - 1; 
            }else {
                for(let j = i - 1, k = i + 2; j > -1 && k < patternMap.length; j--, k++){
                    firtRow = patternMap[j];
                    secondRow = patternMap[k];
                    if(firtRow != secondRow) {
                        reflectionFound = '';
                        break;
                    }
                }
                if(reflectionFound.length > 0) {
                    rowTotal = i + 1;
                }
            }
            if(rowTotal != 0){
                break;
            }
        }
    }
    return [reflectionFound, rowTotal];
}

const getReflectionCount = (patternMap) => {

    let total = 0;
    let [reflectionLine, reflectionCount] = getRowBasedCount(patternMap);
    if(reflectionCount == 0){
        patternMap = transpose(patternMap);
        [reflectionLine, reflectionCount] = getRowBasedCount(patternMap);
        patternMap = transpose(patternMap);
    }

    for(let i = 0; i < patternMap.length; i++){
        for(let j = 0;j < patternMap[i].length; j++){
            // Split the string into an array of characters
            let row = patternMap[i].split('');

            // Modify the specific character
            if (row[j] === '.') {
                row[j] = '#';
            } else {
                row[j] = '.';
            }

            // Join the array back into a string
            let modifiedRow = row.join('');

            // Create a copy of the patternMap with the modified row
            let temp1 = [...patternMap];
            temp1[i] = modifiedRow;

            total = getRowBasedCount(temp1, reflectionLine)[1];
            if(total != 0){
                return total * 100;
            } else {
                temp1 = transpose(temp1);
                total = getRowBasedCount(temp1, reflectionLine)[1];
                if(total != 0){
                    return total;
                }
            }
        }
    }

    return total; 
}

async function processLineByLine() {
    const fileStream = fs.createReadStream('input1_2.txt');
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    })

    let patternMap = [];
    let total = 0;

    for await (const line of rl) {
        if(line != ''){
            patternMap.push(line);
        } else {
            total += getReflectionCount(patternMap);
            patternMap = [];
        }
    }

    total += getReflectionCount(patternMap);
    console.log("Total ", total);
}

processLineByLine();