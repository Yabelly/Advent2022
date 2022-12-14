// ROCK PAPER SCISSORS

// opponent column (first column)
// A = ROCK
// B = PAPER
// C = SCISSORS

// Tournament win: player with highest total score
// draw = 3 points
// loss = 0 points
// win = 6 points

// points per choice of character
// ROCK = 1 point
// PAPER = 2 points
// SCISSORS = 3 points

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!PART SPECIFIC RULES !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//PART 1 PARAMATERS column 2
// my column (second column)
// X = ROCK
// Y = PAPER
// Z = SCISSORS

// PART 2 PARAMETERS COLUMN 2
// my column (second column)
// X = I lose
// Y = draw
// Z = I win
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!PART SPECIFIC RULES !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

//++++++++ SET-UP +++++++++++++++++++++
const fs = require("fs");

const text = fs
    .readFileSync("./input.txt", { encoding: `utf8` }) // reading file
    .replace(/\r/g, "") // removing all \r characters
    .trim() // removes start and ending whitespace
    .split("\n") // split on new line
    .map((line) => line.split(" "));
//++++++++ SET-UP +++++++++++++++++++++

//++++++++++ PART ONE +++++++++++++++

//  returns roundresult for me in points, WHERE ABC/XYZ  define respective choices
const resultForMePart1 = (opponentInput, myInput) => {
    if (
        //draw
        (opponentInput === "A" && myInput === "X") ||
        (opponentInput === "B" && myInput === "Y") ||
        (opponentInput === "C" && myInput === "Z")
    ) {
        return 3;
    } else if (
        // win
        (opponentInput === "A" && myInput === "Y") ||
        (opponentInput === "B" && myInput === "Z") ||
        (opponentInput === "C" && myInput === "X")
    ) {
        return 6;
    } else {
        // loose
        return 0;
    }
};

// returns points that i recieve for my choice
const pointsForChoice1 = (val) => {
    if (val === "X") return 1;
    else if (val === "Y") return 2;
    else if (val === "Z") return 3;
};

// returns total amount of point per round
const roundScore = (val, part2) => {
    const input = [...val];
    const [opponentInput, myInput] = input;

    const resultRound = resultForMePart1(opponentInput, myInput);
    const resultChoice = pointsForChoice1(myInput);
    return resultRound + resultChoice;
};

// returns total score of tournament for me
const totalScore = (val) => {
    const input = [...val];
    let total = 0;

    input.map((round) => {
        total += roundScore(round);
    });

    return total;
};

console.log("total Part 1: ", totalScore(text));

// +++++++++++++++++++ PART 2 +++++++++++++++++++++++++++++++++++++++++++++++++++

//all options for the win/draw/loss of a round
const roundResult = (val) => {
    const [opp, choice] = [...val];
    let score = 0;
    //draw
    if (choice === "Y") {
        score = 3;
        if (opp === "A") return score + 1;
        else if (opp === "B") return score + 2;
        else return score + 3;
    }
    //loss
    else if (choice === "X") {
        score = 0;
        if (opp === "A") return score + 3;
        else if (opp === "B") return score + 1;
        else return score + 2;
    }
    //win
    else {
        score = 6;
        if (opp === "A") return score + 2;
        else if (opp === "B") return score + 3;
        else return score + 1;
    }
};

// returns total score of tournament for me
const ex2 = (val) => {
    const input = [...val];
    let total = 0;

    input.map((round) => {
        total += roundResult(round);
    });
    console.log("total: ", total);

    return total;
};

ex2(text);
