const loader = require("./loader")

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
    async load(source) {
        return await loader(source)
    }
}

module.exports = Model2D