var fs = require('fs');

const {buildVoc} = require('./buildVoc.js');
const {cse408_bow, featurize} = require('./cse408_bow.js');
const {cse408_knn} = require('./cse408_knn.js');

const posFolder = '../Data/pos/';
const negFolder = '../Data/neg/';

const positive = buildVoc(posFolder);
const negative = buildVoc(negFolder);
const intersection = (a, b) => {
    const s = new Set(b);
    return a.filter(x => s.has(x));
}

const {help, DstType, K} = require('./buildVoc.js');
const intersect = intersection(positive.voc, negative.voc);
//remove intersection from positive and negative vocabs
const posVoc = positive.voc.filter(word => !intersection(positive.voc, negative.voc).includes(word)); //true pos vocab
const negVoc = negative.voc.filter(word => !intersection(positive.voc, negative.voc).includes(word)); //true neg vocab
let voc = posVoc.concat(negVoc).concat(intersect);

// Test Area:
let feat = [];
let label = [];

const posFiles = fs.readdirSync(posFolder);
const negFiles = fs.readdirSync(negFolder);

for (const file of posFiles) {
    const path = `../Data/pos/${file}`;
    const {feat_vec, count} = cse408_bow(path, voc);
    const feature = featurize(path, voc)
    feat.push({path: path, file: file, feat_vec: feat_vec, feature: feature, count: count, label: 1});
    label.push(1);
}
for (const file of negFiles) {
    const path = `../Data/neg/${file}`;
    const {feat_vec, count} = cse408_bow(path, voc);
    const feature = featurize(path, voc)
    feat.push({path: path, file: file, feat_vec: feat_vec, feature: feature, count: count, label: 0});
    label.push(0);
}

let correct_ct = 0;
if (!help) {
    for (const f of feat) {
        const i = feat.indexOf(f);
        let trainLabel = label.map((x) => x);
        trainLabel[i] = [];
        let trainFeat = Array.from(Array(feat.length));
        trainFeat[i] = [];
        const pred_label = cse408_knn(feat, trainLabel, trainFeat, K, DstType);
        console.log(`Document ${f.path} -> Ground Truth: ${f.label ? 'Positive' : 'Negative'}, Predicted as: ${pred_label ? 'Positive' : 'Negative'}`);
        if (pred_label === f.label) correct_ct++;
    }

    const accuracy = (correct_ct / label.length)*100;
    console.log(`Score: ${correct_ct}/${label.length}`);
    console.log(`Accuracy: ${accuracy}%`);
}
else {
    console.log('Welcome to GROUP 31\'s Project 1 : Created by Tommy Thai, Huy Tao, and Jeffrey Li');
    console.log('Please run the following commands to test the program:');
    console.log('Node version: ');
    console.log('\tnode P01Part1_test.js <DstType 1:SSD 2:Cosine 3: Word> <K-Value> -flags');
    console.log('\tnode P01Part2_test.js -flags');
    console.log('Binary Executable:')
    console.log('\tP01Part1_test.exe <DstType 1:SSD 2:Cosine 3: Word> <K-Value> -flags');
    console.log('Available Flags:');
    console.log('\t-h: Help\t\n\t -stem: Stem words in vocabulary\n\t -nostem: Do not stem words in vocabulary (Default) \n\t -c | -clean: Clean output (less detailed result)');
    console.log('Example: node P01Part1_test.js 1 3');
    console.log(' You can view all the output by outputting to a file: node P01Part1_test.js 1 3 > output.txt');
}