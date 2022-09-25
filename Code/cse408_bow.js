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
let natural = require('natural');

const {buildVoc} = require('./buildVoc.js');

function cse408_bow(filepath, voc){
    //Should already be in lowercase but do it in case.
    const lowerVoc = voc.map(word => word.toLowerCase());

    //The usual
    const regex = /[\r \n \t , . : ; ' " ` { } / ? ! # @ $ % ^ & * ( ) - +]+/g;
    var words = fs.readFileSync(filepath, 'utf8').split(" ").filter(Boolean);
    words = words.map(word => word.replace(/[^\x00-\x7F]/g, ""));
    words = words.map(word => word.replace(regex, ""));
    words = words.map(word => natural.PorterStemmer.stem(word));

    var bow = new Object();
    
    for (const word of words) {
        const lowerWord = word.toLowerCase();
        if (lowerVoc.includes(lowerWord)) {
            if (!(`${lowerWord}` in bow)) {
                bow[`${lowerWord}`] = 1;
            } 
            else {
                bow[`${lowerWord}`] += 1;
            }
        }
    }
    const feat_vec = bow;
    const count = Object.values(feat_vec).reduce((sum, a) => sum + a, 0);
    return {feat_vec, count};
}

// //vocabs
// const posFolder = '../Data/pos/';
// const negFolder = '../Data/neg/';
// const positive = buildVoc(posFolder);
// const negative = buildVoc(negFolder);
// const intersection = (a, b) => {
//     const s = new Set(b);
//     return a.filter(x => s.has(x));
// }
// const intersect = intersection(positive.voc, negative.voc);
// //remove intersection from positive and negative vocabs
// const posVoc = positive.voc.filter(word => !intersection(positive.voc, negative.voc).includes(word)); //true pos vocab
// const negVoc = negative.voc.filter(word => !intersection(positive.voc, negative.voc).includes(word)); //true neg vocab
// let voc = posVoc.concat(negVoc).concat(intersect);

// //test
// const test = cse408_bow('../Data/pos/002.txt', voc);
// console.log(test.feat_vec);
// console.log(test.count);

module.exports = {cse408_bow};


