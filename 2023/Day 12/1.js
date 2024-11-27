const fs = require('fs');
const readline = require('readline');

const isValidRow = (springRow, records) => {
    // console.log(springRow);
    if(springRow.indexOf('?') > -1){
        return false;
    }
    let springIndex = -1;
    for(let i = 0; i < records.length; i++){
        springIndex = springRow.indexOf('#', springIndex + 1);
        // while(springIndex < springRow.length && springRow[springIndex] != '#'){
        //     springIndex++;
        // }
        // console.log(springIndex);
        for(let j = 0; j < records[i]; j++){
            if(springRow[springIndex] != '#'){
                return false;
            }
            springIndex++;
        }
        if(springIndex < springRow.length && springRow[springIndex] != '.'){
            return false;
        }
    }

    while(springIndex < springRow.length && springRow[springIndex] != '#'){
        springIndex++
    }
    if(springIndex < springRow.length) return false;


    // if(springIndex < springRow.length && springRow.indexOf('#', springIndex)){
    //     console.log("here", springRow);
    //     return false;
    // }
    return true;
}

const getTotalArrangements = (springRow, records, startIndex, memory) => {
    // if(memory[springRow]){
    //     console.log("memoized");
    //     return memory[springRow];
    // }
    let total = 0;
    for(let i = startIndex; i < springRow.length; i++){
        if(springRow[i] == '?'){
            let temp1 = springRow.split('');
            temp1.splice(i, 1, '.');
            temp1 = temp1.join('');
            let temp2 = springRow.split('');
            temp2.splice(i, 1, '#');
            temp2 = temp2.join('');            
            
            total += getTotalArrangements(temp1, records, i+1, memory) + getTotalArrangements(temp2, records, i+1, memory);
        }
    }
    // if(!memory[springRow]){
    //     memory[springRow] = isValidRow(springRow, records) ? total + 1: total;
    // } 
    if(isValidRow(springRow, records)){
        return total + 1;
    } else {
        return total;
    }
    
    // return memory[springRow];
}


async function processLineByLine() {

    const fileStream = fs.createReadStream('input1_2.txt');

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    let memory = [];
    let recordRows = [];
    let total = 0;

    for await(const line of rl) {
        let temp = line.split(' ');
        recordRows = temp[1].split(',').map((val) => parseInt(val));
        console.log(temp[0]);
        total += getTotalArrangements(temp[0], recordRows, 0, memory);
    }

    console.log("Total ", total);
}

processLineByLine();