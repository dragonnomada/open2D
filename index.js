const load = require("./lib/loader")

async function main() {
    const world = await load("drafts/world.yaml")
    console.log(world)
    world.describe()
    
    const player = await load("drafts/player.yaml")
    console.log(player)
    player.describe()
    
    const player_controller = await load("drafts/player_controller.yaml")
    console.log(player_controller)
    player_controller.describe()
}

main().catch(error => console.log(`${error}`))