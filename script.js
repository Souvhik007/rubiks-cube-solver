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

  scramble(times = 20) {
    const faces = ['U', 'R', 'F', 'D', 'L', 'B'];
    for (let i = 0; i < times; i++) {
      const move = faces[Math.floor(Math.random() * faces.length)];
      this.rotate(move); // Adds move to history
    }
  }

  solveAnimated(callback = () => {}) {
    const interval = setInterval(() => {
      if (this.history.length === 0) {
        clearInterval(interval);
        callback();
        return;
      }
      const move = this.history.pop();
      for (let i = 0; i < 3; i++) this.rotate(move); // 3x = reverse
      renderCube();
    }, 300); // Animation speed
  }
}

// ========== DOM ==========

const cube = new Cube();

function renderCube() {
  const cubeString = cube.getStateString();
  document.getElementById("cube-display").innerHTML = getCubeSvg(cubeString);
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("scramble-btn").addEventListener("click", () => {
    cube.scramble();
    renderCube();
  });

  document.getElementById("solve-btn").addEventListener("click", () => {
    cube.solveAnimated();
  });

  renderCube(); // Render solved cube on load
});
