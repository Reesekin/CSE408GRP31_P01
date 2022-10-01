/*
    CSE408 - Multimedia Information Systems
    Fall 2022, Group 31
    Members: Tommy Thai, Huy Tao, Jeffrey Li
    P01: Text Classification and Sentimental Analysis

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
    const {feat_vec, count} = cse408_bow(filepath, lexiconWords);

    //if filepath contains 'neg' then it is negative
    const truth = filepath.includes('neg') ? 0 : 1;

    let score = 0;
    for (const word in feat_vec){
        if (word in weights){
            score += weights[word] * feat_vec[word];
        }
    }
    let sent = '';
    score = score/count;

    if (score > 0){
        if (score > 0.7){   
            sent = "Highly Positive";
        }
        else {
            sent = "Positive";
        }
    }

    if (score < 0){
        if (score < -0.7){
            sent = "Highly Negative";
        }
        else {
            sent = "Negative";
        }
    }

    if (score == 0){
        sent = "Neutral";
    }
    console.log(`Filename: ${filepath}, Groundtruth: ${truth? 'Positive' : 'Negative'}, Score: ${score}, Sentiment: ${sent}`);
}

module.exports = {sentimentalAnalysis};