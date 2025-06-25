class Cube {
  constructor() {
    this.reset();
  }

  reset() {
    this.faces = {
      U: Array(9).fill('w'), // White
      R: Array(9).fill('r'), // Red
      F: Array(9).fill('g'), // Green
      D: Array(9).fill('y'), // Yellow
      L: Array(9).fill('o'), // Orange
      B: Array(9).fill('b'), // Blue
    };
    this.history = [];
  }

  getStateString() {
    return (
      this.faces.U.join('') +
      this.faces.R.join('') +
      this.faces.F.join('') +
      this.faces.D.join('') +
      this.faces.L.join('') +
      this.faces.B.join('')
    );
  }

  rotateFaceClockwise(face) {
    return [
      face[6], face[3], face[0],
      face[7], face[4], face[1],
      face[8], face[5], face[2],
    ];
  }

  rotate(face) {
    if (!this.faces[face]) return;
    this.faces[face] = this.rotateFaceClockwise(this.faces[face]);
    this.history.push(face);
  }

  scramble() {
  const colors = ['w', 'r', 'g', 'y', 'o', 'b'];
  for (let face in this.faces) {
    this.faces[face] = Array(9).fill(null).map(() =>
      colors[Math.floor(Math.random() * colors.length)]
    );
  }
  this.history = []; // Reset previous history
}


 solve() {
  this.faces = {
    U: Array(9).fill('w'),
    R: Array(9).fill('r'),
    F: Array(9).fill('g'),
    D: Array(9).fill('y'),
    L: Array(9).fill('o'),
    B: Array(9).fill('b'),
  };
  this.history = [];
}
}

// ========== DOM ==========
const cube = new Cube();

function renderCube() {
  const cubeString = cube.getStateString();
  document.getElementById("cube-display").innerHTML = getCubeSvg(cubeString);
}

// Bind buttons safely after DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("scramble-btn").addEventListener("click", () => {
    cube.scramble();
    renderCube();
  });

  document.getElementById("solve-btn").addEventListener("click", () => {
    cube.solve();
    renderCube();
  });

  renderCube(); // show cube initially
});
