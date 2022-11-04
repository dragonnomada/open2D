class Model2D {
    
    constructor(config) {
        for (let [key, value] of Object.entries(config)) {
            this[key] = value
        }
    }

    toString() {
        return `[${this.type}]`
    }

    log() {
        console.log(this)
    }

    describe() {
        console.log(this.toString())
    }

    async load(source) {
        const loader = require("./loader")
        return await loader(source)
    }
    
}

Model2D.new = async config => new Model2D(config)

module.exports = Model2D