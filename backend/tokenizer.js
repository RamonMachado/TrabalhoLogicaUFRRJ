function tokenize(formula) {
    var vetor = [];
    var token;
    var literal = "";
    for(i = 0; i < formula.length; i++){
        
        literal += formula[i];
        token = getToken(literal);
        
        if(token != null){
            vetor.push({
                literal: literal,
                token: token.content,
                type: token.type
            });
            literal = "";
        }
    }

    return vetor;
}

function getToken(char) {
    switch(char){
        case "^":
            return {content: "TK_AND", type: "operator"};
        case "~":
            return {content: "TK_NOT", type: "operator"};
        case "v":
            return {content: "TK_OR", type: "operator"};
        case "->":
            return {content: "TK_IMPLIES", type: "operator"};
        case "<->":
            return {content: "TK_IFF", type: "operator"};
        case "(":
            return {content: "(", type: "bracket"};
        case ")":
            return {content: ")", type: "bracket"};            
        case (char.match(/[A-Z]/) || {}).input: 
            return {content: char, type: "variable"};
        default:
            return null;
    }
}

module.exports = {
    tokenize
}
