// nodes used from html
const textField = document.getElementById("textinput");
const button = document.getElementById("button");
const result = document.getElementById("result");
const top3 = document.getElementById("top3total");

// regex used to find the whitespace of the textinput
const reWhiteSpace = new RegExp("\n");

// function to change the string of textinput into seperate arrayss with the calories per Elf
const separateSnacksPerElf = (val) => {
    const array = val.match(reWhiteSpace);
    const snacksPerElf = array.input.split("\n\n");
    return snacksPerElf;
};

// function to count all the calories per elf
const totalCalorieperElf = (val) => {
    if (Array.isArray(val)) {
        const copy = [...val];
        const numberCalories = copy.map(Number);
        const reduced = numberCalories.reduce((acc, cur) => acc + cur, 0);
        return reduced;
    } else {
        +val;
        return val;
    }
};

// function to check for whitespace in a string
const whitespaceMatcher = (val) => {
    if (!val.includes("\n")) {
        return val;
    } else {
        const thing = val.match(reWhiteSpace);
        const otherThing = thing.input.split("\n");
        return otherThing;
    }
};

const top3Sum = (val) => {
    const array = [...val];
    array.reverse();
    const slicedReduced = array.slice(0, 3).reduce((acc, cur) => acc + cur, 0);
    return slicedReduced;
};

// function that takes in all elf arrays with their different calories and returns an array with total amount of calolories per elf.
const calorieCounter = (val) => {
    const copyArray = [...val];
    const thingy = copyArray.map((elf, idx) => {
        const newThing = whitespaceMatcher(elf);
        const totalPE = totalCalorieperElf(newThing);
        // console.log("totalPE: ", totalPE, idx);
        return totalPE;
    });
    return thingy;
};

// button that will do start the calculations of the textinput and gives out the endresult: calories of elf with highest calorietotal.
button.addEventListener("click", () => {
    const string = textField.value;
    const itemsPerElfArray = separateSnacksPerElf(string);
    const caloriesPerElf = calorieCounter(itemsPerElfArray).map(Number);
    const sortedCaloriesPerElf = caloriesPerElf.sort(function (a, b) {
        return a - b;
    });
    const totalCaloriesTop3Elfs = top3Sum(sortedCaloriesPerElf);
    top3.innerHTML = `Elfs with the top 3 calories have in total: ${totalCaloriesTop3Elfs} calories`;

    const elfWithHighestCalorieCount = Math.max.apply(0, caloriesPerElf);
    result.innerHTML = `The elf with the highest calorie amount has ${elfWithHighestCalorieCount} calories.`;
});
