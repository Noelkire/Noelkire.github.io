const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setClearColor(0x000000, 0.0);
renderer.setSize(window.innerWidth/1.5, window.innerHeight/1.5);
document.body.appendChild(renderer.domElement);

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.autoRotate = true;
controls.enablePan = false;
controls.enableZoom = false;

const lightOne = new THREE.PointLight(0xFFFFFF, 1.5, 100);
lightOne.position.set(25, 25, 25);
scene.add(lightOne);

const lightTwo = new THREE.PointLight(0xFFFFFF, 1.5, 100);
lightTwo.position.set(-25, -25, 25);
scene.add(lightTwo);

const lightThree = new THREE.PointLight(0xFFFFFF, 1.5, 100);
lightThree.position.set(0, 0, -25);
scene.add(lightThree);

const geoSphere = new THREE.SphereGeometry(1, 32, 32);
const sphereMaterial = new THREE.MeshStandardMaterial({ wireframe: false, color: 0x94B6C6 });
sphereMaterial.roughness = 1.0;
const sphere = new THREE.Mesh(geoSphere, sphereMaterial);
sphere.position.set(0, 0, 2)
scene.add(sphere);

const geoBox = new THREE.BoxGeometry(2, 2, 2);
const boxMaterial = new THREE.MeshStandardMaterial({ wireframe: false, color: 0x94B6C6 });
boxMaterial.roughness = 1.0;
const box = new THREE.Mesh(geoBox, boxMaterial);
box.position.set(2, 4, 2)
scene.add(box);

const geoCone = new THREE.ConeGeometry(1, 2, 32);
const coneMaterial = new THREE.MeshStandardMaterial({ wireframe: false, color: 0x94B6C6 });
coneMaterial.roughness = 1.0;
const cone = new THREE.Mesh(geoCone, coneMaterial);
cone.position.set(3, -1, -2)
scene.add(cone);

camera.position.z = 1;
camera.position.x = 10;
camera.position.y = 5;

const animate = function () {
    requestAnimationFrame(animate);
    controls.update();

    renderer.render(scene, camera);
};

animate();