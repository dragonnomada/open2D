const Model2D = require("./Model2D")

class Controller2D extends Model2D {
    constructor(config) {
        super(config)
        // 
    }
}

module.exports = async config => new Controller2D(config)