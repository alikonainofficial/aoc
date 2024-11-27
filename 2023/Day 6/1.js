const fs = require('fs');
const readline = require('readline');

const getCountOfWinningCases = (input) => {

    let timeArray = input[0].split(':')[1].split(' ');
    timeArray = timeArray.filter((num) => num !== '');
    let recordArray = input[1].split(':')[1].split(' ');
    recordArray = recordArray.filter((num) => num !== '');

    let total = 1;
    for(let i = 0; i < timeArray.length; i++){
        let count = 0;
        let time = parseInt(timeArray[i]);
        for(let j = 0, k = time; j < Math.ceil(time/2); j++, k--){
            if(j*k > parseInt(recordArray[i])){
                count++;
            }
        }
        if(count > 0){
            count *= 2;
            if(time%2 == 0){
                let midValue = time/2;
                count = (midValue*midValue) > parseInt(recordArray[i])? count + 1: count;
            }
            total *= count;
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
