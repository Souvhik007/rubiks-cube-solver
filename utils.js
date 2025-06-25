function getCubeSvg(cubeString) {
  const colors = {
    r: 'red',
    g: 'green',
    b: 'blue',
    y: 'yellow',
    o: 'orange',
    w: 'white',
  };

  let html = '<div style="display:grid;grid-template-columns:repeat(9, 30px);gap:2px;">';

  for (const char of cubeString) {
    html += `<div style="width:30px;height:30px;background:${colors[char]};border:1px solid #000;"></div>`;
  }

  html += '</div>';
  return html;
}
