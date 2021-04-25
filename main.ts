namespace SpriteKind {
    export const Wall = SpriteKind.create()
    export const Bomb = SpriteKind.create()
}
function manageOverlap (player2: Sprite, wall: Sprite) {
    Comments = "Overlap analysis BOTTOM - RIGHT corner"
    if (player2.bottom > wall.bottom && player2.right > wall.right) {
        wall.z = depthBack
        if (player2.bottom - wall.bottom < 5) {
            player2.bottom = wall.bottom + 5
            player2.x += 1
        }
    }
    Comments = "Overlap analysis BOTTOM - LEFT corner"
    if (player2.bottom > wall.bottom && player2.right < wall.right) {
        wall.z = depthBack
        if (player2.bottom - wall.bottom < 5) {
            player2.bottom = wall.bottom + 5
            player2.x += -1
        }
    }
    Comments = "Overlap analysis BOTTOM side"
    if (player2.bottom > wall.bottom && player2.right == wall.right) {
        wall.z = depthBack
        if (player2.bottom - wall.bottom < 5) {
            player2.bottom = wall.bottom + 5
        }
    }
    Comments = "Overlap analysis TOP - LEFT corner"
    if (player2.bottom < wall.bottom && player2.right < wall.right) {
        wall.z = depthFront
        if (player2.bottom - wall.bottom < widthWall && controller.down.isPressed()) {
            player2.bottom = wall.bottom - widthWall
            player2.x += -1
        } else {
            if (player2.bottom - wall.bottom < widthWall && controller.right.isPressed()) {
                player2.bottom = wall.bottom - widthWall
            }
        }
    }
    Comments = "Overlap analysis TOP - RIGHT corner"
    if (player2.bottom < wall.bottom && player2.right > wall.right) {
        wall.z = depthFront
        if (player2.bottom - wall.bottom < widthWall && controller.down.isPressed()) {
            player2.bottom = wall.bottom - widthWall
            player2.x += 1
        } else {
            if (player2.bottom - wall.bottom < widthWall && controller.left.isPressed()) {
                player2.bottom = wall.bottom - widthWall
            }
        }
    }
    Comments = "Overlap analysis TOP side"
    if (player2.bottom < wall.bottom && player2.right == wall.right) {
        wall.z = depthFront
        if (player2.bottom - wall.bottom < widthWall && controller.down.isPressed()) {
            player2.bottom = wall.bottom - widthWall
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
function defineTileMapBorder () {
    borderXLocations = [
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
    borderYLocations = [
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
    5,
    5,
    6,
    6,
    7,
    7,
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
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    bomb = sprites.create(assets.image`floor02`, SpriteKind.Bomb)
    bomb.setPosition(player1.x, player1.y)
    animation.runImageAnimation(
    bomb,
    assets.animation`bomb`,
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
    if (manageBorders(sprite) == false) {
        manageOverlap(sprite, otherSprite)
    }
})
function createTileMapBorder () {
    let borderList: Sprite[] = []
    indexBorder = 0
    indexTempBorder = 0
    while (indexBorder <= borderYLocations.length - 1) {
        borderList[indexBorder] = sprites.create(assets.tile`wall`, SpriteKind.Wall)
        indexBorder += 1
    }
    while (indexTempBorder <= borderList.length) {
        tiles.placeOnTile(borderList[indexTempBorder], tiles.getTileLocation(borderXLocations[indexTempBorder], borderYLocations[indexTempBorder]))
        indexTempBorder += 1
    }
}
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    player1,
    assets.animation`player-1-right-side`,
    200,
    true
    )
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    player1,
    assets.animation`player-1-front`,
    200,
    true
    )
})
function manageBorders (object: Sprite) {
    Comments = "RIGHT side TileMap"
    if (object.x >= 220) {
        object.setPosition(218, object.y)
        return true
    }
    Comments = "LEFT side TileMap"
    if (object.x <= 23) {
        object.setPosition(26, object.y)
        return true
    }
    Comments = "TOP side TileMap"
    if (object.y <= 16) {
        object.setPosition(object.x, 18)
        return true
    }
    Comments = "BOTTOM side TileMap"
    if (object.y >= 221) {
        object.setPosition(object.x, 218)
        object.z = depthBack
        return true
    }
    object.z = depthMiddle
    return false
}
function createTileMap () {
    let wallList: Sprite[] = []
    indexTileMap = 0
    columnsTileMap = 5
    rowsTileMap = 6
    while (indexTileMap <= 29) {
        wallList[indexTileMap] = sprites.create(assets.tile`wall`, SpriteKind.Wall)
        indexTileMap += 1
    }
    for (let i = 0; i <= columnsTileMap - 1; i++) {
        for (let j = 0; j <= rowsTileMap - 1; j++) {
            wallList[i * rowsTileMap + j].setPosition(i * 35 + 50, j * 30 + 42)
        }
    }
}
let rowsTileMap = 0
let columnsTileMap = 0
let indexTileMap = 0
let indexTempBorder = 0
let indexBorder = 0
let bomb: Sprite = null
let borderYLocations: number[] = []
let borderXLocations: number[] = []
let Comments = ""
let widthWall = 0
let depthFront = 0
let depthMiddle = 0
let depthBack = 0
let player1: Sprite = null
tiles.setTilemap(tilemap`level-1`)
player1 = sprites.create(assets.image`player1-start`, SpriteKind.Player)
player1.z = 100
player1.setPosition(16, 16)
controller.moveSprite(player1)
scene.cameraFollowSprite(player1)
depthBack = 80
depthMiddle = 100
depthFront = 120
widthWall = 12
player1.z = depthMiddle
defineTileMapBorder()
createTileMapBorder()
createTileMap()
