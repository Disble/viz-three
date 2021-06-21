// Aquí van las importaciones
import { onMount } from '../utils/lifecycle.js';
import control3dThree from '@utils/control3d.js';
import frontEndController from '../utils/frontend.controller.js';
import dplots from '../utils/dplots.js';
import dstats from '../utils/dstats.js';
import dplotapi from '../utils/dplotapi.js';

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
    dplots();
    // dstats();
    dplotapi();
    control3dThree({ updateStats: frontEndController.updateStats, colors: colorSides });
  });


  const view = /*html*/`
    <div class="container">
      <div class="has-flex">
        <div class="column-left">
          <div
          id="plot-reduction-original"
          class="stats-original"
          ></div>
          <div class="plot has-flex has-align-items-center">
            <div class="loader plot">Loading...</div>
            <div class="loader plot">Loading...</div>
          </div>
          <div class="plot has-flex has-align-items-center">
            <div class="loader plot">Loading...</div>
            <div class="loader plot">Loading...</div>
          </div>
        </div>
        <div class="column-right">
          <div
            id="three-control"
            class="control-3d"
          ></div>
          <div class="item mb-4">
            <label for="standard-select">Seleccione una gráfica</label>
            <div class="select">
            <select id="standard-select">
              <option value="sphere">Esfera</option>
              <option value="swiss-roll">Rollo Suizo</option>
            </select>
            <span class="focus"></span>
            </div>
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