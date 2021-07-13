// Aquí van las importaciones
import { onMount } from '../utils/lifecycle.js';
import control3dThree from '../utils/control3d.js';
import plotter from '../utils/plotter.js';
import equalsign from '../utils/equalsign.js';

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
    control3dThree({
      colors: colorSides,
      generateStats: ({ faces }) => {
        const kernel = faces.map(kernel => kernel.facePercentage);
        plotter({
          dimension: 3,
          path: `http://127.0.0.1:8000/api/kernel_join?alfa_1=${kernel[0]}&alfa_2=${kernel[1]}&alfa_3=${kernel[2]}&alfa_4=${kernel[3]}&alfa_5=${kernel[4]}&alfa_6=${kernel[5]}&alfa_7=${kernel[6]}&alfa_8=${kernel[7]}&alfa_9=${kernel[8]}&alfa_10=${kernel[9]}&alfa_11=${kernel[10]}&alfa_12=${kernel[11]}&num_dim=${3}`,
          container: 'plot-3D',
          labels: { axis: ['x', 'y', 'z'], color: 'labels' },
          options: { title: 'Reducción de dimensiones', useJson: true }
        });
        plotter({
          dimension: 2,
          path: `http://127.0.0.1:8000/api/kernel_join?alfa_1=${kernel[0]}&alfa_2=${kernel[1]}&alfa_3=${kernel[2]}&alfa_4=${kernel[3]}&alfa_5=${kernel[4]}&alfa_6=${kernel[5]}&alfa_7=${kernel[6]}&alfa_8=${kernel[7]}&alfa_9=${kernel[8]}&alfa_10=${kernel[9]}&alfa_11=${kernel[10]}&alfa_12=${kernel[11]}&num_dim=${2}`,
          container: 'plot-2D',
          labels: { axis: ['x', 'y', 'z'], color: 'labels' },
          options: { title: 'Reducción de dimensiones', useJson: true }
        });
      }
    });
  });


  const view = /*html*/`
    <div class="container">
      <div class="has-flex">
        <div class="column-left has-flex has-align-items-center .has-justify-space-between">
          <div
          id="plot-reduction-original"
          class="stats-original left-column"
          ></div>
          <span class="svg equalsign">
            ${equalsign}
          </span>
          <div class="right-column">
            <div id="plot-3D">
              <div class="plot has-flex has-align-items-center">
                <div class="loader plot">Loading...</div>
              </div>
            </div>
            <div id="plot-2D">
              <div class="plot has-flex has-align-items-center">
                <div class="loader plot">Loading...</div>
              </div>
            </div>
          </div>
        </div>
        <div class="column-right">
          <div
            id="three-control"
            class="control-3d mb-6"
          ></div>
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