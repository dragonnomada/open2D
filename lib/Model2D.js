class Model2D {
    constructor(config) {
        for (let [key, value] of Object.entries(config)) {
            this[key] = value
        }
    }
    toString() {
        return `[${this.type}]`
    }
    describe() {
        console.log(this.toString())
    }
}

module.exports = Model2D