const fs = require('fs');
const readline = require('readline');

const getTotalInsidePoints = (map) => {

    let totalCount = 0;

    for (let i = 0; i < map.length; i++) {
        let isInside = false;
        for (let j = 0; j < map[i].length; j++) {   
            if(map[i][j].visited && (map[i][j].value == 'J' || map[i][j].value == 'L' || map[i][j].value == '|')){
                isInside = !isInside;
            } else if (!map[i][j].visited && isInside){
                totalCount++;
            }
        }
    }
    return totalCount;
}

const getTotalPointsInsideLoop = (map, row, col) => {

    let nextToS = '';
    let prevToS = '';
    let loopCompleted = false;
    let srow = row;
    let scol = col;
    let loopedMap = [];

    for(let i = 0; i < map.length; i++){
        loopedMap[i] = [];
        for(let j = 0; j < map[i].length; j++){
            loopedMap[i][j] = '-';
        }
    }

    while(!loopCompleted){    
        map[row][col].visited = true;

        loopedMap[row][col] = '*';

        if(map[row][col].value == 'S'){
            if(col + 1 < map[0].length && !map[row][col + 1].visited && map[row][col + 1].value == 'J'){
                col++;
            } else if(col + 1 < map[0].length && !map[row][col + 1].visited && map[row][col + 1].value == '-'){
                col++;
            } else if(col + 1 < map[0].length && !map[row][col + 1].visited && map[row][col + 1].value == '7'){
                col++;
            } else if(col - 1 >= 0 && !map[row][col - 1].visited && map[row][col - 1].value == 'F'){
                col--;
            } else if(col - 1 >= 0 && !map[row][col - 1].visited && map[row][col - 1].value == '-'){
                col--;
            } else if(col - 1 >= 0 && !map[row][col - 1].visited && map[row][col - 1].value == 'L'){
                col--;
            } else if(row - 1 >= 0 && !map[row - 1][col].visited && map[row - 1][col].value == '|'){
                row--;
            } else if(row - 1 >= 0 && !map[row - 1][col].visited && map[row - 1][col].value == '7'){
                row--;
            } else if(row - 1 >= 0 && !map[row - 1][col].visited && map[row - 1][col].value == 'F'){
                row--;
            } else if(row + 1 < map.length && !map[row + 1][col].visited && map[row + 1][col].value == '|'){
                row++;
            } else if(row + 1 < map.length && !map[row + 1][col].visited && map[row + 1][col].value == 'J'){
                row++;
            } else if(row + 1 < map.length && !map[row + 1][col].visited && map[row + 1][col].value == 'L'){
                row++;
            }
            nextToS = map[row][col].value; 
        } else {
            if(map[row][col].value == '7'){
                if(col - 1 >= 0 && !map[row][col - 1].visited){
                    col--;
                } else if (!map[row + 1][col].visited){
                    row++;
                } else {
                    loopCompleted = true;
                }
            } else if(map[row][col].value == 'L'){
                if(row - 1 >= 0 && !map[row - 1][col].visited){
                    row--;
                } else if(!map[row][col + 1].visited) {
                    col++;
                } else {
                    loopCompleted = true;
                }
            } else if(map[row][col].value == '|'){
                if(row - 1 >= 0 && !map[row - 1][col].visited){
                    row--;
                } else if(!map[row + 1][col].visited){
                    row++;
                } else {
                    loopCompleted = true;
                }
            }else if(map[row][col].value == '-'){
                if(col - 1 >= 0 && !map[row][col - 1].visited){
                    col--;
                } else if(!map[row][col + 1].visited) {
                    col++;
                } else{
                    loopCompleted = true;
                }
            } else if(map[row][col].value == 'J'){
                if(col - 1 >= 0 && !map[row][col - 1].visited){
                    col--;
                } else  if(!map[row - 1][col].visited){
                    row--;
                } else {
                    loopCompleted = true;
                }
            } else if(map[row][col].value == 'F'){
                if(col + 1 < map[0].length && !map[row][col + 1].visited){
                    col++;
                } else if(!map[row + 1][col].visited){
                    row++;
                } else {
                    loopCompleted = true;
                }
            } 
        }
        if(loopCompleted){
            prevToS = map[row][col].value;
        }
    }

    // if((prevToS == 'L' || prevToS == 'J' || prevToS == '|') && (nextToS == 'J' || nextToS == '-' || nextToS == '7')){
    //     map[srow][scol].value = 'F';
    // } else if ((prevToS == 'L' || prevToS == 'J' || prevToS == '|') && (nextToS == 'L' || nextToS == '-' || nextToS == 'F')){
    //     map[srow][scol].value = '7';
    // } else if((prevToS == '7' || prevToS == 'F' || prevToS == '|') && (nextToS == 'J' || nextToS == '-' || nextToS == '7')){
    //     map[srow][scol].value = 'L';
    // } else if((prevToS == '7' || prevToS == 'F' || prevToS == '|') && (nextToS == 'L' || nextToS == '-' || nextToS == 'F')){
    //     map[srow][scol].value = 'J';
    // } else if((prevToS == '7' || prevToS == 'F' || prevToS == '|') && (nextToS == 'L' || nextToS == 'J' || nextToS == '|')){

    // }

    map[srow][scol].value = 'L';

    let total = getTotalInsidePoints(map);

    for (let index = 0; index < map.length; index++) {
        let temp = '';
       for (let j = 0; j < map[index].length; j++) {
            temp += loopedMap[index][j];
       }
       console.log(temp);
    }

    return total;
}

async function processLineByLine() {
    
    const fileStream = fs.createReadStream('input1_3.txt');

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });
    // Note: we use the crlfDelay option to recognize all instances of CR LF
    // ('\r\n') in input.txt as a single line break.

    let map = [];
    let rowWithS = 0;
    let colWithS = 0;

    for await (const line of rl){
        if(line.includes('S')) {
            rowWithS = map.length;
            colWithS = line.indexOf('S');
        }
        map.push(line.split('').map((val) => ({"value": val, "visited": false})));
    }
    let point = getTotalPointsInsideLoop(map, rowWithS, colWithS);
    console.log("Total points ", point);

}

processLineByLine();