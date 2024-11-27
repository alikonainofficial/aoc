const fs = require('fs');
const readline = require('readline');


const printMatrix = (matrix) => {
    for (let index = 0; index < matrix.length; index++) {
        console.log(matrix[index]);
    }
} 

const setEmptyColumnsMap = (matrix, emptyColsMap) => {
    for (let index = 0; index < matrix[0].length; index++) {
        let isGalaxyFound = false;
        for (let j = 0; j < matrix.length; j++) {
            if(matrix[j][index] != '.'){
                isGalaxyFound = true;
            }
        }
        if(!isGalaxyFound){
            emptyColsMap[index] = true;
        }
    }
}

const getGalaxyIndices = (matrix, galaxyNumber) => {
    for (let index = 0; index < matrix.length; index++) {
        if(matrix[index].indexOf(galaxyNumber) >= 0){
            return [index, matrix[index].indexOf(galaxyNumber)];
        }
    }
    return null;
}

const getTotalExpandedDistance = (startPoints, endPoints, emptyRowsMap, emptyColsMap) => {
    let countEmptyRows = 0;
    let countEmptyCols = 0;
    let indexCol = startPoints[1] <= endPoints[1]? startPoints[1] + 1: endPoints[1] + 1;
    let indexColLastPoint = startPoints[1] <= endPoints[1]? endPoints[1]: startPoints[1];
    for (let index = startPoints[0] + 1; index < endPoints[0]; index++) {
        if(emptyRowsMap[index.toString()]){
            countEmptyRows++;
        }
    }
    for (; indexCol < indexColLastPoint; indexCol++) {
        if(emptyColsMap[indexCol.toString()]){
            countEmptyCols++;
        }
    }
    return [(countEmptyRows + countEmptyCols) * 1000000, countEmptyCols, countEmptyRows];

}

const getTotalDistance = (matrix, galaxyCount, emptyRowsMap, emptyColsMap) => {
    let total = 0;
    let galaxyIndicesMap = [];

    for (let galaxy = 1; galaxy < galaxyCount; galaxy++) {
        if(!galaxyIndicesMap[galaxy]){
            galaxyIndicesMap[galaxy] = getGalaxyIndices(matrix, galaxy);
        }
        let startPoints = galaxyIndicesMap[galaxy];
        for (let nextGalaxy = galaxy + 1; nextGalaxy <= galaxyCount; nextGalaxy++) {
            if(!galaxyIndicesMap[nextGalaxy]){
                galaxyIndicesMap[nextGalaxy] = getGalaxyIndices(matrix, nextGalaxy);
            }
            let endPoints = galaxyIndicesMap[nextGalaxy];
            let expandedDistance = getTotalExpandedDistance(startPoints, endPoints, emptyRowsMap, emptyColsMap);
            let dis = Math.abs(startPoints[0] - endPoints[0]) + Math.abs(startPoints[1] - endPoints[1]) + expandedDistance[0] - expandedDistance[1] - expandedDistance[2];
            total += dis;
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

    let galaxyMatrix = [];
    let galaxyNumber = 1;
    let totalPairs = 0;
    let emptyRowsMap = {};
    let emptyColsMap = {};

    for await (const line of rl) {
        let position = line.indexOf('#');
        let updatedLine = line.split('');
        if(position >= 0){
            while (position !== -1) {
                updatedLine.splice(position, 1, galaxyNumber++);
                position = line.indexOf("#", position + 1);
              }
            galaxyMatrix.push(updatedLine);
        } else {
            emptyRowsMap[galaxyMatrix.length] = true;
            galaxyMatrix.push(line.split(''));

        }
    }
    galaxyNumber--;

    for (let index = galaxyNumber - 1; index > 0; index--) {
        totalPairs += index;
    }

    setEmptyColumnsMap(galaxyMatrix, emptyColsMap);

    // console.log("Empty Rows Map ", emptyRowsMap);
    // console.log("Empty Columns Map ", emptyColsMap);
    
    // printMatrix(galaxyMatrix);
    // console.log(galaxyNumber);
    // console.log(totalPairs);

    let totalDistance = getTotalDistance(galaxyMatrix, galaxyNumber, emptyRowsMap, emptyColsMap);
    console.log("Total Distance ", totalDistance);
}

processLineByLine();