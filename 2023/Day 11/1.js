const fs = require('fs');
const readline = require('readline');


const printMatrix = (matrix) => {
    for (let index = 0; index < matrix.length; index++) {
        console.log(matrix[index]);
    }
} 

const fixMatrixColumns = (matrix) => {
    for (let index = 0; index < matrix[0].length; index++) {
        let isGalaxyFound = false;
        for (let j = 0; j < matrix.length; j++) {
            if(matrix[j][index] != '.'){
                isGalaxyFound = true;
            }
        }
        if(!isGalaxyFound){
            for (let j = 0; j < matrix.length; j++) {
                matrix[j].splice(index, 0, '.');
            }
            index++;
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

const getTotalDistance = (matrix, pairs, galaxyCount) => {
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
            let dis = Math.abs(startPoints[0] - endPoints[0]) + Math.abs(startPoints[1] - endPoints[1]);
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
            galaxyMatrix.push(line.split(''));
            galaxyMatrix.push(line.split(''));
        }
    }
    galaxyNumber--;

    for (let index = galaxyNumber - 1; index > 0; index--) {
        totalPairs += index;
    }

    fixMatrixColumns(galaxyMatrix);

    printMatrix(galaxyMatrix);
    console.log(galaxyNumber);
    console.log(totalPairs);

    let totalDistance = getTotalDistance(galaxyMatrix, totalPairs, galaxyNumber);
    console.log("Total Distance ", totalDistance);
}

processLineByLine();