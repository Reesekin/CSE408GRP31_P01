/*
    CSE408 - Multimedia Information Systems
    Fall 2022, Group 31
    Members: Tommy Thai, Huy Tao, Jeffrey Li
    P01: Text Classification and Sentimental Analysis
    Written by: Tommy Thai

    Due Date: 9/29/2022
    Language: javascript
*/

var fs = require('fs');

const lexicon = '../Data/wordwithStrength.txt';
//get every line from lexicon
let lexiconLines = fs.readFileSync(lexicon).toString().split("\n");
// get string between \t and \n from lexicon lines into lexiconValues
let lexiconValues = lexiconLines.map((line) => line.split("\t")[1]).filter((value) => value != undefined);
// only get the word up to the first \t and get rid of '' null values and commas
let lexiconWords = lexiconLines.map((line) => line.split("\t")[0]).filter((value) => value != undefined && value != '' && value != ',');
let weights = new Object();
for (let i = 0; i < lexiconWords.length; i++){
    weights[lexiconWords[i]] = lexiconValues[i];
}


function sentimentalAnalysis(filepath){
    console.log(weights);
}
sentimentalAnalysis(null);


