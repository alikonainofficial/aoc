const fs = require('fs');
const readline = require('readline');

const getHashResult = (str) => {
    let total = 0;    
    for (let index = 0; index < str.length; index++) {
        let temp = str.charCodeAt(index);
        total += temp;
        total *= 17;
        total = total % 256;
    }
    return total;
}

const getFocusingPower = (box, boxNumber) => {
    let power = 0;
    for(let i = 0; i < box.length; i++){
        power += (i+1) * box[i].value * boxNumber;
    }
    return power;
}

const getTotalFocusingPower = (strList) => {

    let boxMap = [];
    let total = 0;

    for (let index = 0; index < strList.length; index++) {
        let label = '';
        let lens = '';
        let addLens = false;
        if(strList[index].indexOf('-') >= 0){
            label = strList[index].split('-')[0];
        }else {
            label = strList[index].split('=')[0];
            lens = parseInt(strList[index].split('=')[1]);
            addLens = true;
        }
        let boxNumber = getHashResult(label);

        if(!addLens) {
            if(boxMap[boxNumber] != undefined) {
                boxMap[boxNumber].find((lensObj, i) => {
                    if (lensObj.key === label) {
                        boxMap[boxNumber].splice(i, 1);
                        return true; 
                    }
                });
            }
        } else {
            if(boxMap[boxNumber] == undefined) {
                boxMap[boxNumber] = [];
                boxMap[boxNumber].push({
                    key: label,
                    value: lens
                });
            } else {
                let isValueUpdated = boxMap[boxNumber].find((lensObj, i) => {
                    if (lensObj.key === label) {
                        boxMap[boxNumber][i].value = lens;
                        return true; 
                    }
                });
                if(!isValueUpdated){
                    boxMap[boxNumber].push({
                        key: label,
                        value: lens
                    });
                }
            }
        }
    }

    for(let i = 0; i < boxMap.length; i++){
        if(boxMap[i] != undefined && boxMap[i].length > 0){
            total += getFocusingPower(boxMap[i], i+1);
        }
    }

    return total;

}

async function processLineByLine() {
    const fileStream = fs.createReadStream('input1_2.txt');

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    let stringList = [];

    for await (let line of rl) {
        stringList = line.split(',');
    }


    let total = 0;

    total = getTotalFocusingPower(stringList);
   

    console.log("Total ", total);
}

processLineByLine();