const fs = require('fs');
const readline = require('readline');


const transpose = (a) => {
    return Object.keys(a[0]).map(function(c) {
        return a.map(function(r) { return r[c]; }).join('');
    });
}

const getRowBasedCount = (patternMap) => {
    let rowTotal = 0;

    for(let i = 0; i < patternMap.length - 1; i++){
        let reflectionFound = true;
        let firtRow = patternMap[i];
        let secondRow = patternMap[i + 1];
        if(firtRow != secondRow){
            reflectionFound = false;
        }
        if(reflectionFound){
            if(i == 0){
                rowTotal = 1;
            } else if(i + 2 == patternMap.length){
                rowTotal = patternMap.length - 1; 
            }else {
                for(let j = i - 1, k = i + 2; j > -1 && k < patternMap.length; j--, k++){
                    firtRow = patternMap[j];
                    secondRow = patternMap[k];
                    if(firtRow != secondRow) {
                        reflectionFound = false;
                        break;
                    }
                }
                if(reflectionFound) {
                    rowTotal = i + 1;
                }
            }
            if(rowTotal != 0){
                break;
            }
        }
    }
    return rowTotal;
}

const getReflectionCount = (patternMap) => {

    let total = getRowBasedCount(patternMap);
    if(total != 0){ 
        return total * 100;
    }
    patternMap = transpose(patternMap);   
    total = getRowBasedCount(patternMap);
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
            console.log(total);
            patternMap = [];
        }
    }

    total += getReflectionCount(patternMap);
    console.log("Total ", total);
}

processLineByLine();