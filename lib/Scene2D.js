const Model2D = require("./Model2D")

class Scene2D extends Model2D {
    constructor(config) {
        super(config)
        // 
    }
}

Scene2D.new = async config => new Scene2D(config)

module.exports = Scene2D