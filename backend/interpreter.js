function evaluate(values, node){
    if(node.type == "BINOPS"){
        switch(node.op){
            case 'TK_AND': return evaluate(values, node.lhs) && evaluate(values, node.rhs);
            case 'TK_OR': return evaluate(values, node.lhs) || evaluate(values, node.rhs);
        } 
    }
    else{
        return getUnaryValue(values, node);
    }

}

function getUnaryValue(values, node){
    if(node.not){
        return !values[node.unary];
    }
    else{
        return values[node.unary];
    }
}

module.exports = {
    evaluate
}