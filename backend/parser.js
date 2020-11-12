function parse(iter) { 
    try {
        return parse_binops(iter);
    } catch(err) {
        console.log(err);
        return parse_unary(iter);
    }
}

function parse_primary(iter) {
    const next = iter.peek();

    if(!next.done && next.element.token === 'TK_SYMBOL') {
        iter.consume();
        return {
            type: 'UNARY',
            not: false,
            unary: next.element.literal
        }
    }

    if(!next.done && next.element.token === '(') {
        iter.consume();
        const binops = parse_binops(iter);

        const maybeClosedBracket = iter.peek();
        if(maybeClosedBracket.done || maybeClosedBracket.element.token !== ')') {
            throw "primary falhou";
        }

        return binops;
    }

    throw "primary falhou";
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

    if(!next.done && (next.element.token === 'TK_AND' || next.element.token === 'TK_OR' || next.element.token === 'TK_IMPLIES' || next.element.token === 'TK_IFF')) {
        iter.consume();
        return {
            type: 'BINOPS',
            lhs: unary,
            rhs: parse_binops(iter),
            op: next.element.token
        }
    }

    return unary;
}

module.exports = {
    parse
}