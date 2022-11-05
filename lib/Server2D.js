const http = require("http")
const express = require("express")
const crypto = require("crypto")

const Model2D = require("./Model2D")

class Server2D extends Model2D {

    scene2D = null
    app = null
    server = null

    token = crypto.randomUUID()
    stages = []

    constructor(config) {
        super(config)
    }

    setScene2D(scene2D) {
        console.log({ scene2D })
        this.scene2D = scene2D
    }

    createApp() {
        this.app = express()

        this.app.get("/token", (_, response) => {
            response.send({
                token: this.token
            })
        })
    }

    createServer() {
        this.server = http.createServer(this.app)
    }

    start() {
        this.server.listen(this.port, () => {
            console.log(`Server started at http://localhost:${this.port}`)
        })
    }

}

Server2D.new = config => new Server2D(config)

module.exports = Server2D