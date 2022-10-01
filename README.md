# CSE408GRP31_P01

CSE408 - Multimedia Information Systems
Fall 2022, Group 31
Members: Tommy Thai, Huy Tao, Jeffrey Li
P01: Text Classification and Sentimental Analysis

Due Date: 9/29/2022
Language: javascript

## Initial Setup
```
1. Install [Node.js](https://nodejs.org/en/)
2. Open up a terminal and cd into /code
3. Execute the command 'npm i' to install dependecies/packages
```

### NOTE: The scripts are programmed to take process arguments
```
The first two arguments are required:
    <DstType> - 1: Euclidean/SSD 2: Cosine Similarity 3: Common Words
    <K-value> - Hyperparameter K value
```
### Available Flags:
    -stem: stems the words (by default it doesn't stem)
    -nostem: by default it is run with no stemming
    -c | -clean: Clean output, less detailed result
    -h | -help : Outputs help, if the arguments are wrong, help is automatically outputted

## How to run part 1 test:
```
1. Open up a terminal
2. CD to /code folder
3. Run 'node ./P01Part1_test.js <DstType> <K-value> -flags' (DO NOT LITERALLY PUT IN THAT, PLACE PARAMETERS ACCORDINGLY)
```

## How to run part 2 test:
```
1. Open up a terminal
2. CD to /code folder
3. Run 'node ./P01Part2_test.js -flags' (DO NOT LITERALLY PUT IN THAT, PLACE PARAMETERS ACCORDINGLY)
```

### Alternatively, you can run these programs without Node.js with the compiled binary under bin, use the corresponding binary to your system.
```
1. CD into /code/bin
2. Use the corresponding binary to your operating system.
EX Windows Part 1:
    P01Part1_test.exe 1 3
EX Linux Part 1:
    ./P01Part1_test 1 3
EX Windows Part 2:
    P01Part2_test.exe
EX Linux Part 2:
    ./P01Part2_test
```
