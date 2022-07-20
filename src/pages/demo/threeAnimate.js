import * as THREE from 'three';
import Stats from 'mylib/stats.module.js';
import { GUI } from 'mylib/lil-gui.module.min.js';
import { OrbitControls } from 'mylib/OrbitControls.js';
import { Water } from 'mylib/Water.js';
import { Sky } from 'mylib/Sky.js';
import waternormals from './waternormals.jpg';

let container, stats;
let camera, scene, renderer;
let controls, water, sun, mesh;
let doAnimate;

function startAnimate() {
  doAnimate = true;
  animate();
}
function stopAnimate() {
  doAnimate = false;
}
function setSize(canvasWidth, canvasHeight) {
  renderer.setSize(canvasWidth, canvasHeight);
}

function init(canvasWidth, canvasHeight) {
  container = document.getElementById('container');
  container.innerHTML = '';
  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(canvasWidth, canvasHeight);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  container.appendChild(renderer.domElement);

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 20000);
  camera.position.set(30, 30, 500);
  camera.lookAt(0, 0, -500);
  sun = new THREE.Vector3();
  // Water
  const waterGeometry = new THREE.PlaneGeometry(10000, 10000);
  water = new Water(waterGeometry, {
    textureWidth: 512,
    textureHeight: 512,
    // waterNormals: new THREE.TextureLoader().load('./waternormals.jpg', function (texture) {
    waterNormals: new THREE.TextureLoader().load(waternormals, function (texture) {
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    }),
    sunDirection: new THREE.Vector3(),
    sunColor: 0xffffff,
    waterColor: 0x001e0f,
    distortionScale: 3.7,
    fog: scene.fog !== undefined,
  });

  water.rotation.x = -Math.PI / 2;
  scene.add(water);
  // Skybox
  const sky = new Sky();
  sky.scale.setScalar(10000);
  scene.add(sky);
  const skyUniforms = sky.material.uniforms;
  skyUniforms['turbidity'].value = 10;
  skyUniforms['rayleigh'].value = 2;
  skyUniforms['mieCoefficient'].value = 0.005;
  skyUniforms['mieDirectionalG'].value = 0.8;
  const parameters = {
    elevation: 1,
    azimuth: 180,
  };
  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  function updateSun() {
    const phi = THREE.MathUtils.degToRad(90 - parameters.elevation);
    const theta = THREE.MathUtils.degToRad(parameters.azimuth);
    sun.setFromSphericalCoords(1, phi, theta);
    sky.material.uniforms['sunPosition'].value.copy(sun);
    water.material.uniforms['sunDirection'].value.copy(sun).normalize();
    scene.environment = pmremGenerator.fromScene(sky).texture;
  }
  updateSun();

  const geometry = new THREE.BoxGeometry(30, 30, 30);
  const material = new THREE.MeshStandardMaterial({ roughness: 0 });

  mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
  //

  controls = new OrbitControls(camera, renderer.domElement);
  controls.maxPolarAngle = Math.PI * 0.495;
  controls.target.set(0, 10, 0);
  controls.minDistance = 40.0;
  controls.maxDistance = 1000.0;
  controls.update();

  //

  // stats = new Stats();
  // container.appendChild(stats.dom);

  // GUI

  // const gui = new GUI();

  // const folderSky = gui.addFolder('Sky');
  // folderSky.add(parameters, 'elevation', 0, 90, 0.1).onChange(updateSun);
  // folderSky.add(parameters, 'azimuth', -180, 180, 0.1).onChange(updateSun);
  // folderSky.open();

  // const waterUniforms = water.material.uniforms;

  // const folderWater = gui.addFolder('Water');
  // folderWater.add(waterUniforms.distortionScale, 'value', 0, 8, 0.1).name('distortionScale');
  // folderWater.add(waterUniforms.size, 'value', 0.1, 10, 0.1).name('size');
  // folderWater.open();

  //

  window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  if (!doAnimate) return;
  requestAnimationFrame(animate);
  render();
  // stats.update();
}

function render() {
  const time = performance.now() * 0.001;
  mesh.position.y = Math.sin(time) * 20 + 5;
  mesh.rotation.x = time * 0.5;
  mesh.rotation.z = time * 0.51;
  water.material.uniforms['time'].value += 1.0 / 60.0;
  renderer.render(scene, camera);
}

export { startAnimate, stopAnimate, init, setSize };
