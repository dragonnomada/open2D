const Model2D = require("./Model2D")

class Scene2D extends Model2D {
    
    instances = {}

    constructor(config) {
        super(config)
        // 
    }

    async create() {
        for (let object of this.objects) {
            this.instances[object.name] = await this.load(object.source)
        }
    }

    async run() {
        for (let proc of this.process) {
            const instance = proc.object === "this" ? this : this.instances[proc.object]
            const params = []
            if (proc.with) {
                for (let param of proc.with) {
                    switch (param.type) {
                        case "object":
                            params.push(this.instances[param.name])
                            break
                        case "payload":
                            params.push(param.data)
                            break
                    }
                }
            }
            await instance[proc.call](...params)
        }
    }

    async pause(timeout) {
        console.log(`Waiting for ${timeout} ms...`)
        await new Promise(resolve => setTimeout(resolve, timeout))
    }

}

Scene2D.new = async config => new Scene2D(config)

module.exports = Scene2D