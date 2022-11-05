const Model2D = require("./Model2D")

class Logic2D extends Model2D {

    constructor(config) {
        super(config)
    }

}

Logic2D.new = config => new Logic2D(config)

module.exports = Logic2D