function evaluate(values, node){
    if(node.type == "BINOPS"){
        let left = evaluate(values, node.lhs);
        let right = evaluate(values, node.rhs);
        switch(node.op){
            case 'TK_AND': return left && right;
            case 'TK_OR': return left || right;
            case 'TK_IMPLIES': 
                if(left && !right){
                    return false;
                }
                else{
                    return true;
                }
            case 'TK_IFF':
                return !((left || right) && !(left && right));
        } 
    }
    else{
        return getUnaryValue(values, node);
    }

}

function getUnaryValue(values, node){
    if(typeof(node.unary) == "string"){
        if(node.not){
            return !values[node.unary];
        }
        else{
            return values[node.unary];
        }
    }
    else{ 
        if(node.not){
            return !evaluate(values, node.unary);
        }
        else{
            return evaluate(values, node.unary);
        }
    }
    
}

module.exports = {
    evaluate
}