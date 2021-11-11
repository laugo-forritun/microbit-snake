let score = 0
let speed = 1
let snake_y = 2
let snake_x = 2
let candy_x = -1
let candy_y = -1
let FPS = 1
let wall_right = 4
let wall_left = 0
let wall_ceiling = 0
let wall_floor = 4
let tail_x = [snake_x]
let tail_y = [snake_y]

function lengthen_tail () {
    tail_x.push(-1)
    tail_y.push(-1)
}
function move () {
    if (tail_x.length > 0) {
        for (let i = tail_y.length - 1; i > 0; i--) {
            tail_y[i] = tail_y[i - 1]
            tail_x[i] = tail_x[i - 1]
        }
        tail_y[0] = snake_y
        tail_x[0] = snake_x
    }
    if (Math.abs(input.acceleration(Dimension.X)) > Math.abs(input.acceleration(Dimension.Y))) {
        if (input.acceleration(Dimension.X) > 0) {
            snake_x += speed
        } else {
            snake_x += 0 - speed
        }
    } else if (input.acceleration(Dimension.Y) > 0) {
        snake_y += speed
    } else {
        snake_y += 0 - speed
    }
}
function draw () {
    basic.clearScreen()
    led.plot(snake_x, snake_y)
    led.plotBrightness(candy_x, candy_y, 128)
    for (let index3 = 0; index3 <= tail_x.length; index3++) {
        led.plot(tail_x[index3], tail_y[index3])
    }
    basic.pause(1000 / FPS)
}
function deyja () {
    game.setScore(score)
    game.gameOver()
}
function wall_collision () {
    if (snake_x < wall_left) {
        deyja()
    } else if (snake_x > wall_right) {
        deyja()
    } else if (snake_y < wall_ceiling) {
        deyja()
    } else if (snake_y > wall_floor) {
        deyja()
    }
}
function eat_food () {
    if (candy_x == snake_x && snake_y == candy_y) {
        score += 1
        candy_x = -1
        candy_y = -1
        lengthen_tail()
    }
}
function spawn_food () {
    if (candy_x < 0) {
        candy_x = randint(0, 4)
        candy_y = randint(0, 4)
    }
}
basic.forever(function () {
    move()
    wall_collision()
    eat_food()
    spawn_food()
    draw()
})

