const fs = require("fs/promises")

const { join } = require("path")

const yaml = require("yaml")

const lib = require("./index")

module.exports = async source => {
    const path = join(process.cwd(), source)

    const spec = await fs.readFile(path, "utf-8")

    const config = yaml.parse(spec)

    const obj = await lib[config.type](config)
    
    return obj
}