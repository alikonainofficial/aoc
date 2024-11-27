const fs = require('fs');
const readline = require('readline');


const traceRightwardBeam = (matrix, rayInfo, rayQueue, reflectionMatrix) => {
    for(let i = rayInfo[1]; i < matrix[rayInfo[0]].length; i++){
        if(matrix[rayInfo[0]][i] instanceof Set){
            if(matrix[rayInfo[0]][i].has('>')){
                break;
            } else {
                matrix[rayInfo[0]][i].add('>');
            } 
        } else if(matrix[rayInfo[0]][i] == '.' || matrix[rayInfo[0]][i] == '-'){
            reflectionMatrix[rayInfo[0]][i] = '#';
            if(matrix[rayInfo[0]][i] != '-'){
                matrix[rayInfo[0]][i] = '>';
            }
        } else if (matrix[rayInfo[0]][i] == '>') {
            break;
        } else if (matrix[rayInfo[0]][i] == '<' || matrix[rayInfo[0]][i] == '^' || matrix[rayInfo[0]][i] == '!'){
            let temp = new Set();
            temp.add('>');
            temp.add(matrix[rayInfo[0]][i]);
            matrix[rayInfo[0]][i] = temp;

        } else if(matrix[rayInfo[0]][i] == '|'){
            reflectionMatrix[rayInfo[0]][i] = '#';
            if(rayInfo[0] - 1 >= 0){
                rayQueue.push([rayInfo[0] - 1, i, 1]);
            }
            if(rayInfo[0] + 1 < matrix.length){
                rayQueue.push([rayInfo[0] + 1, i, -1]);
            }
            break;
        } else if(matrix[rayInfo[0]][i] == '/'){
            reflectionMatrix[rayInfo[0]][i] = '#';
            if(rayInfo[0] - 1 >= 0){
                rayQueue.push([rayInfo[0] - 1, i, 1]);
            }
            break;
        } else if(matrix[rayInfo[0]][i] == '\\'){
            reflectionMatrix[rayInfo[0]][i] = '#';
            if(rayInfo[0] + 1 < matrix.length){
                rayQueue.push([rayInfo[0] + 1, i, -1]);
            }
            break;
        }
    }
}

const traceLeftwardBeam = (matrix, rayInfo, rayQueue, reflectionMatrix) => {
    for(let i = rayInfo[1]; i >= 0; i--){
        if(matrix[rayInfo[0]][i] instanceof Set){
            if(matrix[rayInfo[0]][i].has('<')){
                break;
            } else {
                matrix[rayInfo[0]][i].add('<');
            } 
        } else if(matrix[rayInfo[0]][i] == '.' || matrix[rayInfo[0]][i] == '-'){
            reflectionMatrix[rayInfo[0]][i] = '#';
            if(matrix[rayInfo[0]][i] != '-'){
                matrix[rayInfo[0]][i] = '<';
            }
        } else if (matrix[rayInfo[0]][i] == '<') {
            break;
        } else if (matrix[rayInfo[0]][i] == '>' || matrix[rayInfo[0]][i] == '^' || matrix[rayInfo[0]][i] == '!'){
            let temp = new Set();
            temp.add('<');
            temp.add(matrix[rayInfo[0]][i]);
            matrix[rayInfo[0]][i] = temp;
        } else if(matrix[rayInfo[0]][i] == '|'){
            reflectionMatrix[rayInfo[0]][i] = '#';
            if(rayInfo[0] - 1 >= 0){
                rayQueue.push([rayInfo[0] - 1, i, 1]);
            }
            if(rayInfo[0] + 1 < matrix.length){
                rayQueue.push([rayInfo[0] + 1, i, -1]);
            }
            break;
        } else if(matrix[rayInfo[0]][i] == '\\'){
            reflectionMatrix[rayInfo[0]][i] = '#';
            if(rayInfo[0] - 1 >= 0){
                rayQueue.push([rayInfo[0] - 1, i, 1]);
            }
            break;
        } else if(matrix[rayInfo[0]][i] == '/'){
            reflectionMatrix[rayInfo[0]][i] = '#';
            if(rayInfo[0] + 1 < matrix.length){
                rayQueue.push([rayInfo[0] + 1, i, -1]);
            }
            break;
        }
    }
}

const traceUpwardBeam = (matrix, rayInfo, rayQueue, reflectionMatrix) => {
    for(let i = rayInfo[0]; i >= 0; i--){
        if(matrix[i][rayInfo[1]] instanceof Set){
            if(matrix[i][rayInfo[1]].has('^')){
                break;
            } else {
                matrix[i][rayInfo[1]].add('^');
            } 
        } else if(matrix[i][rayInfo[1]] == '.' || matrix[i][rayInfo[1]] == '|'){
            reflectionMatrix[i][rayInfo[1]] = '#';
            if(matrix[i][rayInfo[1]] != '|'){
                matrix[i][rayInfo[1]] = '^';
            }
        } else if (matrix[i][rayInfo[1]] == '^') {
            break;
        } else if (matrix[i][rayInfo[1]] == '>' || matrix[i][rayInfo[1]] == '<' || matrix[i][rayInfo[1]] == '!'){
            let temp = new Set();
            temp.add('^');
            temp.add(matrix[i][rayInfo[1]]);
            matrix[i][rayInfo[1]] = temp;
        } else if(matrix[i][rayInfo[1]] == '-'){
            reflectionMatrix[i][rayInfo[1]] = '#';
            if(rayInfo[1] - 1 >= 0){
                rayQueue.push([i, rayInfo[1] - 1, 2]);
            }
            if(rayInfo[1] + 1 < matrix[i].length){
                rayQueue.push([i, rayInfo[1] + 1, -2]);
            }
            break;
        } else if(matrix[i][rayInfo[1]] == '\\'){
            reflectionMatrix[i][rayInfo[1]] = '#';
            if(rayInfo[1] - 1 >= 0){
                rayQueue.push([i, rayInfo[1] - 1, 2]);
            }
            break;
        } else if(matrix[i][rayInfo[1]] == '/'){
            reflectionMatrix[i][rayInfo[1]] = '#';
            if(rayInfo[1] + 1 < matrix[i].length){
                rayQueue.push([i, rayInfo[1] + 1, -2]);
            }
            break;
        }
    }
}


const traceDownwardBeam = (matrix, rayInfo, rayQueue, reflectionMatrix) => {
    for(let i = rayInfo[0]; i < matrix.length; i++){
        if(matrix[i][rayInfo[1]] instanceof Set){
            if(matrix[i][rayInfo[1]].has('!')){
                break;
            } else {
                matrix[i][rayInfo[1]].add('!');
            } 
        } else if(matrix[i][rayInfo[1]] == '.' || matrix[i][rayInfo[1]] == '|'){
            reflectionMatrix[i][rayInfo[1]] = '#';
            if(matrix[i][rayInfo[1]] != '|'){
                matrix[i][rayInfo[1]] = '!';
            }
        } else if (matrix[i][rayInfo[1]] == '!') {
            break;
        } else if (matrix[i][rayInfo[1]] == '>' || matrix[i][rayInfo[1]] == '<' || matrix[i][rayInfo[1]] == '^'){
            let temp = new Set();
            temp.add('!');
            temp.add(matrix[i][rayInfo[1]]);
            matrix[i][rayInfo[1]] = temp;
        } else if(matrix[i][rayInfo[1]] == '-'){
            reflectionMatrix[i][rayInfo[1]] = '#';
            if(rayInfo[1] - 1 >= 0){
                rayQueue.push([i, rayInfo[1] - 1, 2]);
            }
            if(rayInfo[1] + 1 < matrix[i].length){
                rayQueue.push([i, rayInfo[1] + 1, -2]);
            }
            break;
        } else if(matrix[i][rayInfo[1]] == '/'){
            reflectionMatrix[i][rayInfo[1]] = '#';
            if(rayInfo[1] - 1 >= 0){
                rayQueue.push([i, rayInfo[1] - 1, 2]);
            }
            break;
        } else if(matrix[i][rayInfo[1]] == '\\'){
            reflectionMatrix[i][rayInfo[1]] = '#';
            if(rayInfo[1] + 1 < matrix[i].length){
                rayQueue.push([i, rayInfo[1] + 1, -2]);
            }
            break;
        }
    }
}

const traceBeamReflections = (matrix) => {

    let rayQueue = [];
    rayQueue.push([0 , 0 , -2]);
    let reflectionMatrix = [];
    for(let i = 0; i < matrix.length; i++){
        reflectionMatrix[i] = [];
        for (let j = 0; j < matrix[i].length; j++) {
            reflectionMatrix[i][j] = '.';
        }
    }
    reflectionMatrix[0][0] = '#';
    while(rayQueue.length > 0){
        let rayInfo = rayQueue.shift();
        if(rayInfo[2] == -2) { 
            traceRightwardBeam(matrix, rayInfo, rayQueue, reflectionMatrix);
        } else if(rayInfo[2] == 2) {
            traceLeftwardBeam(matrix, rayInfo, rayQueue, reflectionMatrix);
        } else if(rayInfo[2] == 1) {
            traceUpwardBeam(matrix, rayInfo, rayQueue, reflectionMatrix);
        } else if(rayInfo[2] == -1){
            traceDownwardBeam(matrix, rayInfo, rayQueue, reflectionMatrix);
        }
    }
    for(let i = 0; i < matrix.length; i++){

        console.log(reflectionMatrix[i].join(''));
    }
    return reflectionMatrix;

}

const getEnergizedTiles = (matrix) => {
    let total = 0;
    for(let i = 0; i < matrix.length; i++){
        total += matrix[i].join('').match(/#/g).length;
    }
    return total;
}

async function processLineByLine() {
    const fileStream = fs.createReadStream('input1_2.txt');
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    let rayMatrix = [];
    for await(let line of rl){
        if(line != ''){
            rayMatrix.push(line.split(''));
        }
    }
    let energizedTileMatrix = traceBeamReflections(rayMatrix);
    let total = getEnergizedTiles(energizedTileMatrix);
    console.log('Total ', total);
}


processLineByLine();