const load = require("./lib/loader")

async function main() {
    const scene = await load("drafts/scene.yaml")
    scene.describe()
    
    await scene.create()
    scene.log()

    await scene.run()
}

main().catch(error => console.log(`${error}`))