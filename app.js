let symbolSize = 20;
let streams = [];
let symbol;
function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  background(0);
  stream = new Stream();
  stream.generateSymbols();
  let x = 0;

  for (let i = 0; i < width / symbolSize; i++) {
    let stream = new Stream();
    stream.generateSymbols(x, random(-1000, 0));
    streams.push(stream);
    x += symbolSize;
  }
  textSize(symbolSize);
}

function draw() {
  background(0, 100);
  streams.forEach((stream) => {
    stream.render();
  });
}

class Symbol2 {
  constructor(x, y, speed, first) {
    this.x = x;
    this.y = y;
    this.value = null;
    this.speed = speed;
    this.switchInterval = round(random(2, 20));
    this.first = first;
  }
  setToRandomSymbol = () => {
    if (frameCount % this.switchInterval == 0) {
      this.value = String.fromCharCode(0x30a0 + round(random(0, 96)));
    }
  };

  rain = () => {
    if (this.y >= height) {
      this.y = 0;
    } else {
      this.y += this.speed;
    }
  };
}

class Stream {
  constructor() {
    this.symbols = [];
    this.totalSymbols = round(random(5, 30));
    this.speed = random(5, 10);
  }

  generateSymbols = (x, y) => {
    let first = true;
    for (let i = 0; i < this.totalSymbols; i++) {
      symbol = new Symbol2(x, y, this.speed, first);
      symbol.setToRandomSymbol();
      this.symbols.push(symbol);
      y -= symbolSize;
      first = false;
    }
  };

  render = () => {
    this.symbols.forEach((symbol) => {
      if (symbol.first) {
        fill(180, 255, 180);
      } else {
        fill(0, 255, 70);
      }

      text(symbol.value, symbol.x, symbol.y);
      symbol.rain();
      symbol.setToRandomSymbol();
    });
  };
}
