const tokenizer = require('./tokenizer.js');
const interpreter = require('./interpreter.js');
const iterator = require('./iterator.js');
const parser = require('./parser.js');
const { parse } = require('./parser.js');

exports.generateTable = function(logicExpression) {
    let expression = sanitizeInput(logicExpression);
    let tokens = tokenizer.tokenize(expression);
    let iteratorObject = iterator.iterator(tokens);
    let parsedTree = parser.parse(iteratorObject);
    console.log(tokens);
    let symbolsList = getSymbolsList(tokens);
    let rows = generateRows(parsedTree, symbolsList, expression);
    let header = generateTableHeader(symbolsList, expression);
    return {header: header, rows: rows};
};

function sanitizeInput(logicExpression){
    //fazer ficar tudo caps tbm
    return logicExpression.replace(" ", "");
}

function getSymbolsList(tokens){
    let symbolsList = tokens.filter(token => token.type == "variable");
    symbolsList = symbolsList.map(x => x.literal).filter((v, i, a) => a.indexOf(v) === i);
    return symbolsList;
}

function generateRows(parsedTree, symbols, expression){
    let rows = [];
    let rowsNumber = Math.pow(2, symbols.length);
    for(let i = 0; i < rowsNumber; i++){
        let values = {}; 
        let bin = dec2bin(rowsNumber+i);
        symbols.forEach((v, i) => (values[v] = bin[i+1] === "1" ? true : false));
        let row = generateSingleRow(parsedTree, values, expression);
        console.log(row);
        rows.push(row);
    }
    return rows;
}

function generateSingleRow(parsedTree, values, expression){
    values[expression] = interpreter.evaluate(values, parsedTree);
    return values;
}

function generateTableHeader(symbols, expression){
    let columns = [];
    symbols.push(expression);
    symbols.forEach((v, i) => columns.push({text: v, value: v}));
    return columns;
}

function dec2bin(dec){
    return (dec >>> 0).toString(2);
}

/*
3s = 2^3 = 8

1000

0000
0001
0010
0011
0100
0101
0110
0111
1000
1001
1010
1011
*/