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
const {cse408_bow} = require('./cse408_bow.js');

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
    const {feat_vec} = cse408_bow(filepath, lexiconWords);
    let score = 0;
    for (const word in feat_vec){
        if (word in weights){
            score += weights[word] * feat_vec[word];
        }
    }
    
    if (score > 0){
        if (score > 0.7){
            console.log(score);    
            console.log("Highly Positive");
        }
        else {
            console.log(score);
            console.log("Positive");
        }
    }

    if (score < 0){
        if (score < -0.7){
            console.log(score);
            console.log("Highly Negative");
        }
        else {
            console.log(score);
            console.log("Negative");
        }
    }

    if (score == 0){
        console.log("Neutral");
    }
}

for (let i = 1; i < 41; i++) {
    if (i < 10){
        sentimentalAnalysis(`../Data/pos/00${1}.txt`);
    }
    else {
        sentimentalAnalysis(`../Data/pos/0${i}.txt`);
    }
}

for (let i = 1; i < 41; i++) {
    if (i < 10){
        sentimentalAnalysis(`../Data/neg/00${i}.txt`);
    }
    else {
        sentimentalAnalysis(`../Data/neg/0${i}.txt`);
    }
}