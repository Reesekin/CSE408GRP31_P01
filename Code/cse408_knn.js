const {buildVoc} = require('./buildVoc.js');
const {cse408_bow} = require('./cse408_bow.js');
var fs = require('fs');
var natural = require('natural');

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

function Euclidean(test_feat, train_feat, k){
    // TODO
}

function CosineDistance(test_feat, train_feat, k){
    // TODO
}

function calcTF(t, doc){
    const numerator = doc.feat_vec[`${t}`];
    const denominator = doc.count;
    const TF = numerator/denominator;
    return {TF, numerator, denominator};
} 
function calcIDF(t, docs){
    const numerator = docs.length;
    let count = 0;
    for (const doc of docs){
        if (doc.feat_vec[`${t}`] > 0){
            count++;
        }
    }
    const denominator = count;
    return {IDF: Math.log(numerator/denominator), numerator, denominator};
}

function Word(test_feat, train_label, train_feat, k){
    for (let i = 0; i < test_feat.length; i++) {
        let pos = 0;
        let neg = 0;
        let neutral = 0;
        const words = Object.keys(test_feat[i].feat_vec);
        const values = Object.values(test_feat[i].feat_vec);
        for (const word of words){
            const value = values[words.indexOf(word)];
            const path = test_feat[i].path;
            const {TF} = calcTF(word, test_feat[i]);
            const {IDF} = calcIDF(word, test_feat);
            const TFIDF = TF * IDF;
            console.log({path, word, TF, IDF, TFIDF});
        }
        //console.log({pos, neg, neutral});
    }

}

function cse408_knn(test_feat, train_label, train_feat, k, DstType){
    switch(DstType){
        case 'Euclidean':
            Euclidean(test_feat, train_feat, k);
            break;
        case 'Cosine':
            CosineDistance(test_feat, train_feat, k);
            break;
        case 'Word':
            Word(test_feat, train_label, train_feat, k);
            break;
    }
}

// Test Area:
let feat = [];
let label = [];
let K = 1;

const posFiles = fs.readdirSync(posFolder);
const negFiles = fs.readdirSync(negFolder);

for (const file of posFiles) {
    const path = `../Data/pos/${file}`;
    const {feat_vec, count} = cse408_bow(path, voc);
    feat.push({path: path, feat_vec: feat_vec, count: count});
    label.push(1);
}
for (const file of negFiles) {
    const path = `../Data/neg/${file}`;
    const {feat_vec, count} = cse408_bow(path, voc);
    feat.push({path: path, feat_vec: feat_vec, count: count});
    label.push(1);
}

//Debug TF and IDF
console.log(calcTF('youtube', feat[1]));
console.log(calcIDF('youtube', feat));

let trainLabel = [];
let trainFeat = [];

cse408_knn(feat, trainLabel, trainFeat, K, 'Word');
