const SyntaxError = require('./Errors/syntaxError.js');

function parse(iter) { 
    return parse_binops(iter);
}

function parse_primary(iter) {
    const next = iter.peek();

    if(!next.done) {
        if(next.element.token === 'TK_SYMBOL') {
            iter.consume();
            return {
                type: 'UNARY',
                not: false,
                unary: next.element.literal
            }
        }
        else if (next.element.token === '(') {
            iter.consume();
            const binops = parse_binops(iter);
    
            const maybeClosedBracket = iter.peek();
            if(maybeClosedBracket.done || maybeClosedBracket.element.token !== ')') {
                throw new SyntaxError('Final inesperado. Esperava ")".');
            }
            iter.consume();
            return binops;
        } else {
            throw new SyntaxError('Caractere inválido: "' + next.element.literal + '". Esperava variável ou outra expressão.');
        }
    }
    throw new SyntaxError('Final inesperado. Expressão incompleta.')
}

function parse_unary(iter) {
    const maybeNot = iter.peek();

    if(!maybeNot.done && maybeNot.element.token === 'TK_NOT') {
        iter.consume();
        return {
            type: 'UNARY',
            not: true,
            unary: parse_unary(iter)
        }
    }

    return parse_primary(iter);
}

function parse_binops(iter) {
    const unary = parse_unary(iter);
    const next = iter.peek();

    if(!next.done) {
        if(next.element.token === 'TK_AND' || next.element.token === 'TK_OR' || next.element.token === 'TK_IMPLIES' || next.element.token === 'TK_IFF') {
            iter.consume();
            return {
                type: 'BINOPS',
                lhs: unary,
                rhs: parse_binops(iter),
                op: next.element.token
            }
        } else if(next.element.token === ')') {
            return unary;
        } else {
            throw new SyntaxError('Caractere inválido: "' + next.element.literal + '". Esperava ")", "^", "v", "->", "<->".');
        }
    }
    return unary;
}

module.exports = {
    parse
}