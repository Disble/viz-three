// Aquí van las importaciones
import sum from '../utils/sum.js';
import { onMount } from '../utils/lifecycle.js';
import randomNumber from '../utils/randomNumber.js';
import hello from '@images/hello.svg';

const Template = async () => {
  const res = sum(1, 4);
  const TEXTO_RANDOM = process.env.TEXTO_RANDOM;

  onMount(() => {
    document.getElementById('btnSum')
      .addEventListener('click', () => {
        const sumText = document.getElementById('sum');
        const randX = randomNumber();
        const randY = randomNumber();
        const newSum = sum(randX, randY);
        sumText.innerHTML = `La suma de ${randX} + ${randY} es igual a ${newSum}`;
      });
  });


  const view = /**html */`
    <div class="container text-center">
      <h1>Hola</h1>
      <p>Este es solo texto de prueba</p>
      <p id="sum">La suma de 1 + 4 es igual a ${res}</p>
      <button id="btnSum">Sumar otros números</button>
      <p>Y aquí va una imagen</p>
      <img class="img-hello" src="${hello}" alt="hello"/>
      <p>Y una variable de entorno: <i class="gray-text">${TEXTO_RANDOM}</i></p>
    </div>
  `;
  return view;
};

export default Template;