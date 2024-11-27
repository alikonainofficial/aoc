const fs = require('fs');
const { title } = require('process');
const readline = require('readline');

const shiftElementsToNorth = (matrix, row, column) => {
    for(let i = row + 1; i < matrix.length; i++){
        if(matrix[i][column] == 'O'){
            for(let j = i; j - 1 >= row && matrix[j - 1][column] == '.'; j--){
                matrix[j - 1][column] = 'O';
                matrix[j][column] = '.';
            }
        } else if(matrix[i][column] == '#'){
            break;
        }
    }
}

const shiftElementsToWest = (matrix, row, column) => {
    for(let i = column + 1; i < matrix[row].length; i++){
        if(matrix[row][i] == 'O'){
            for(let j = i; j - 1 >= column && matrix[row][j - 1] == '.'; j--){
                matrix[row][j - 1] = 'O';
                matrix[row][j] = '.';
            }
        } else if(matrix[row][i] == '#'){
            break;
        }
    }
}

const shiftElementsToSouth = (matrix, row, column) => {
    for(let i = row - 1; i >= 0; i--){
        if(matrix[i][column] == 'O'){
            for(let j = i; j + 1 <= row && matrix[j + 1][column] == '.'; j++){
                matrix[j + 1][column] = 'O';
                matrix[j][column] = '.';
            }
        } else if(matrix[i][column] == '#'){
            break;
        }
    }
}

const shiftElementsToEast = (matrix, row, column) => {
    for(let i = column + 1; i < matrix[row].length; i++){
        if(matrix[row][i] == 'O'){
            for(let j = i; j - 1 >= column && matrix[row][j - 1] == '.'; j--){
                matrix[row][j - 1] = 'O';
                matrix[row][j] = '.';
            }
        } else if(matrix[row][i] == '#'){
            break;
        }
    }
}

const tiltToNorth = (matrix) => {
    for(let i = 0; i < matrix.length; i++){
        for(let j = 0; j < matrix[i].length; j++){
            if(matrix[i][j] == '.'){
                shiftElementsToNorth(matrix, i, j);
            }
        }
    }
}


const tiltToWest = (matrix) => {
    for(let i = 0; i < matrix.length; i++){
        for(let j = 0; j < matrix[i].length; j++){
            if(matrix[i][j] == '.'){
                shiftElementsToWest(matrix, i, j);
            }
        }
    }
}


const tiltToSouth = (matrix) => {
    for(let i = 0; i < matrix.length; i++){
        for(let j = 0; j < matrix[i].length; j++){
            if(matrix[i][j] == '.'){
                shiftElementsToSouth(matrix, i, j);
            }
        }
    }
}


const tiltToEast = (matrix) => {
    for(let i = 0; i < matrix.length; i++){
        for(let j = 0; j < matrix[i].length; j++){
            if(matrix[i][j] == '.'){
                shiftElementsToEast(matrix, i, j);
            }
        }
    }
}


const getTotalLoadOnNorth = (matrix) => {
    for(let i = 0; i < 1000000000; i++){
        tiltToNorth(matrix);
        tiltToWest(matrix);
        tiltToSouth(matrix);
        tiltToEast(matrix);
    }


    let total = 0;
    let loadWeight = matrix.length;

    for(let i = 0; i < matrix.length; i++){
        let currentRowBeamCount = 0;
        for(let j = 0; j < matrix[i].length; j++){
            if(matrix[i][j] == 'O'){    
                currentRowBeamCount++;
            }
        }
        total += currentRowBeamCount != 0? currentRowBeamCount * loadWeight: currentRowBeamCount;
        loadWeight--;
    }

    return total;

}

async function processLineByLine(){

    const fileStream = fs.createReadStream('input1_2.txt');
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    let matrix = [];
    for await (let line of rl){
        matrix.push(line.split(''));
    }
    // console.log(matrix);
    let total = getTotalLoadOnNorth(matrix);
    console.log("Total ", total);


}

processLineByLine();