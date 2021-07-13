import Plotly from 'plotly.js-dist';
import DotCSV from './dotcsv.js';
import DotJSON from './dotjson.js';
import utils from './api-request.js';

function addLoader(container) {
  document.getElementById(container).innerHTML = /*html*/`
    <div class="plot has-flex has-align-items-center">
      <div class="loader plot">Loading...</div>
    </div>
  `;
}

function removeLoader(container) {
  const el = document.getElementById(container);
  el.children[0].parentNode.removeChild(el.children[0]);
}

/**
 * Renderiza una sola grafica.
 */
const plotter = async ({ dimension = 2, path, labels, container = 'plotter', options }) => {
  // Validate minimal properties
  if (!path || !labels) return;
  // Extract properties
  const { axis, color } = labels;
  const { useJson = false, title = '', useLoader = false } = options;
  // Add loader if is necesary
  if (useLoader || useJson) addLoader(container);
  // Get data
  const dataRaw = useJson ? await utils.jsonRequest(path) : await utils.csvRequest(path);
  // console.log('🎋 dataRaw', dataRaw);
  // Process data
  const dataProcess = useJson ? new DotJSON(dataRaw, axis) : new DotCSV(dataRaw, axis);
  // console.log('🎍 dataProcess', dataProcess);
  // Init plot
  let trace = {};
  // Validate dimension
  if (dimension === 2) {
    trace = {
      x: dataProcess.x,
      y: dataProcess.y,
      xaxis: 'x2',
      yaxis: 'y2',
      mode: 'markers',
      marker: {
        size: 5,
        line: {
          color: 'rgba(217, 217, 217, 0.14)',
          width: 0.5
        },
        opacity: 0.8,
        color: color ? dataProcess.getColors(color) : 'gray',
      },
      // hovertext: sphere2D.getColors('Label'),
      showlegend: false,
      type: 'scatter',
    };
  } else {
    trace = {
      x: dataProcess.x,
      y: dataProcess.y,
      z: dataProcess.z,
      marker: {
        size: 2,
        color: color ? dataProcess.getColors(color) : 'gray',
        colorscale: 'Reds',
        line: { color: 'transparent' }
      },
      mode: 'markers',
      type: 'scatter3d',
      // text: sphere3D.getColumn('iris'),
      hoverinfo: 'x+y+z+text',
      showlegend: false,
    };
  }

  const data = [trace];

  const layout = {
    paper_bgcolor: 'white',
    title: title,
    font: { color: 'rgb(42 59 71)', family: 'Open Sans' },
    grid: {
      rows: 1,
      columns: 1,
      pattern: 'independent',
    },
  };

  const config = { responsive: true }
  // remove loader if necesary before load plot
  if (useLoader || useJson) removeLoader(container);

  Plotly.newPlot(container, data, layout, config);
}

export default plotter;