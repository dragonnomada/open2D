const fs = require("fs/promises")

const { join } = require("path")

const yaml = require("yaml")

const Matrix2D = require("./Matrix2D")
const Item2D = require("./Item2D")
const Controller2D = require("./Controller2D")

const lib = {
    Matrix2D,
    Item2D,
    Controller2D,
    async load(source) {
        const path = join(process.cwd(), source)

        const spec = await fs.readFile(path, "utf-8")

        const config = yaml.parse(spec)
    
        const obj = await lib[config.type](config)
        
        return obj
    }
}

module.exports = lib