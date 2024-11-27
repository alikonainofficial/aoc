const fs = require('fs');
const readline = require('readline');

const getCountOfWinningCases = (input) => {

    let time = parseInt(input[0].split(':')[1].split(' ').join(''));
    let record = parseInt(input[1].split(':')[1].split(' ').join(''));

    let total = 1;
    let count = 0;
    for(let i = 0, j = time; i < Math.ceil(time/2); i++, j--){
        if(j*i > parseInt(record)){
            count++;
        }
    }
    if(count > 0){
        count *= 2;
        if(time%2 == 0){
            let midValue = time/2;
            count = (midValue*midValue) > parseInt(record)? count + 1: count;
        }
        total *= count;
    }
    return total;
}

async function processLineByLine() {
  
  const fileStream = fs.createReadStream('input1_2.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.


  let raceData = [];

  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.
        raceData.push(line);
    }

   let total = getCountOfWinningCases(raceData);

  console.log("Total ", total);
}


processLineByLine();
