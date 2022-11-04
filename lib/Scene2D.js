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
            const instance = this.instances[proc.object]
            await instance[proc.call]()
        }
    }
}

Scene2D.new = async config => new Scene2D(config)

module.exports = Scene2D