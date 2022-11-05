const Model2D = require("./Model2D")

class Game2D extends Model2D {

    scene2D = null

    constructor(config) {
        super(config)
    }

    async setScene2D(scene2D) {
        this.scene2D = scene2D
        
        await this.scene2D.createObjects([
            this.world
        ])
        
        await this.scene2D.createObjects(this.agents)
        
        const newObjects = []

        for (let logic of this.agents.map(({ name }) => this.scene2D.instances[name])) {
            newObjects.push({
                name: logic.name,
                source: logic.item2D
            })
            newObjects.push({
                name: `${logic.name}_controller`,
                source: logic.controller2D
            })
            await this.scene2D.createObjects(newObjects)
            await this.scene2D.runStages([
                {
                    object: logic.name,
                    call: "putState",
                    with: [
                        {
                            type: "payload",
                            data: logic.state
                        }
                    ]
                },
                {
                    object: logic.name,
                    call: "setController2D",
                    with: [
                        {
                            type: "object",
                            name: `${logic.name}_controller`
                        }
                    ]
                },
                {
                    object: this.world.name,
                    call: "addItem2D",
                    with: [
                        {
                            type: "object",
                            name: logic.name
                        },
                        {
                            type: "payload",
                            data: logic.index2D
                        }
                    ]
                }
            ])
            await this.scene2D.runStages([
                {
                    object: this.world.name,
                    call: "print2D"
                }
            ])
        }

    }

}

Game2D.new = config => new Game2D(config)

module.exports = Game2D