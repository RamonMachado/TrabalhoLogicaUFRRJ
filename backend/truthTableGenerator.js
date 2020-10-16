exports.generateTable = function(logicExpression) {
    return tokenize(logicExpression);
};  

function tokenize(formula) {
    var vetor = [];
    var token;
    var literal = "";
    for(i = 0; i < formula.length; i++){
        
        literal += formula[i];
        token = getToken(literal);
        
        if(token != 0){
            vetor.push({
                literal: literal,
                token: token
            });
            literal = "";
        }
    }

    return vetor;
}

function getToken(char) {
    switch(char){
        case "^":
            return "TK_AND";
        case "~":
            return "TK_NOT";
        case "v":
            return "TK_OR";
        case "->":
            return "TK_IMPLIES";
        case "<->":
            return "TK_IFF";
        default:
            return 0;
    }
}
