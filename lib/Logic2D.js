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
        // console.log("NEXT", this.as, this.bind.item2D)
        const action = new Function("context", "item2D", this.as, `
            ${this.logic}
        `)(this.context, this.bind.item2D, this.bind.item2D)
        this.context.success = await this.bind.item2D.action(action)
    }

}

Logic2D.new = config => new Logic2D(config)

module.exports = Logic2D