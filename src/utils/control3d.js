// ARCHIVO QUE CONTIENE UN TETRAHEDRON CON THREE.JS
import * as THREE from 'three/build/three.module';

const control3dThree = ({ generateStats = () => { }, colors = [] }) => {
  const nameContainer = 'three-control';
  const elContainer = document.getElementById(nameContainer);
  const elContainerWidth = elContainer.offsetWidth;
  const elContainerHeight = elContainer.offsetHeight;

  let isWireframe = false;
  let hasAxesHelpers = false;
  let usePerspectiveCamera = false;

  const scene = new THREE.Scene({ antialias: true });
  scene.background = new THREE.Color(0xeeeeee);

  const fov = 75;
  const aspect = elContainerWidth / elContainerHeight;
  const near = 0.1;
  const far = 2000;

  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

  // Cámara con las guías
  const newCamera = new THREE.PerspectiveCamera(
    45,
    elContainerWidth / elContainerHeight,
    3,
    700
  );
  const helper = new THREE.CameraHelper(newCamera);
  scene.add(newCamera);
  // scene.add(helper);

  const radius = 1.5;

  const geometry = new THREE.DodecahedronGeometry(radius);
  // console.log('😀 faces', geometry.faces.length);

  // Side 1
  geometry.faces[0].color.setHex(colors[0].hex);
  geometry.faces[1].color.setHex(colors[0].hex);
  geometry.faces[2].color.setHex(colors[0].hex);
  // Side 2
  geometry.faces[3].color.setHex(colors[1].hex);
  geometry.faces[4].color.setHex(colors[1].hex);
  geometry.faces[5].color.setHex(colors[1].hex);
  // Side 3
  geometry.faces[6].color.setHex(colors[2].hex);
  geometry.faces[7].color.setHex(colors[2].hex);
  geometry.faces[8].color.setHex(colors[2].hex);
  // Side 4
  geometry.faces[9].color.setHex(colors[3].hex);
  geometry.faces[10].color.setHex(colors[3].hex);
  geometry.faces[11].color.setHex(colors[3].hex);
  // Side 5
  geometry.faces[12].color.setHex(colors[4].hex);
  geometry.faces[13].color.setHex(colors[4].hex);
  geometry.faces[14].color.setHex(colors[4].hex);
  // Side 6
  geometry.faces[15].color.setHex(colors[5].hex);
  geometry.faces[16].color.setHex(colors[5].hex);
  geometry.faces[17].color.setHex(colors[5].hex);
  // Side 7
  geometry.faces[18].color.setHex(colors[6].hex);
  geometry.faces[19].color.setHex(colors[6].hex);
  geometry.faces[20].color.setHex(colors[6].hex);
  // Side 8
  geometry.faces[21].color.setHex(colors[7].hex);
  geometry.faces[22].color.setHex(colors[7].hex);
  geometry.faces[23].color.setHex(colors[7].hex);
  // Side 9
  geometry.faces[24].color.setHex(colors[8].hex);
  geometry.faces[25].color.setHex(colors[8].hex);
  geometry.faces[26].color.setHex(colors[8].hex);
  // Side 10
  geometry.faces[27].color.setHex(colors[9].hex);
  geometry.faces[28].color.setHex(colors[9].hex);
  geometry.faces[29].color.setHex(colors[9].hex);
  // Side 11
  geometry.faces[30].color.setHex(colors[10].hex);
  geometry.faces[31].color.setHex(colors[10].hex);
  geometry.faces[32].color.setHex(colors[10].hex);
  // Side 12
  geometry.faces[33].color.setHex(colors[11].hex);
  geometry.faces[34].color.setHex(colors[11].hex);
  geometry.faces[35].color.setHex(colors[11].hex);

  const material = new THREE.MeshBasicMaterial({
    side: THREE.DoubleSide,
    flatShading: true,
    vertexColors: THREE.VertexColors,
    wireframe: isWireframe
  });

  const mesh = new THREE.Mesh(
    geometry,
    material
  );
  scene.add(mesh);

  camera.position.set(-10, 10, 10);
  newCamera.position.z = 5;

  // Muestra el eje de coordenadas
  if (hasAxesHelpers) {
    scene.add(new THREE.AxesHelper(500));
  }

  // Selecciona entre la camara principal (frente objeto) o la de perpectiva (lejos).
  const renderCamera = usePerspectiveCamera ? camera : newCamera;

  // Seleccionamos el método de renderizado
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(elContainerWidth, elContainerHeight);
  // Agregamos el renderizado al DOM, aún no muestra.
  elContainer.appendChild(renderer.domElement);

  const resize = () => {
    const elContainerUpdated = document.getElementById(nameContainer);
    const elContainerWidthUpdated = elContainerUpdated.offsetWidth;
    const elContainerHeightUpdated = elContainerUpdated.offsetHeight;
    renderCamera.aspect = elContainerWidthUpdated / elContainerHeightUpdated;
    renderCamera.updateProjectionMatrix();
    renderer.setSize(elContainerWidthUpdated, elContainerHeightUpdated);
    renderer.render(scene, renderCamera);
  }

  window.addEventListener('resize', resize);

  // #######################
  // INTENTO DE ROTACION EN 3D
  let isDragging = false;
  let previousMousePosition = {
    x: 0,
    y: 0
  };
  // 🐟
  renderer.domElement.addEventListener('mousedown', e => {
    isDragging = true;
  });
  // 🐠
  renderer.domElement.addEventListener('mousemove', e => {
    const deltaMove = {
      x: e.offsetX - previousMousePosition.x,
      y: e.offsetY - previousMousePosition.y
    };

    if (isDragging && isLeftClick(e)) {
      if (e.ctrlKey === true) {
        mesh.geometry.rotateZ(toRadians(-deltaMove.x * 1));
        mesh.geometry.rotateZ(toRadians(-deltaMove.y * 1));
      } else {
        mesh.geometry.rotateY(toRadians(deltaMove.x * 1));
        mesh.geometry.rotateX(toRadians(deltaMove.y * 1));
      }
    }

    previousMousePosition = {
      x: e.offsetX,
      y: e.offsetY
    };
  });
  // 🐡
  const handleCalc = e => {
    // console.log('🀄 mesh up', mesh);
    //////////////////////////////////--begin--////////////////////////////////////////////
    /* camera position and normal vector of each face    */
    //mesh.geometry.computeFaceNormals()
    // console.log('↗ faces', mesh.geometry.faces);
    // direction to the camera,  dir = cameraPosition - Position of the figure
    const dirToCamera = newCamera.position.clone().sub(mesh.position);
    dirToCamera.normalize();

    // console.log('↗ dirToCamera', dirToCamera);
    // console.log('↗ newCamera.position', newCamera.position);
    // console.log('↗ camera.position', camera.position);
    // console.log('↗ mesh.position', mesh.position);

    // dot product of the to vectors
    const angleValues = mesh.geometry.faces.map(face => face.normal.dot(dirToCamera));
    // calc angles percentages
    const anglesPercentage = calcIndexDode({ angles: angleValues });
    generateStats({ faces: anglesPercentage })
    // clean labels from colors
    colors.forEach(color => document.getElementById(color.name).innerText = '');
    // print labels with new percentages
    anglesPercentage.forEach(angle => {
      // console.log('🎹 resp', angle);
      if (angle.facePercentage100 > 0)
        document.getElementById(angle.color).innerText = angle.facePercentage100.toFixed(2) + '%';
    });

    isDragging = false;
  }

  const rotateWithArrows = e => {
    const arrowKeys = {
      ArrowUp: () => mesh.geometry.rotateX(-0.01),
      ArrowLeft: () => mesh.geometry.rotateY(-0.01),
      ArrowDown: () => mesh.geometry.rotateX(0.01),
      ArrowRight: () => mesh.geometry.rotateY(0.01)
    };
    const handleArrow = arrowKeys[e.key];
    if (handleArrow) return handleArrow();
  }

  const rotateWithArrowsCtrl = e => {
    const arrowKeys = {
      ArrowUp: () => mesh.geometry.rotateZ(-0.01),
      ArrowLeft: () => mesh.geometry.rotateZ(0.01),
      ArrowDown: () => mesh.geometry.rotateZ(0.01),
      ArrowRight: () => mesh.geometry.rotateZ(-0.01)
    };
    const handleArrow = arrowKeys[e.key];
    if (handleArrow) return handleArrow();
  }


  document.addEventListener('keyup', e => {
    let isExec = false;
    if (e.ctrlKey === true) {
      isExec = rotateWithArrowsCtrl(e);
    } else {
      isExec = rotateWithArrows(e);
    }
    if (isExec) handleCalc(e);
  });

  document.addEventListener('keydown', (e) => {
    if (e.repeat) {
      if (e.ctrlKey === true) {
        rotateWithArrowsCtrl(e);
      } else {
        rotateWithArrows(e);
      }
    }
  });

  renderer.domElement.addEventListener('mouseup', handleCalc);

  function calcIndexDode({ angles }) {
    const sides = [];
    let sideFaces = [];
    let counterSides = 0;
    let angleValueTotal = 0;

    for (const angle of angles) if (angle > 0) angleValueTotal += angle; // valor del total de las caras

    for (const i in angles) {
      if (Object.hasOwnProperty.call(angles, i)) {
          sideFaces.push(angles[i] / angleValueTotal); // array en tripletas
          if ((i + 1) % 3 === 0) {
            const facePercentageRaw = sideFaces.reduce((a, b) => a + b); // sobre 1
            const facePercentage100 = facePercentageRaw * 100; // sobre el 100%
            if (facePercentage100 > 8.0) { // no se muestra a menos que pase cierto umbral
              sides.push({
                faces: sideFaces,
                facePercentage: facePercentageRaw,
                facePercentage100: facePercentage100,
                color: colors[counterSides].name
              });
            } else {
              sides.push({
                faces: sideFaces,
                facePercentage: 0,
                facePercentage100: 0,
                color: colors[counterSides].name
              });
            }
            sideFaces = [];
          }
        if ((i + 1) % 3 === 0) counterSides++;
      }
    }
    // console.log('🧂', sides);
    return sides;
  }


  // #######################
  const render = () => {
    // Renderiza en pantalla la escena y la cámara
    renderer.render(scene, renderCamera);
    requestAnimationFrame(render);
  }

  render();

  const toRadians = angle => angle * (Math.PI / 180);
  const isLeftClick = e => e.buttons === 1;
}

export default control3dThree;