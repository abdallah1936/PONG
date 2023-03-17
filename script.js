const canves = document.getElementById("game")
const ctx = canves.getContext("2d")
canves.width = 650;
canves.height = 400;

let scoreOne = 0
let scoreTwo = 0

class Element{
    constructor(options){
        this.x = options.x
        this.y = options.y
        this.width = options.width
        this.height = options.height
        this.color = options.color
        this.speed = options.x || 2;
        this.gravity = options.x
    }
}

const playerOne = new Element({
    x:10,
    y:200,
    width:15,
    height:80,
    color: "#fff",
    gravity:2,
})
// second paddle 
const playerTwo = new Element({
    x:650,
    y:200,
    width:15,
    height:80,
    color: "#fff",
    gravity:2,
})
// ball
const ball = new Element({
    x:650/2,
    y:400/2,
    width:15,
    height:15,
    color: "white",
    speed: 1,
    gravity: 1,
})

