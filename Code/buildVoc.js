/*
    CSE408 - Multimedia Information Systems
    Fall 2022, Group 31
    Members: Tommy Thai, Huy Tao, Jeffrey Li
    P01: Text Classification and Sentimental Analysis
    Written by: Tommy Thai

    Due Date: 9/29/2022
    Language: javascript

    Vocabulary (lexicon) creation (10pt)
        Input: a folder path, which contains training data (a bunch of .txt files from Multimedia App reviews
        in HW00);
        Output: matlab cell array voc, which represents the vocabulary of the words shown in the training
        data, except the stop words (stop words list is embedded in the code template)
*/

var fs = require('fs');
var natural = require('natural');

//Stop words (note they are all lower case)
let stopword = ['ourselves', 'hers', 'between', 'yourself', 'but', 'again', 'there',
    'about', 'once', 'during', 'out', 'very', 'having', 'with', 'they', 'own',
    'an', 'be', 'some', 'for', 'do', 'its', 'yours', 'such', 'into',
    'of', 'most', 'itself', 'other', 'off', 'is', 's', 'am', 'or',
    'who', 'as', 'from', 'him', 'each', 'the', 'themselves', 'until',
    'below', 'are', 'we', 'these', 'your', 'his', 'through', 'don', 'nor',
    'me', 'were', 'her', 'more', 'himself', 'this', 'down', 'should', 'our',
    'their', 'while', 'above', 'both', 'up', 'to', 'ours', 'had', 'she', 'all',
    'no', 'when', 'at', 'any', 'before', 'them', 'same', 'and', 'been', 'have',
    'in', 'will', 'on', 'does', 'yourselves', 'then', 'that', 'because',
    'what', 'over', 'why', 'so', 'can', 'did', 'not', 'now', 'under', 'he',
    'you', 'herself', 'has', 'just', 'where', 'too', 'only', 'myself',
    'which', 'those', 'i', 'after', 'few', 'whom', 't', 'being', 'if',
    'theirs', 'my', 'against', 'a', 'by', 'doing', 'it', 'how',
    'further', 'was', 'here', 'than'];
    stopword = stopword.map(word => natural.PorterStemmer.stem(word));
function buildVoc(folder) {
    var path = folder;
    //path check
    if (folder[folder.length-1] != '/') path += '/';
    var voc = [];
    //read file names from folder
    var Files = fs.readdirSync(path);
    //filter out non .txt files
    Files = Files.filter(file => file.includes('.txt'));
    for (const file of Files) {
        //read words from file
        var words = fs.readFileSync(path + file, 'utf8').split(/[\r \n \t , .]+/).filter(Boolean);
        //remove non-ascii characters
        words = words.map(word => word.replace(/[^\x00-\x7F]/g, ""));
        //remove delimiters and other
        words = words.map(word => word.replace(/[\r \n \t , . : ; ' " ` { } / ? ! # @ $ % ^ & * ( ) - +]+/g, ""));
        //stem words
        words = words.map(word => natural.PorterStemmer.stem(word));
        //push to voc if not in stopword and not duplicate
        for (const word of words) {
            const lowerWord = word.toLowerCase();
            if (!stopword.includes(lowerWord) && !voc.includes(lowerWord)) {
                voc.push(lowerWord); //push to voc
            }
        }
    }
    return {voc} //return voc
}
//vocabs
const posFolder = '../Data/pos/';
const negFolder = '../Data/neg/';
const positive = buildVoc(posFolder);
const negative = buildVoc(negFolder);
const intersection = (a, b) => {
    const s = new Set(b);
    return a.filter(x => s.has(x));
}
const intersect = intersection(positive.voc, negative.voc);
//remove intersection from positive and negative vocabs
const posVoc = positive.voc.filter(word => !intersection(positive.voc, negative.voc).includes(word)); //true pos vocab
const negVoc = negative.voc.filter(word => !intersection(positive.voc, negative.voc).includes(word)); //true neg vocab
let voc = posVoc.concat(negVoc).concat(intersect);

// //test
// console.table(stopword);
// console.table(voc);

module.exports = {buildVoc};