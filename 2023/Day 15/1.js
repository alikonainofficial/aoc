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

    for (let index = 0; index < stringList.length; index++) {
        total += getHashResult(stringList[index]);
    }

    console.log("Total ", total);
}

processLineByLine();