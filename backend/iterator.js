class Iterator {
    constructor(iterable) {
        this.iterable = iterable;
        this.index = -1
    }

    peek(count = 1) {
        if(this.index + count < this.iterable.length) {
            return { 
                element: this.iterable[this.index + count], 
                done: false,
                index: this.index + count 
            };
        } else {
            return {
                done: true,
                index: this.index
            };
        }
    }

    consume(count = 1) {
        this.index += count;

        if(this.index < this.iterable.length) {
            return {
                element: this.iterable[this.index],
                done: false,
                index: this.index
            };
        } else {
            return {
                done: true,
                index: this.index
            }
        }
    }
}

exports.iterator = function(tokens){
    return new Iterator(tokens);
}