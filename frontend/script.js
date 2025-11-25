async function fetchAndPlot() {
    const w1 = document.getElementById('word1').value.trim();
    const w2 = document.getElementById('word2').value.trim();
    if (!w1 || !w2) return;
  
    const res = await fetch(`/vector?word=${w1}&word=${w2}`);
    const data = await res.json();
    const vectors = data.vectors;
    const dist = data.distance;
  
    const origin = [0, 0, 0];
    const traces = Object.entries(vectors).map(([word, coords]) => ({
      type: 'scatter3d',
      mode: 'lines+markers+text',
      x: [origin[0], coords[0]],
      y: [origin[1], coords[1]],
      z: [origin[2], coords[2]],
      text: ["", word],
      textposition: 'top center',
      line: { width: 6 },
      marker: { size: 4 }
    }));
  
    Plotly.newPlot('plot', traces, {
      margin: { l: 0, r: 0, b: 0, t: 0 },
      scene: {
        xaxis: { showgrid: true, backgroundcolor: "#222" },
        yaxis: { showgrid: true, backgroundcolor: "#222" },
        zaxis: { showgrid: true, backgroundcolor: "#222" }
      }
    });
  
    document.getElementById('distance-display').textContent = `Distance between "${w1}" and "${w2}": ${dist.toFixed(3)}`;
  }