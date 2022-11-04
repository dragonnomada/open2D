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
        await this.runStages(this.stages)
    }

    replaceDeep(obj, context) {
        if (obj instanceof Array) {
            for (let item of obj) {
                if (item) {
                    if (typeof item === "object") {
                        this.replaceDeep(item, context)
                    }
                }
            }
            return
        }
        for (let [key, value] of Object.entries(obj)) {
            if (value) {
                if (typeof value === "string") {
                    if (/\$[\w\_]+$/.test(value)) {
                        if (context[value.slice(1)]) {
                            obj[key] = context[value.slice(1)]
                        }
                    }
                } else if (typeof value === "object") {
                    this.replaceDeep(value, context)
                }
            }
        }
    }

    replace(context) {
        return stage => {
            this.replaceDeep(stage, context)
            return stage
        }
    }

    async runStages(stages) {
        for (let stage of stages) {
            if (stage.pipeline) {
                const pipeline = this.pipelines.find(({ name }) => name === stage.pipeline)
                const newStages = pipeline.stages.map(this.replace(stage))
                await this.runStages(newStages)
                continue
            }
            const instance = stage.object === "this" ? this : this.instances[stage.object]
            const params = []
            if (stage.with) {
                for (let param of stage.with) {
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
            await instance[stage.call](...params)
        }
    }

    async pause(timeout) {
        console.log(`Waiting for ${timeout} ms...`)
        await new Promise(resolve => setTimeout(resolve, timeout))
    }

}

Scene2D.new = async config => new Scene2D(config)

module.exports = Scene2D