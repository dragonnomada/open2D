const Model2D = require("./Model2D")

class Item2D extends Model2D {
    controller = null
    constructor(config) {
        super(config)
        // 
    }

    addController(controller) {
        this.controller = controller
    }
}

Item2D.new = async config => new Item2D(config)

module.exports = Item2D