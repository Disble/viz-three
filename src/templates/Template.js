// Aquí van las importaciones
import { onMount } from '../utils/lifecycle.js';
import control3dThree from '@utils/control3d.js';
import frontEndController from '../utils/frontend.controller.js';
import dplots from '../utils/dplots.js';
import dstats from '../utils/dstats.js';
import dplotapi from '../utils/dplotapi.js';

const Template = async () => {

  onMount(() => {
    dplots();
    dstats();
    dplotapi();
    control3dThree({ updateStats: frontEndController.updateStats });
  });


  const view = /*html*/`
    <div class="container">
      <div
        id="plot-reduction-original"
        class="stats-original"
      ></div>
      <div class="plot has-flex has-align-items-center">
        <div class="loader plot">Loading...</div>
        <div class="loader plot">Loading...</div>
      </div>
      <div
        id="plot-reduction"
        class="plot"
      ></div>
      <div
        id="plot-stats"
        class="stats"
      ></div>
      <div class="item controls">
        Menu para seleccionar la esfera, rollo suizo.
      </div>
      <div
        id="three-control"
        class="control-3d"
      ></div>
      <div class="item blank"></div>
      <div class="item coeficients">
        <span class="mr-4"> <span
            class="bold"
            style="color: #D03038;"
          >R:</span> <span id="index-red">33.33%</span> </span>
        <span class="mr-4"> <span
            class="bold"
            style="color: #1e84c9;"
          >B:</span> <span id="index-blue">33.33%</span> </span>
        <span class="mr-4"> <span
            class="bold"
            style="color: #52a820;"
          >G:</span> <span id="index-green">33.33%</span> </span>
        <span class="mr-4"> <span
            class="bold"
            style="color: #b9a318;"
          >Y:</span> <span id="index-yellow">0%</span> </span>
      </div>
    </div>
  `;
  return view;
};

export default Template;