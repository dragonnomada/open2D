const Model2D = require("./Model2D")
const Item2D = require("./Item2D")

class Controller2D extends Model2D {

    item2D = null

    constructor(config) {
        super(config)
        // 
    }

    async runAction(name) {
        for (let action of this.controllers.filter(({ action }) => action === name)) {
            for (let condition of action.conditions) {
                console.log(condition)
                if (condition.when.state) {
                    if (this.item2D.state !== condition.when.state) continue
                }
                const currentItem2D = this.item2D
                const currentIndex2D = this.item2D.index2D
                let checkItem2D = null
                let checkIndex2D = null
                if (condition.when.index) {
                    console.log(condition.when.index)
                    if (condition.when.index.row) {
                    }
                    if (condition.when.index.column) {
                        if (/\sis\s/.test(condition.when.index.column)) {
                            const [index, type] = condition.when.index.column.split(/\s+is\s+/)
                            console.log(this.item2D.index2D)
                            const column = new Function("index2D",
                                `return ${index.replace(/@/g, "index2D.")}`
                            )(this.item2D.index2D)
                            console.log(column)
                            checkIndex2D = {
                                ...this.item2D.index2D,
                                column
                            }
                            checkItem2D = this.item2D.matrix2D.getItem2D(checkIndex2D)
                            console.log(checkItem2D)
                            if (!checkItem2D) {
                                console.log(`INVALID INDEX`, checkIndex2D)
                                continue
                            }
                            if (checkItem2D.name !== type) continue
                        }
                    }
                }
                await this.next({
                    action: name,
                    condition,
                    currentItem2D: this.item2D,
                    checkItem2D,
                    index2D: this.item2D.index2D,
                    checkIndex2D
                })
            }
        }
    }

    async next({ action, condition, currentItem2D, checkItem2D, index2D }) {
        if (condition.next.index) {
            if (condition.next.index.column) {
                const column = new Function("index2D",
                    `return ${condition.next.index.column.replace(/@/g, "index2D.")}`
                )(index2D)
                const nextIndex2D = {
                    ...index2D,
                    column
                }
                console.log({ nextIndex2D })
                currentItem2D.matrix2D.addItem2D(currentItem2D, nextIndex2D)
                currentItem2D.matrix2D.addItem2D(Item2D.empty(), index2D)
            }
        }
    }

}

Controller2D.new = async config => new Controller2D(config)

module.exports = Controller2D