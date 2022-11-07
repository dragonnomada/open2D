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

        for (let { name: agentName } of this.agents) {
            console.log({ agentName })
            const logic = this.scene2D.instances[agentName]
            console.log({ logic })
            newObjects.push({
                name: logic.as,
                source: logic.item2D
            })
            newObjects.push({
                name: `${logic.as}_controller`,
                source: logic.controller2D
            })
            await this.scene2D.createObjects(newObjects)
            await this.scene2D.runStages([
                {
                    object: agentName,
                    call: "setItem2D",
                    with: [
                        {
                            type: "object",
                            name: logic.as
                        }
                    ]
                },
                {
                    object: logic.as,
                    call: "putState",
                    with: [
                        {
                            type: "payload",
                            data: logic.state
                        }
                    ]
                },
                {
                    object: logic.as,
                    call: "setController2D",
                    with: [
                        {
                            type: "object",
                            name: `${logic.as}_controller`
                        }
                    ]
                },
                {
                    object: this.world.name,
                    call: "addItem2D",
                    with: [
                        {
                            type: "object",
                            name: logic.as
                        },
                        {
                            type: "payload",
                            data: logic.index2D
                        }
                    ]
                }
            ])
            // await this.scene2D.runStages([
            //     {
            //         object: this.world.name,
            //         call: "print2D"
            //     }
            // ])
        }

    }

    async loop() {
        while (true) {
            for (let { name: agentName } of this.agents) {
                await this.scene2D.runStages([
                    {
                        object: agentName,
                        call: "next"
                    }
                ])
            }
            await this.scene2D.runStages([
                {
                    pipeline: "PRINT_WORLD",
                    delay: 100
                }
            ])
        }
    }

}

Game2D.new = config => new Game2D(config)

module.exports = Game2D