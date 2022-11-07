const Model2D = require("./Model2D")

class Item2D extends Model2D {
    
    matrix2D = null
    index2D = null

    logic2D = null
    controller2D = null
    
    state = null
    
    constructor(config) {
        super(config)
        // 
    }

    setController2D(controller2D) {
        this.controller2D = controller2D
        controller2D.item2D = this
    }

    toString() {
        return this.symbols.find(({ state }) => state === this.state).symbol
    }
    
    putState(state) {
        this.state = state
    }

    async action(name) {
        return await this.controller2D.runAction(name)
    }

}

Item2D.new = config => new Item2D(config)

Item2D.empty = () => Item2D.new({
    name: "EMPTY",
    symbols: [
        {
            state: null,
            symbol: " . "
        }
    ]
})

module.exports = Item2D