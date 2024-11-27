const fs = require('fs');
const readline = require('readline');

const getMin = (val1, val2) => {
    return val1 < val2? val1: val2;
}

const getMinimumHeatLoss = (matrix, visitedPath, row, col, dir, total, travelCount) => {

    if(row >= matrix.length || col >= matrix[0].length || row < 0 || col < 0){
        return Number.MAX_VALUE;
    } else {
        total += matrix[row][col];
    }

    if(travelCount > 0 && visitedPath[dir][travelCount - 1][row][col]){
        return visitedPath[dir][travelCount - 1][row][col];
    }
    if(row == matrix.length - 1 && col == matrix[0].length - 1){
        visitedPath[dir][travelCount - 1][row][col] = total;
        return total;
    } else {
        let temp = -1;
        if(dir == '>'){
            if(travelCount >= 3){
                if(row == 0){
                    temp = getMinimumHeatLoss(matrix, visitedPath, row + 1, col, '!', total + matrix[row + 1][col], 1); 
                } else if(row + 1 < matrix.length){
                    if(col == matrix[0].length - 1){
                        temp = getMinimumHeatLoss(matrix, visitedPath, row + 1, col, '!', total + matrix[row + 1][col], 1);
                    } else {
                        temp = getMin(getMinimumHeatLoss(matrix, visitedPath, row + 1, col, '!', total + matrix[row + 1][col], 1), getMinimumHeatLoss(matrix, visitedPath, row - 1, col, '^', total + matrix[row - 1][col], 1));
                    } 
                } else if(row == matrix.length - 1){
                    temp = getMinimumHeatLoss(matrix, visitedPath, row - 1, col, '^', total + matrix[row - 1][col], 1);
                }
            } else if(row == 0 && col + 1 < matrix[0].length){
                temp = getMin(getMinimumHeatLoss(matrix, visitedPath, row, col + 1, '>', total + matrix[row][col + 1], travelCount + 1), getMinimumHeatLoss(matrix, visitedPath, row + 1, col, '!', total + matrix[row + 1][col], 1)); 
            } else if(row + 1 < matrix.length && col + 1 >= matrix[0].length){
                temp = getMinimumHeatLoss(matrix, visitedPath, row + 1, col, '!', total + matrix[row + 1][col], 1);
            } else if(row + 1 < matrix.length && col + 1 < matrix[0].length){
                temp = getMin(getMinimumHeatLoss(matrix, visitedPath, row, col + 1, '>', total + matrix[row][col + 1], travelCount + 1), getMin(getMinimumHeatLoss(matrix, visitedPath, row - 1, col, '^', total + matrix[row - 1][col], 1), getMinimumHeatLoss(matrix, visitedPath, row + 1, col, '!', total + matrix[row + 1][col], 1)))
            } else if(row == matrix.length - 1){
                temp = getMin(getMinimumHeatLoss(matrix, visitedPath, row, col + 1, '>', total + matrix[row][col + 1], travelCount + 1), getMinimumHeatLoss(matrix, visitedPath, row - 1, col, '^', total + matrix[row - 1][col], 1));
            }
        } else if(dir == '^'){
            if(travelCount >= 3){
                temp = getMinimumHeatLoss(matrix, visitedPath, row, col + 1, '>', total + matrix[row][col + 1], 1);
            } else {
                if(row == 0 && col + 1 < matrix[0].length && col - 1 >= 0){
                    temp = getMin(getMinimumHeatLoss(matrix, visitedPath, row, col + 1, '>', total + matrix[row][col + 1], 1), getMinimumHeatLoss(matrix, visitedPath, row, col - 1, '<', total + matrix[row][col - 1], 1)); 
                } else if(row == 0 && col + 1 < matrix[0].length) {
                    temp = getMinimumHeatLoss(matrix, visitedPath, row, col + 1, '>', total + matrix[row][col + 1], 1);
                } else if(row == 0 && col - 1 >= 0){
                    temp = getMinimumHeatLoss(matrix, visitedPath, row, col - 1, '<', total + matrix[row][col - 1], 1);
                } else if(row + 1 < matrix.length && col + 1 < matrix[0].length && col - 1 >= 0){
                    temp = getMin(getMinimumHeatLoss(matrix, visitedPath, row, col + 1, '>', total + matrix[row][col + 1], 1), getMin(getMinimumHeatLoss(matrix, visitedPath, row - 1, col, '^', total + matrix[row - 1][col], travelCount + 1)), getMinimumHeatLoss(matrix, visitedPath, row, col - 1, '<', total + matrix[row][col - 1], 1));
                } else if(row + 1 < matrix.length && col + 1 < matrix[0].length) {
                    temp = getMin(getMinimumHeatLoss(matrix, visitedPath, row, col + 1, '>', total + matrix[row][col + 1], 1), getMinimumHeatLoss(matrix, visitedPath, row - 1, col, '^', total + matrix[row - 1][col], travelCount + 1));
                } else if (row + 1 < matrix.length && col - 1 >= 0) {
                    temp = getMin(getMinimumHeatLoss(matrix, visitedPath, row, col - 1, '<', total + matrix[row][col - 1], 1), getMinimumHeatLoss(matrix, visitedPath, row - 1, col, '^', total + matrix[row - 1][col], travelCount + 1));
                }
            }
        } else if(dir == '!'){
            if(travelCount >= 3){
                if(col == matrix[0].length - 1) {
                    return Number.MAX_VALUE;
                } else {
                    temp = getMinimumHeatLoss(matrix, visitedPath, row, col + 1, '>', total + matrix[row][col + 1], 1);
                }
            } else {
                if(row + 1 < matrix.length && col + 1 < matrix[0].length){
                    temp = getMin(getMinimumHeatLoss(matrix, visitedPath, row, col + 1, '>', total + matrix[row][col + 1], 1), getMinimumHeatLoss(matrix, visitedPath, row + 1, col, '!', total + matrix[row + 1][col], travelCount + 1));
                } else if(row == matrix.length - 1){
                    temp = getMinimumHeatLoss(matrix, visitedPath, row, col + 1, '>', total + matrix[row][col + 1], 1);
                } else if(row + 1 < matrix.length && col + 1 >= matrix[0].length){
                    temp = getMinimumHeatLoss(matrix, visitedPath, row + 1, col, '!', total + matrix[row + 1][col], travelCount + 1)
                }
            }
        }
        if(travelCount > 0)
            visitedPath[dir][travelCount - 1][row][col] = temp;
        return temp;
    }
}

const displayMatrix = (matrix) => {
    for(let i = 0; i < matrix.length; i++){
        let temp = '';
        for(let j = 0; j < matrix[i].length; j++){
            temp += matrix[i][j];
        }
        console.log(temp);
    }
}

async function processLineByLine() {
    const fileStream = fs.createReadStream('input1_1.txt');
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    });

    let pathMatrix = [];
    let dirArray = ['>', '^', '!', '<'];
    let visitedPath = [];
    visitedPath['>'] = [1, 2, 3];
    visitedPath['^'] = [1, 2, 3];
    visitedPath['!'] = [1, 2, 3];
    visitedPath['<'] = [1, 2, 3];

    for await (let line of rl) {
        if(line != ''){
            pathMatrix.push(line.split('').map(val => parseInt(val)));
        }
    }

    for(let i = 0; i < 4; i++){
        for(let j = 0; j < 3; j++){
            visitedPath[dirArray[i]][j] = [];
            for(let k = 0; k < pathMatrix.length; k++){
                visitedPath[dirArray[i]][j][k] = []
                for(let l = 0; l < pathMatrix[k].length; l++){
                    visitedPath[dirArray[i]][j][k][l] = false; 
                }
            }
        }
    }
    let total = getMinimumHeatLoss(pathMatrix, visitedPath, 0, 0, '>', 0, 0);
    // displayMatrix(pathMatrix);
    console.log("Total ", total);

}

processLineByLine();