const tokenizer = require('./tokenizer.js');
const interpreter = require('./interpreter.js');
//const interator = require('./interator.js');
//const parser = require('./parser.js');

exports.generateTable = function(logicExpression) {
    let expression = sanitizeInput(logicExpression);
    let tokens = tokenizer.tokenize(expression);
    //let iteratorObject = iterator.iterator(tokens);
    //let parsedTree = parser.parse(iteratorObject);
    let binopsTree = mockTree();
    let symbolsList = getSymbolsList(tokens);
    let table = generateRows(binopsTree, symbolsList);
};

function sanitizeInput(logicExpression){
    return logicExpression.replace(" ", "");
}

function getSymbolsList(tokens){
    let symbolsList = filter(token => token.type == "variable");
    symbolsList = symbolsList.filter((v, i, a) => a.indexOf(v) === i);
    return symbolsList;
}

function generateRows(binopsTree, symbols){
    
}

function mockTree(){
    let a = {type: "UNARY", not: false, unary: "A"};
    let b = {type: "UNARY", not: false, unary: "B"};
    let a2 = {type: "UNARY", not: false, unary: "A"};
    let b2 = {type: "UNARY", not: true, unary: "B"};
    let binops = {type: "BINOPS", lhs: a, rhs: b, op: "TK_OR"};
    let binops2 = {type: "BINOPS", lhs: a2, rhs: b2, op: "TK_AND"};
    let binopsMaster = {type: "BINOPS", lhs: binops, rhs: binops2, op: "TK_AND"};
    return binopsMaster;
}