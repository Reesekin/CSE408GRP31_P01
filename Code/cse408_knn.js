/*
    CSE408 - Multimedia Information Systems
    Fall 2022, Group 31
    Members: Tommy Thai, Huy Tao, Jeffrey Li
    P01: Text Classification and Sentimental Analysis

    Due Date: 9/29/2022
    Language: javascript
*/

const {dot, sqrt, square, sum, subtract, divide, multiply} = require('mathjs')
const {clean} = require('./buildVoc.js');

function Euclidean(test_feat, train_label, train_feat, k){ //SSD
    const i = train_label.findIndex(label => label.length === 0);
    const train_vec = test_feat[i].feature;
    for (let j = 0; j < test_feat.length; j++){
        if (j != i){
            const a = train_vec;
            const b = test_feat[j].feature;
            const ssd = square(sum(subtract(a, b)))
            train_feat[j] = {file: test_feat[j].path, value:ssd, truth: test_feat[j].label};
        }
    }
    // sort sbArr by sum
    train_feat.sort((a, b) => (a.value > b.value) ? 1 : -1);
    const filtered = train_feat.filter(item => item.length !== 0);
    const topK = filtered.slice(0, k)
    if (!clean) console.log(topK);
    return topK;
}

function CosineDistance(test_feat, train_label, train_feat, k){
    const i = train_label.findIndex(label => label.length === 0);
    const train_vec = test_feat[i].feature;
    for (let j = 0; j < test_feat.length; j++){
        if (j != i){
            const a = train_vec;
            const b = test_feat[j].feature;
            //sum all of a^2
            let A2 = 0;
            for (const f of a){
                A2 += f*f;
            }
            //sum all of b^2
            let B2 = 0;
            for (const f of b){
                B2 += f*f;
            }
            //dot product
            const numerator = dot(a, b);
            const denominator = multiply(sqrt(A2), sqrt(B2));
            const cos = divide(numerator, denominator);
            train_feat[j] = {file: test_feat[j].path, value:cos, truth: test_feat[j].label};
        }
    }
    // sort sbArr by sum
    train_feat.sort((a, b) => (a.value < b.value) ? 1 : -1);
    // get top k
    const filtered = train_feat.filter(item => item.length !== 0);
    const topK = filtered.slice(0, k)
    if (!clean) console.log(topK);
    return topK;
}

// function calcTF(t, doc){
//     const numerator = doc.feat_vec[`${t}`];
//     const denominator = doc.count;
//     const TF = numerator/denominator;
//     return {TF, numerator, denominator};
// } 
// function calcIDF(t, docs){
//     const numerator = docs.length;
//     let count = 0;
//     for (const doc of docs){
//         if (doc.feat_vec[`${t}`] > 0){
//             count++;
//         }
//     }
//     const denominator = count;
//     return {IDF: Math.log(numerator/denominator), numerator, denominator};
// }

// count occurances
function Sb(a, b){
    let c = Array.from(Array(a.length))
    for (const f in a){
        if (a[f] < b[f]){
            c[f] = a[f];
        }
        else if (a[f] > b[f]){
            c[f] = b[f];
        }
        else{
            c[f] = a[f];
        }
    }
    return c;
}
// // do not count occurances
// function Sb(a, b){
//     let c = Array.from(Array(a.length))
//     for (const f in a){
//         if (a[f] > 0 && b[f] > 0){
//             c[f] = 1;
//         }
//         else {
//             c[f] = 0;
//         }
//     }
//     return c;
// }


function Word(test_feat, train_label, train_feat, k){
    const i = train_label.findIndex(label => label.length === 0);
    const train_vec = test_feat[i].feature;
    for (let j = 0; j < test_feat.length; j++){
        if (j != i){
            const sb = Sb(train_vec, test_feat[j].feature);
            let sum = sb.reduce((a, b) => (a + b), 0);
            train_feat[j] = {file: test_feat[j].path, value:sum, truth: test_feat[j].label};
        }
    }
    // // invert every sum
    // for (const sb of train_feat){
    //     sb.value = (sb.value);
    // }
    // sort sbArr by sum
    train_feat.sort((a, b) => (a.value < b.value) ? 1 : -1);
    // get top k
    const filtered = train_feat.filter(item => item.length !== 0);
    const topK = filtered.slice(0, k)
    if (!clean) console.log(topK);
    return topK;
}

function cse408_knn(test_feat, train_label, train_feat, k, DstType){
    const i = train_label.findIndex(label => label.length === 0);
    let result;
    switch(DstType){
        case 1:
            result = Euclidean(test_feat, train_label, train_feat, k);
            break;
        case 2:
            result = CosineDistance(test_feat, train_label, train_feat, k);
            break;
        case 3:
            result = Word(test_feat, train_label, train_feat, k);
            break;
        default:
            console.log("Invalid Distance Type");
            return;
    }
    let posCt = 0;
    let negCt = 0;
    for (const r of result){
        if (r.truth === 1){
            posCt++;
        }
        else{
            negCt++;
        }
    }
    console.log({posCt, negCt});
    if (posCt > negCt){
        train_label[i] = 1;
        return 1;
    }
    else if (posCt === negCt && posCt > 0){
        train_label[i] = 1;
        return 1;
    }
    else if (negCt === 0 && posCt === 0){
        train_label[i] = 1;
        return 1;
    }
    else {
        train_label[i] = 0;
        return 0;
    }

}

module.exports = {Word, Sb, Euclidean, CosineDistance, cse408_knn};