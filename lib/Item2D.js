const Model2D = require("./Model2D")

class Item2D extends Model2D {
    
    matrix2D = null
    controller2D = null
    state = null
    
    constructor(config) {
        super(config)
        // 
    }

    addController2D(controller2D) {
        this.controller2D = controller2D
    }

    toString() {
        return this.symbols.find(({ state }) => state === this.state).symbol
    }

}

Item2D.new = async config => new Item2D(config)

module.exports = Item2D