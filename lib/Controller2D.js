const Model2D = require("./Model2D")

class Controller2D extends Model2D {
    constructor(config) {
        super(config)
        // 
    }
}

Controller2D.new = async config => new Controller2D(config)

module.exports = Controller2D