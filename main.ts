namespace SpriteKind {
    export const Wall = SpriteKind.create()
}
function manageOverlap (player2: Sprite, wall: Sprite) {
    if (player2.bottom > wall.bottom) {
        if (player2.bottom - wall.bottom < 10) {
            player2.bottom = wall.bottom + 10
            wall.z = 80
        }
    } else {
        if (wall.bottom - player2.bottom < 10 && player2.right > wall.right) {
            player2.bottom = wall.bottom - 10
            wall.z = 120
            if (player2.right - wall.right < 10) {
                player2.right = wall.right + 10
            }
        } else {
            if (wall.right - player2.right < 10) {
                player2.right = wall.right - 10
            }
        }
    }
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    player1,
    assets.animation`player-1-back`,
    200,
    true
    )
})
controller.anyButton.onEvent(ControllerButtonEvent.Released, function () {
    animation.stopAnimation(animation.AnimationTypes.All, player1)
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    player1,
    assets.animation`player-1-left-side`,
    200,
    true
    )
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Wall, function (sprite, otherSprite) {
    manageBorders(sprite)
    manageOverlap(sprite, otherSprite)
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    player1,
    assets.animation`player-1-right-side`,
    200,
    true
    )
})
function defineTimeMap () {
    wallXLocations = [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    0,
    14,
    0,
    14,
    0,
    14,
    0,
    8,
    14,
    0,
    14,
    0,
    14,
    0,
    14,
    0,
    8,
    14,
    0,
    14,
    0,
    14,
    0,
    14,
    0,
    14,
    0,
    14,
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14
    ]
    wallYLocations = [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    2,
    2,
    3,
    3,
    4,
    4,
    4,
    5,
    5,
    6,
    6,
    7,
    7,
    8,
    8,
    8,
    9,
    9,
    10,
    10,
    11,
    11,
    12,
    12,
    13,
    13,
    14,
    14,
    14,
    14,
    14,
    14,
    14,
    14,
    14,
    14,
    14,
    14,
    14,
    14,
    14
    ]
}
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    player1,
    assets.animation`player-1-front`,
    200,
    true
    )
})
function manageBorders (object: Sprite) {
    if (object.x >= 220) {
        object.setPosition(218, object.y)
    }
    if (object.x <= 23) {
        object.setPosition(26, object.y)
    }
    if (object.y <= 16) {
        object.setPosition(object.x, 18)
    }
    if (object.y >= 211) {
        object.setPosition(object.x, 210)
    }
}
function createTileMap () {
    let wallList: Sprite[] = []
    for (let index = 0; index <= wallYLocations.length - 1; index++) {
        wallList[index] = sprites.create(assets.tile`wall`, SpriteKind.Wall)
    }
    for (let index2 = 0; index2 <= wallList.length; index2++) {
        tiles.placeOnTile(wallList[index2], tiles.getTileLocation(wallXLocations[index2], wallYLocations[index2]))
    }
}
let wallYLocations: number[] = []
let wallXLocations: number[] = []
let player1: Sprite = null
tiles.setTilemap(tilemap`level-1`)
player1 = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
player1.z = 100
tiles.placeOnTile(player1, tiles.getTileLocation(3, 3))
controller.moveSprite(player1)
scene.cameraFollowSprite(player1)
defineTimeMap()
createTileMap()
game.onUpdate(function () {
	
})
