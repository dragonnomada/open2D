const Model2D = require("./Model2D")

class Logic2D extends Model2D {

    bind = {
        item2D: null
    }

    context = {
        success: true
    }

    constructor(config) {
        super(config)
    }

    setItem2D(item2D) {
        this.bind.item2D = item2D
        item2D.logic2D = this
    }

    async next() {
        const action = new Function("context", `
            ${this.logic}
        `)(this.context)
        this.context.success = await this.bind.item2D.action(action)
    }

}

Logic2D.new = config => new Logic2D(config)

module.exports = Logic2D