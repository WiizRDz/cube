class Box {
  constructor(x,y,z,w) {
      this.x = x * w
      this.y = y * w
      this.z = z * w
      this.width = w
      this.shrink = 20
  }
  height(f) {
    return 30
  }

  render(f) {
    push()
      rotateX(spin.x)
      rotateY(spin.y)
      translate(this.x, this.y, this.z)
      box(this.width-this.shrink, this.width-this.shrink, this.width-this.shrink)
    pop()
  }
}

class Char {
  constructor(x, y, z, w) {
    this.x = x
    this.y = y
    this.z = z
    this.w = w
  }

  drawChar() {
    push()
      rotateX(spin.x)
      rotateY(spin.y)
      //fill(200, [0.4])
      translate(this.x, this.y, this.z)
      box(this.w)
    pop()
  }

  moveChar(w,a,s,d) {
    if (s) {
      this.y += boxwidth
    } else if (w) {
      this.y -= boxwidth
    } else if (d) {
      this.z += boxwidth
    } else if (a) {
      this.z -= boxwidth
    }
  }
}

const boxes = []
let speed
let pointColor = "#FFDDAA" //consider FFFFFF
let ambientColor = "#2A54A2"
let materialColor = "#E0E0B6"
let spin = {}
let autospin
let zoom = 500

const boxwidth = 100
const cubecount = 2

let c

let hollow = false

function setup() {
  let cnv = createCanvas(window.innerWidth < window.innerHeight ? window.innerWidth : window.innerHeight, window.innerWidth < window.innerHeight ? window.innerWidth : window.innerHeight, WEBGL)
  ortho(-zoom,zoom,-zoom,zoom,-2000,2000,0,1000)
  noStroke()
  
  for (let z = -cubecount; z <= cubecount; z++) {
    for (let y = -cubecount; y <= cubecount; y++) {
      for (let x = -cubecount; x <= cubecount; x++) {
        if (hollow ? (x != 0 && y != 0) || (y != 0 && z != 0) || (x != 0 && z != 0) : true) {
          let b = new Box(x, y, z, boxwidth)
          boxes.push(b)
        }
      }
    }
  }

  speed = 5//createSlider(1.5,12,5,0.001)
  //pointColor = document.getElementById("pointColor")
  //ambientColor = document.getElementById("ambientColor")
  //materialColor = document.getElementById("materialColor")

  spin.x = -PI/4
  spin.y = PI/4

  c = new Char(-cubecount*boxwidth - 3*boxwidth/4, -cubecount*boxwidth, -cubecount*boxwidth, boxwidth/2)
}

function draw() {
  background(color("#F0F0F0"))
  pointLight(color(pointColor),800,-100,200)
  ambientLight(color(ambientColor))
  ambientMaterial(color(materialColor))
  let f = frameCount/sq(speed)
  for (let b of boxes) {
    b.render(f)
  }
  //spin.y += 0.008
  pointLight(color("#FFFFFF"),800,-100,200)
  c.drawChar()
}

function keyPressed() {
  if (keyCode === 87) {
    c.moveChar(true, false, false, false)
  } else if (keyCode === 83) {
    c.moveChar(false, false, true, false)
  } else if (keyCode === 65) {
    c.moveChar(false, true, false, false)
  } else if (keyCode === 68) {
    c.moveChar(false, false, false, true)
  }
}

function mouseDragged() {
  spin.y = (spin.y + (TAU * (mouseX - pmouseX)/width)) % TAU
  spin.x = (spin.x - (TAU * (mouseY - pmouseY)/height)) % TAU
}
