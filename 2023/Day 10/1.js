const fs = require('fs');
const readline = require('readline');

const getFartherPipeDistance = (map, row, col) => {

    let loopCompleted = false;
    let prevRow = row;
    let prevCol = col;
    map[row][col].weight = 0;

    while(!loopCompleted){
        
        map[row][col].visited = true;

        if(map[row][col].value == 'S'){
            if(col + 1 < map.length && !map[row][col + 1].visited && map[row][col + 1].value == 'J'){
                map[row][col + 1].weight += map[row][col].weight;
                col++;
            } else if(col + 1 < map.length && !map[row][col + 1].visited && map[row][col + 1].value == '-'){
                map[row][col + 1].weight += map[row][col].weight;
                col++;
            } else if(col + 1 < map.length && !map[row][col + 1].visited && map[row][col + 1].value == '7'){
                map[row][col + 1].weight += map[row][col].weight;
                col++;
            } else if(col - 1 >= 0 && !map[row][col - 1].visited && map[row][col - 1].value == 'F'){
                map[row][col - 1].weight += map[row][col].weight;
                col--;
            } else if(col - 1 >= 0 && !map[row][col - 1].visited && map[row][col - 1].value == '-'){
                map[row][col - 1].weight += map[row][col].weight;
                col--;
            } else if(col - 1 >= 0 && !map[row][col - 1].visited && map[row][col - 1].value == 'L'){
                map[row][col - 1].weight += map[row][col].weight;
                col--;
            } else if(row - 1 >= 0 && !map[row - 1][col].visited && map[row - 1][col].value == '|'){
                map[row - 1][col].weight += map[row][col].weight;
                row--;
            } else if(row - 1 >= 0 && !map[row - 1][col].visited && map[row - 1][col].value == '7'){
                map[row - 1][col].weight += map[row][co].weight;
                row--;
            } else if(row - 1 >= 0 && !map[row - 1][col].visited && map[row - 1][col].value == 'F'){
                map[row - 1][col].weight += map[row][col].weight;
                row--;
            } else if(row + 1 < map.length && !map[row + 1][col].visited && map[row + 1][col].value == '|'){
                map[row + 1][col].weight += map[row][col].weight;
                row++;
            } else if(row + 1 < map.length && !map[row + 1][col].visited && map[row + 1][col].value == 'J'){
                map[row + 1][col].weight += map[row][col].weight;
                row++;
            } else if(row + 1 < map.length && !map[row + 1][col].visited && map[row + 1][col].value == 'L'){
                map[row + 1][col].weight += map[row][col].weight;
                row++;
            } 
        } else {
            prevRow = row;
            prevCol = col;
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
                if(col + 1 < map.length && !map[row][col + 1].visited){
                    col++;
                } else if(!map[row + 1][col].visited){
                    row++;
                } else {
                    loopCompleted = true;
                }
            }  
            if(!loopCompleted)
                map[row][col].weight += map[prevRow][prevCol].weight;
        }
    }
    return (map[prevRow][prevCol].weight + 1) / 2;
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
        map.push(line.split('').map((val) => ({"value": val, "visited": false, "weight": 1})));
    }
    let point = getFartherPipeDistance(map, rowWithS, colWithS);
    console.log("Farthest point ", point);

}

processLineByLine();