// Initialize the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Load a panoramic texture for the forest view
const texture = new THREE.TextureLoader().load('forest-panorama.jpg'); // Replace with your panoramic image
const geometry = new THREE.SphereGeometry(500, 60, 40);
geometry.scale(-1, 1, 1); // Invert the sphere to view from inside
const material = new THREE.MeshBasicMaterial({ map: texture });
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// Set the camera inside the sphere
camera.position.set(0, 0, 0);

// Add orbit controls for user interactivity
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.screenSpacePanning = false;
controls.maxPolarAngle = Math.PI / 2;

// Play the forest background sound
const sound = new Audio('forest-sound.mp3'); // Replace with your forest sound file
sound.loop = true;
sound.play();

// Load a 3D model (e.g., animal model) using GLTFLoader
const loader = new THREE.GLTFLoader();
loader.load('animal-model.glb', function (gltf) {
    scene.add(gltf.scene);
    gltf.scene.position.set(100, 0, 100); // Position the animal in the scene
});

function animate() {
    requestAnimationFrame(animate);
    controls.update(); // Update controls for smooth movement
    renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
