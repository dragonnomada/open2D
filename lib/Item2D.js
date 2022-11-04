const Model2D = require("./Model2D")

class Item2D extends Model2D {
    constructor(config) {
        super(config)
        // 
    }
}

module.exports = async config => new Item2D(config)