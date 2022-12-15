//++++++++ SET-UP +++++++++++++++++++++
const fs = require("fs");

const textArray = fs
    .readFileSync("./data.txt", { encoding: `utf8` }) // reading file
    .split("\n"); // split on new line

//++++++++ SET-UP +++++++++++++++++++++

//++++++++PART 1++++++++++++++++++++++

// IIFE that returns alphabet lower + capitalized array
const alphabet = (() => {
    const lowerCase = [...Array(26)].map((val, i) =>
        String.fromCharCode(i + 65).toLowerCase()
    );
    return lowerCase.concat(lowerCase.map((letter) => letter.toUpperCase()));
})();

// function to change letter input to number relative to alphabet variable
const letterToNum = (letter) => {
    let num = 0;

    let i = -1; // not very clean... I know.
    while (i < alphabet.length) {
        i++;
        if (letter === alphabet[i]) {
            num = i + 1;
            break;
        }
    }
    return num;
};

// function that takes in a string and returns the common letter between the first and second half of that string and converts it through func letterToNum to a number
const commonTypeFinder = (string) => {
    const stringCut = string.length / 2;
    const p1 = string.slice(0, stringCut);
    const p2 = string.slice(stringCut);

    let done = false;
    let num = 0;
    for (let i = 0; i < p1.length; i++) {
        if (done) {
            break;
        }
        for (let j = 0; j < p2.length; j++) {
            if (p1[i] === p2[j]) {
                done = true;

                num = letterToNum(p1[i]);
                break;
            }
        }
    }
    return num;
};

// function to execture part 1
const part1 = (arr) => {
    const array = [...arr];

    const priorityArray = array.map((item) => {
        return commonTypeFinder(item);
    });

    const total = priorityArray.reduce((a, b) => a + b, 0);
    return total;
};

// console.log(part1(textArray));

// +++++++++++++++++++ PART 2 ++++++++++++++++++++++++++++++

// function takes array of strings and returns them in groups of 3
const grouper = (arr) => {
    const array = [...arr];

    let groups = [];
    const cutSize = 3;
    for (let i = 0; i < array.length; i += cutSize) {
        const group = array.slice(i, i + cutSize);
        groups.push(group);
    }
    return groups;
};

// function to compare similar letters of the indexed strings, takes in an array and returns a priority number based of alphabet
const loopMania = (arr) => {
    const [a, b, c] = [...arr];

    num = 0;
    let done = false;

    // Not very clean looping, but for now faster to code.
    for (let i = 0; i < a.length; i++) {
        if (done) break;
        for (let j = 0; j < b.length; j++) {
            if (a[i] === b[j]) {
                for (let k = 0; k < c.length; k++) {
                    if (b[j] === c[k]) {
                        num = letterToNum(c[k]);
                        done = true;
                        break;
                    }
                }
            }
        }
    }
    return num;
};

// executing function for part 2

const part2 = (arr) => {
    const textArray2 = [...arr];

    const groups = grouper(textArray2);
    const loopResult = groups.map((group) => {
        return loopMania(group);
    });
    const result = loopResult.reduce((a, b) => a + b, 0);
    return result;
};

console.log(part2(textArray));
