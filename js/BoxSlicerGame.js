window.focus();

let scene, camera, renderer
const boxHeight = 1;
const originalBoxsize = 3;
let stack;
let score = 1;
let speed, collision;

init();

function init() {
    stack = [];
    scene = new THREE.Scene();

    //foundation
    addLayer(0, 0, originalBoxsize, originalBoxsize);

    //first layer
    addLayer(-10, 0, originalBoxsize, originalBoxsize, "x");

    //setup lights
    const ambientLight = new THREE.AmbientLight(0xfffffff, 0.6);
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight.position.set(10, 20, 0);
    scene.add(directionalLight);

    //setup camera
    const aspect = window.innerWidth / window.innerHeight;
    const width = 10;
    const height = width / aspect;

    camera = new THREE.OrthographicCamera(
        width / -2, //left
        width / 2, //right
        height / 2, //top
        height / -2, //bottom
        1, //near
        100 //far
    );
    camera.position.set(4, 4, 4);
    camera.lookAt(0, 0, 0);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
    document.body.appendChild(renderer.domElement);
}

function addLayer(x, z, width, depth, direction) {
    const y = boxHeight * stack.length;

    const layer = generateBox(x, y, z, width, depth, false);
    layer.direction = direction;

    stack.push(layer);
}

function generateBox(x, y, z, width, depth) {
    const geometry = new THREE.BoxGeometry(width, boxHeight, depth);

    const color = new THREE.Color(`hsl(${30 + stack.length * 4}, 100%, 50%)`);
    const material = new THREE.MeshLambertMaterial({ color });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    scene.add(mesh);

    return {
        threejs: mesh,
        width,
        depth,
    };
}

let gameStarted = false;

window.addEventListener("click", () => {
    if (!gameStarted) {
        renderer.setAnimationLoop(animation);
        gameStarted = true;
    } else {
        const topLayer = stack[stack.length - 1];
        const direction = topLayer.direction;

        // Next layer
        const nextX = direction == "x" ? topLayer.threejs.position.x : -10;
        const nextZ = direction == "z" ? topLayer.threejs.position.z : -10;
        const newWidth = topLayer.width;
        const newDepth = topLayer.depth;
        const nextDirection = direction == "x" ? "z" : "x";
        addLayer(nextX, nextZ, newWidth, newDepth, nextDirection);
    }
});
collision = false;
function animation() {
    score = stack.length - 1;
    const topLayer = stack[stack.length - 1];

    if(topLayer.threejs.position[topLayer.direction] > 10) {
        collision = true;
    }

    if(topLayer.threejs.position[topLayer.direction] > 8 && collision == true) {
        document.getElementById("message").innerHTML = "Collision";
        collision = false;
        speed = -0.18
    } else if (topLayer.threejs.position[topLayer.direction] < -8 && collision == false)  {
        document.getElementById("message").innerHTML = "None";
        speed = 0.18;
    }
    topLayer.threejs.position[topLayer.direction] += speed;
    
    document.getElementById("score").innerHTML = `Score: ${score}`;
    if (topLayer.threejs.position.y >= 50) {
        document.getElementById("message").innerHTML = "oh nice...";
    }
    if (topLayer.threejs.position.y >= 100) {
        document.getElementById("message").innerHTML = "so big...";
    }
    if (camera.position.y < boxHeight * (stack.length - 2) + 6) {
        camera.position.y += speed;
    }

    document.getElementById("boxposition").innerHTML = `x/z: ${topLayer.threejs.position[topLayer.direction].toFixed(0)} y: ${topLayer.threejs.position.y.toFixed(0)}`;
    document.getElementById("boxdirection").innerHTML = `Direction: ${topLayer.direction}`;

    renderer.render(scene, camera);
}