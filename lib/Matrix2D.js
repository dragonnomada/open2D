const Model2D = require("./Model2D")
const Item2D = require("./Item2D")

class Matrix2D extends Model2D {

    matrix2D = []

    constructor(config) {
        super(config)
        for (let i = 0; i < this.rows; i++) {
            const vector2D = []
            for (let j = 0; j < this.columns; j++) {
                vector2D.push(null)
            }
            this.matrix2D.push(vector2D)
        }
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                this.addItem2D(Item2D.empty(), {
                    row: i,
                    column: j
                })
            }
        }
    }

    addItem2D(item2D, index2D) {
        this.matrix2D[index2D.row][index2D.column] = item2D
        item2D.matrix2D = this
        item2D.index2D = index2D
    }

    getItem2D(index2D) {
        if (index2D.row < 0 || index2D.row >= this.rows ||
            index2D.column < 0 || index2D.column >= this.columns) return null
        return this.matrix2D[index2D.row][index2D.column]
    }

    print2D(options = { clear: true }) {
        if (options.clear) console.clear()
        let row = 0
        for (let vector2D of this.matrix2D) {
            if (row === 0) console.log(`+${"---".repeat(this.rows)}+`)
            console.log(vector2D.map((item, column) => `${column === 0 ? '|' : ''}${item || '   '}${column + 1 === this.columns ? '|' : ''}`).join(''))
            row++
            if (row === this.rows) console.log(`+${"---".repeat(this.rows)}+`)
        }
    }

}

Matrix2D.new = config => new Matrix2D(config)

module.exports = Matrix2D