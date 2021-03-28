@namespace
class SpriteKind:
    Wall = SpriteKind.create()

def manageOverlap(player2: Sprite, wall: Sprite):
    global Comments
    Comments = "Overlap analysis BOTTOM - RIGHT corner"
    if player2.bottom > wall.bottom and player2.right > wall.right:
        wall.z = depthBack
        if player2.bottom - wall.bottom < 5:
            player2.bottom = wall.bottom + 5
            player2.left = wall.right + 0
    Comments = "Overlap analysis BOTTOM - LEFT corner"
    if player2.bottom > wall.bottom and player2.right < wall.right:
        wall.z = depthBack
        if player2.bottom - wall.bottom < 5:
            player2.bottom = wall.bottom + 5
            player2.right = wall.left + 0
    Comments = "Overlap analysis BOTTOM side"
    if player2.bottom > wall.bottom and player2.right == wall.right:
        wall.z = depthBack
        if player2.bottom - wall.bottom < 5:
            player2.bottom = wall.bottom + 5
    Comments = "Overlap analysis TOP - LEFT corner"
    if player2.bottom < wall.bottom and player2.right < wall.right:
        wall.z = depthFront
        if player2.bottom - wall.bottom < 10:
            player2.y += 0
    Comments = "Overlap analysis TOP - RIGHT corner"
    if player2.bottom < wall.bottom and player2.right > wall.right:
        wall.z = depthFront
        if player2.bottom - wall.bottom < 10:
            player2.bottom = wall.bottom - 10
    Comments = "Overlap analysis TOP side"
    if player2.bottom < wall.bottom and player2.right == wall.right:
        wall.z = depthFront
        if player2.bottom - wall.bottom < 10:
            player2.bottom = wall.bottom - 10

def on_up_pressed():
    animation.run_image_animation(player1,
        assets.animation("""
            player-1-back
        """),
        200,
        True)
controller.up.on_event(ControllerButtonEvent.PRESSED, on_up_pressed)

def on_button_released():
    animation.stop_animation(animation.AnimationTypes.ALL, player1)
controller.any_button.on_event(ControllerButtonEvent.RELEASED, on_button_released)

def on_left_pressed():
    animation.run_image_animation(player1,
        assets.animation("""
            player-1-left-side
        """),
        200,
        True)
controller.left.on_event(ControllerButtonEvent.PRESSED, on_left_pressed)

def on_on_overlap(sprite, otherSprite):
    manageOverlap(sprite, otherSprite)
sprites.on_overlap(SpriteKind.player, SpriteKind.Wall, on_on_overlap)

def on_right_pressed():
    animation.run_image_animation(player1,
        assets.animation("""
            player-1-right-side
        """),
        200,
        True)
controller.right.on_event(ControllerButtonEvent.PRESSED, on_right_pressed)

def defineTimeMap():
    global wallXLocations, wallYLocations
    wallXLocations = [0,
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
        14]
    wallYLocations = [0,
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
        14]

def on_down_pressed():
    animation.run_image_animation(player1,
        assets.animation("""
            player-1-front
        """),
        200,
        True)
controller.down.on_event(ControllerButtonEvent.PRESSED, on_down_pressed)

def manageBorders(object: Sprite):
    global Comments
    Comments = "RIGHT side TileMap"
    if object.x >= 220:
        object.set_position(218, object.y)
        return True
    Comments = "LEFT side TileMap"
    if object.x <= 23:
        object.set_position(26, object.y)
        return True
    Comments = "TOP side TileMap"
    if object.y <= 16:
        object.set_position(object.x, 18)
        return True
    Comments = "BOTTOM side TileMap"
    if object.y >= 221:
        object.set_position(object.x, 218)
        object.z = depthBack
        return True
    object.z = depthMiddle
    return False
def createTileMap():
    wallList: List[Sprite] = []
    index = 0
    while index <= len(wallYLocations) - 1:
        wallList[index] = sprites.create(assets.tile("""
            wall
        """), SpriteKind.Wall)
        index += 1
    index2 = 0
    while index2 <= len(wallList):
        tiles.place_on_tile(wallList[index2],
            tiles.get_tile_location(wallXLocations[index2], wallYLocations[index2]))
        index2 += 1
wallYLocations: List[number] = []
wallXLocations: List[number] = []
Comments = ""
depthFront = 0
depthMiddle = 0
depthBack = 0
player1: Sprite = None
tiles.set_tilemap(tilemap("""
    level-1
"""))
player1 = sprites.create(img("""
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
    """),
    SpriteKind.player)
player1.z = 100
tiles.place_on_tile(player1, tiles.get_tile_location(3, 3))
controller.move_sprite(player1)
scene.camera_follow_sprite(player1)
depthBack = 80
depthMiddle = 100
depthFront = 120
player1.z = depthMiddle
defineTimeMap()
createTileMap()

def on_on_update():
    pass
game.on_update(on_on_update)
