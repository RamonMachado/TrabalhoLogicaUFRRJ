class SyntaxError extends Error {
    constructor(message) {
        super('Erro de sintaxe - ' + message);
        this.name = this.constructor.name;
        this.status = 422;
    }
    statusCode() {
        return this.status;
    }
}

module.exports = SyntaxError;