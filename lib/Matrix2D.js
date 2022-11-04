const Model2D = require("./Model2D")

class Matrix2D extends Model2D {
    
    matrix2D = []
    
    constructor(config) {
        super(config)
        for (let i = 0; i < this.rows; i++) {
            const vector2D = []
            for (let j = 0; j < this.columns; j++) {
                vector2D.push(0)
            }
            this.matrix2D.push(vector2D)
        }
    }

    addItem2D(item2D, index2D) {
        this.matrix2D[index2D.row][index2D.column] = item2D
        item2D.matrix2D = this
    }

    print2D() {
        console.log(`+${"---".repeat(this.rows)}+`)
        let row = 0
        for (let vector2D of this.matrix2D) {
            console.log(vector2D.map((item, column) => `${column === 0 ? '|' : ''}${item || '   '}${column + 1 === this.columns ? '|' : ''}`).join(''))
            row++
        }
        console.log(`+${"---".repeat(this.rows)}+`)
    }

}

Matrix2D.new = async config => new Matrix2D(config)

module.exports = Matrix2D