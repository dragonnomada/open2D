const load = require("./lib/loader")

async function main() {
    const scene = await load("drafts/scene.yaml")
    scene.log()
    scene.describe()
}

main().catch(error => console.log(`${error}`))