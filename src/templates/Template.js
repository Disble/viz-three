// Aquí van las importaciones
import { onMount } from '../utils/lifecycle.js';
import control3dThree from '../utils/control3d.js';
import plotter from '../utils/plotter.js';

const Template = async () => {

  const colorSides = [
    { name: 'Victoria', hex: 0x564787, hexStr: '#564787' },
    { name: 'Lola', hex: 0xDBCBD8, hexStr: '#DBCBD8' },
    { name: 'Carnation', hex: 0xF05365, hexStr: '#F05365' },
    { name: 'Big Stone', hex: 0x101935, hexStr: '#101935' },
    { name: 'Buccaneer', hex: 0x56282D, hexStr: '#56282D' },
    { name: 'Highland', hex: 0x77966D, hexStr: '#77966D' },
    { name: 'Emperor', hex: 0x544343, hexStr: '#544343' },
    { name: 'Chestnut Rose', hex: 0xD16666, hexStr: '#D16666' },
    { name: 'Ronchi', hex: 0xEEC643, hexStr: '#EEC643' },
    { name: 'Ming', hex: 0x3B7080, hexStr: '#3B7080' },
    { name: 'Tom Thumb', hex: 0x3A5743, hexStr: '#3A5743' },
    { name: 'Strikemaster', hex: 0x925E78, hexStr: '#925E78' },
  ];

  onMount(() => {
    plotter({
      dimension: 3,
      path: '/assets/csv/sphereLabel.csv',
      container: 'plot-reduction-original',
      labels: { axis: ['X', 'Y', 'Z'], color: 'Label' },
      options: { title: 'Original' }
    });
    let numDim = 2;
    let errorThreshold = { value: 8.0 };
    document.getElementById('select-dimensions').addEventListener('change', e => {
      numDim = +e.target.value;
    })
    document.getElementById('error-threshold').addEventListener('input', e => {
      errorThreshold.value = +e.target.value;
      console.log('🧨 errorThreshold', errorThreshold);
    })
    document.getElementById('error-threshold').addEventListener('input', e => {
      if (+e.target.value > 100) e.target.value = 100;
      if (+e.target.value < 0) e.target.value = 0;
    })
    control3dThree({
      colors: colorSides,
      generateStats: ({ faces }) => {
        console.log('💛 faces', faces);
        const kernel = faces.map(kernel => kernel.facePercentage);
        console.log('💚 kernels per', kernel);
        plotter({
          dimension: numDim,
          path: `http://127.0.0.1:8000/api/kernel_join?alfa_1=${kernel[0]}&alfa_2=${kernel[1]}&alfa_3=${kernel[2]}&alfa_4=${kernel[3]}&alfa_5=${kernel[4]}&alfa_6=${kernel[5]}&alfa_7=${kernel[6]}&alfa_8=${kernel[7]}&alfa_9=${kernel[8]}&alfa_10=${kernel[9]}&alfa_11=${kernel[10]}&alfa_12=${kernel[11]}&num_dim=${numDim}`,
          container: 'plotter',
          labels: { axis: ['x', 'y', 'z'], color: 'labels' },
          options: { title: 'Reducción de dimensiones', useJson: true }
        });
      },
      errorThreshold
    });
  });


  const view = /*html*/`
    <div class="container">
      <div class="has-flex">
        <div class="column-left has-flex has-align-items-center .has-justify-space-between">
          <div
          id="plot-reduction-original"
          class="stats-original plot-50"
          ></div>
          <div id="plotter" class="plot-50">
          <div class="plot has-flex has-align-items-center">
            <div class="loader plot">Loading...</div>
          </div>
          </div>
        </div>
        <div class="column-right">
          <div
            id="three-control"
            class="control-3d"
          ></div>
          <div class="item mb-4 mr-3 mt-1 plot-50">
            <label for="standard-select">Número de dimensiones</label>
            <div class="select">
            <select id="select-dimensions">
              <option value="2">2D</option>
              <option value="3">3D</option>
            </select>
            <span class="focus"></span>
            </div>
          </div>
          <div class="plot-40">
            <label htmlFor="custom-number">Umbral de error</label>
            <input type="number" class="custom-number" id="error-threshold" min="0" max="100" value="8" />
          </div>
          ${colorSides.map(color => (/*html*/`
            <div class="has-flex">
              <div class="block-color" style="background-color: ${color.hexStr};">
                ${color.name}
              </div>
              <div id="${color.name}"></div>
            </div>
          `)).join('')}
        </div>
      </div>
    </div>
  `;
  return view;
};

export default Template;