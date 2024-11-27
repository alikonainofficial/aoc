const fs = require('fs');
const readline = require('readline');

const classifyHand = (hand) => {
    const cardCounts = {};
    for (const card of hand) {
        cardCounts[card] = (cardCounts[card] || 0) + 1;
    }

    const counts = Object.values(cardCounts).sort((a, b) => b - a);
    const uniqueCards = Object.keys(cardCounts).length;

    if (counts[0] === 5) {
        return '1';
    } else if (counts[0] === 4) {
        return '2';
    } else if (counts[0] === 3 && uniqueCards === 2) {
        return '3';
    } else if (counts[0] === 3) {
        return '4';
    } else if (counts[0] === 2 && counts[1] === 2) {
        return '5';
    } else if (counts[0] === 2) {
        return '6';
    } else {
        return '7';
    }
}

const orderByStrength = (cardArray, finalCardOrder) => {
    if(cardArray.length == 0) return;

    let cardNumberStrength = {
        'A': 13,
        'K': 12,
        'Q': 11,
        'T': 10,
        'J': 9
    }
   
    cardArray.sort((firstCard, secondCard) => {
        for(let i = 0; i < 5; i++){
            if(firstCard.hand[i] != secondCard.hand[i]){
                if((firstCard.hand[i] >= '2' && firstCard.hand[i] <= '9') && (secondCard.hand[i] >= '2' && secondCard.hand[i] <= '9')) {
                    return firstCard.hand[i] - secondCard.hand[i];
                } else if(secondCard.hand[i] >= '2' && secondCard.hand[i] <= '9'){
                    if(firstCard.hand[i] == 'J'){
                        return -1;
                    } else{
                        return 1;
                    }
                } else if (firstCard.hand[i] >= '2' && firstCard.hand[i] <= '9'){
                    if(secondCard.hand[i] == 'J'){
                        return 1;
                    } else {
                        return -1;
                    }
                } else if (cardNumberStrength[firstCard.hand[i]] > cardNumberStrength[secondCard.hand[i]]){
                    return 1;
                } else {
                    return -1;
                }
            }
        }
        return 0;
    });
    finalCardOrder.push(cardArray);
}


const orderByType = (fiveOfKind, fourOfKind, fullHouse, threeOfKind, twoPair, onePair, highCard, input) => {

    let hand = input.split(' ')[0];
    let bid = parseInt(input.split(' ')[1]);
    let countOfJ = (hand.match(/J/g)||[]).length;

    if(classifyHand(hand) == '1'){
        fiveOfKind.push({
            hand: hand,
            bid: bid
        });
    } else if(classifyHand(hand) == '2'){
        if(countOfJ > 0){
            fiveOfKind.push({
                hand: hand,
                bid: bid
            }); 
        }else {
            fourOfKind.push({
                hand: hand,
                bid: bid
            });
        }
    } else if(classifyHand(hand) == '3'){
        if(countOfJ > 0){
            fiveOfKind.push({
                hand: hand,
                bid: bid
            }); 
        } else {
            fullHouse.push({
                hand: hand,
                bid: bid
             });
         }
    }else if(classifyHand(hand) == '4'){
        if(countOfJ > 0){
            fourOfKind.push({
                hand: hand,
                bid: bid
            }); 
        } else {
            threeOfKind.push({
                hand: hand,
                bid: bid
            });
        }
    }else if(classifyHand(hand) == '5'){
        if(countOfJ == 1){
            fullHouse.push({
                hand: hand,
                bid: bid
            });
        } else if (countOfJ == 2){
            fourOfKind.push({
                hand: hand,
                bid: bid
            });
        } else{
            twoPair.push({
                hand: hand,
                bid: bid
            });
        }
    }else if(classifyHand(hand) == '6'){
        if(countOfJ > 0){
            threeOfKind.push({
                hand: hand,
                bid: bid
            });
        } else {
            onePair.push({
                hand: hand,
                bid: bid
            });
        }
    }else {
        if(countOfJ > 0){
            onePair.push({
                hand: hand,
                bid: bid
            });
        } else{
            highCard.push({
                hand: hand,
                bid: bid
            });
        }
    }
}

async function processLineByLine() {
  
  const fileStream = fs.createReadStream('input1_2.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.


  let fiveOfKind = [], fourOfKind = [], fullHouse = [], threeOfKind = [], twoPair = [], onePair = [], highCard = [];

  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.
        orderByType(fiveOfKind, fourOfKind, fullHouse, threeOfKind, twoPair, onePair, highCard, line);
    }

    let finalCardOrder = [];

    orderByStrength(highCard, finalCardOrder);
    orderByStrength(onePair, finalCardOrder);
    orderByStrength(twoPair, finalCardOrder);
    orderByStrength(threeOfKind, finalCardOrder);
    orderByStrength(fullHouse, finalCardOrder);
    orderByStrength(fourOfKind, finalCardOrder);
    orderByStrength(fiveOfKind, finalCardOrder);

    let rank = 1;
    let totalWinnings = 0;

    // console.log(finalCardOrder);

    for(let i = 0; i < finalCardOrder.length; i++){
        for(let j = 0; j < finalCardOrder[i].length; j++){
            totalWinnings += finalCardOrder[i][j].bid * rank;
            rank++;
        }
    }   

    console.log('Winnings ', totalWinnings);
}


processLineByLine();
