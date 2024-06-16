import * as THREE from "three";

// Create a scene to add objects/lights/cameras to.
const scene = new THREE.Scene();

// Create a camera which will be passed to the renderer during the animation frame.
const aspect = window.innerWidth / window.innerHeight;
const camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
camera.position.z = 5;

// Create the WebGL renderer that will render the scene.
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
// Register the function that will update the scene on each animation frame.
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

// Create an Icosahedron to add to the scene.
const geometry = new THREE.IcosahedronGeometry(1.5);
const material = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  flatShading: true,
});
const icosahedron = new THREE.Mesh(geometry, material);

// Creaet a wireframe around the Icosahedron (slightly larger than the geometry to look like a cage around the shape).
const wireMat = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  wireframe: true,
});
const wireMesh = new THREE.Mesh(geometry, wireMat);
wireMesh.scale.setScalar(1.25);

// Add wireframe to shape.
icosahedron.add(wireMesh);

// Create a lightsource for the scene.
const hemiLight = new THREE.HemisphereLight(0x0099ff, 0xaa5500);

// Add shape and lightsource to the scene.
scene.add(icosahedron);
scene.add(hemiLight);

// Function that will update the scene.
function animate(t = 0) {
  // Rotate the shape along the x and y axis.
  icosahedron.rotation.y += 0.025;
  icosahedron.rotation.x += 0.025;
  // Enlarge and shrink the size of the shape.
  icosahedron.scale.setScalar(Math.cos(t * 0.0015) + 0.00005);
  // Render the updated scene.
  renderer.render(scene, camera);
}
