import "./style.css";

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";

const domElement = document.querySelector("#myCanvas");

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// scene
const scene = new THREE.Scene();

// camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.set(0, 0, 3);
scene.add(camera);

// renderer
const renderer = new THREE.WebGLRenderer({
  canvas: domElement,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(window.devicePixelRatio);
/// ▼ これ(色)
renderer.setClearColor(0x5bbee5, 1);

// geometry
const loader = new FontLoader();

loader.load("helvetiker_bold.typeface.json", function (font) {
  const textGeometry = new TextGeometry("Watataku's Portfolio", {
    font: font,
    size: 0.35,
    height: 0.2,
    curveSegments: 5,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 4,
  });
  textGeometry.center();
  const textMaterial = new THREE.MeshStandardMaterial({
    color: 0x4aadd4,
  });
  const textMesh = new THREE.Mesh(textGeometry, textMaterial);
  scene.add(textMesh);

  const boxGeometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
  const boxMaterial = new THREE.MeshNormalMaterial();

  for (let i = 0; i < 650; i++) {
    const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);

    boxMesh.position.x = (Math.random() - 0.5) * 10;
    boxMesh.position.y = (Math.random() - 0.5) * 10;
    boxMesh.position.z = (Math.random() - 0.5) * 10;

    boxMesh.rotation.x = Math.random() * Math.PI;
    boxMesh.rotation.y = Math.random() * Math.PI;

    const scale = Math.random();
    boxMesh.scale.set(scale, scale, scale);
    scene.add(boxMesh);
  }
});

// controls
const controls = new OrbitControls(camera, domElement);
controls.enableDamping = true;

// light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

const directionLight = new THREE.DirectionalLight(0xffffff, 0.7);
scene.add(directionLight);

const animate = () => {
  requestAnimationFrame(animate);

  controls.update();
  renderer.render(scene, camera);
};

animate();
