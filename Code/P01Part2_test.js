const {help} = require('./buildVoc.js');
const {sentimentalAnalysis} = require('./sentimentalAnalysis.js');
let score_compare = 0;
let correct_ct = 0;
if (!help){
    for (let i = 1; i < 41; i++) {
        if (i < 10){
            score_compare = sentimentalAnalysis(`../Data/pos/00${i}.txt`);
            if (score_compare > 0){
                correct_ct++;
            }
        }
        else {
            score_compare = sentimentalAnalysis(`../Data/pos/0${i}.txt`);
            if (score_compare > 0){
                correct_ct++;
            }
        }
    }

    for (let i = 1; i < 41; i++) {
        if (i < 10){
            score_compare = sentimentalAnalysis(`../Data/neg/00${i}.txt`);
            if (score_compare < 0){
                correct_ct++;
            }
        }
        else {
            score_compare = sentimentalAnalysis(`../Data/neg/0${i}.txt`);
            if (score_compare < 0){
                correct_ct++;
            }
        }
    }
    const accuracy = (correct_ct / 80)*100;
    console.log(`Score: ${correct_ct}/80`);
    console.log(`Accuracy: ${accuracy}%`);

}
else {
    console.log('Welcome to GROUP 31\'s Project 1 : Created by Tommy Thai, Huy Tao, and Jeffrey Li');
    console.log('Please run the following commands to test the program:');
    console.log('Node version: ');
    console.log('\tnode P01Part2_test.js -flags');
    console.log('Binary Executable:')
    console.log('\tP01Part2_test.exe -flags');
    console.log('Available Flags:');
    console.log('\t-h: Help\t\n\t -stem: Stem words in vocabulary\n\t -nostem: Do not stem words in vocabulary (Default)\n');
    console.log('Example: node P01Part1_test.js 1 3');
    console.log(' You can view all the output by outputting to a file: node P01Part2_test.js > output.txt');
}