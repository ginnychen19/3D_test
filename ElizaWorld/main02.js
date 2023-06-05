// // Create a new scene
// const scene = new THREE.Scene();
// // Create cube 
// const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
// const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
// cubeMesh.position.set(0, 0, 0);

// scene.add(cubeMesh);

// // Create a keyboard state object
// const keyboard = {};
// // Add event listeners for keydown and keyup events
// document.addEventListener('keydown', (event) => {
//   keyboard[event.code] = true;
// });

// document.addEventListener('keyup', (event) => {
//   keyboard[event.code] = false;
// });

// // Set initial cube movement speed
// const speed = 0.1;

// // Animate function called on each frame
// function animate() {
//   // Move the cube based on keyboard input
//   if (keyboard['KeyW']) {
//     cubeMesh.position.z -= speed;
//     console.log("KeyW");
//   }
//   if (keyboard['KeyS']) {
//     cubeMesh.position.z += speed;
//     console.log("KeyS");
//   }
//   if (keyboard['KeyA']) {
//     cubeMesh.position.x -= speed;
//     console.log("KeyA");
//   }
//   if (keyboard['KeyD']) {
//     cubeMesh.position.x += speed;
//     console.log("KeyD");
//   }

//   // Request the next frame
//   requestAnimationFrame(animate);

//   // Render the scene
//   renderer.render(scene, camera);
// }

// // Create a renderer and set its size
// const renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);

// // Add the renderer element to the DOM
// document.body.appendChild(renderer.domElement);

// // Create a camera and set its position
// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// camera.position.z = 5;

// // Start the animation
// animate();
import * as THREE from 'three';
import Input from './js/input.js';
// Create a new scene
const scene = new THREE.Scene();

// Add a cube as the player character
const playerGeometry = new THREE.BoxGeometry(1, 1, 1);
const playerMaterial = new THREE.MeshToonMaterial({ color: 0xff0000 });
const player = new THREE.Mesh(playerGeometry, playerMaterial);
player.position.set(0, 0, 0);
scene.add(player);

// Create a camera to follow the player
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 10);
camera.lookAt(player.position);

// Add player movement controls
const playerSpeed = 0.1;
document.addEventListener('keydown', (event) => {
    if (event.code === 'KeyW') {
        player.position.z -= playerSpeed;
    } else if (event.code === 'KeyS') {
        player.position.z += playerSpeed;
    } else if (event.code === 'KeyA') {
        player.position.x -= playerSpeed;
    } else if (event.code === 'KeyD') {
        player.position.x += playerSpeed;
    }
});

// Create a shop element as a floating window
const shopGeometry = new THREE.BoxGeometry(2, 2, 2);
const shopMaterial = new THREE.MeshToonMaterial({ color: 0x00ff00 });
const shop = new THREE.Mesh(shopGeometry, shopMaterial);
shop.position.set(5, 0, 0);
scene.add(shop);

// Add an event listener to display the shop window when the player collides with it
player.addEventListener('collision', (event) => {
    if (event.object === shop) {
        displayShop();
    }
});

// Function to display the shop window
function displayShop() {
    // Create a div element in the HTML to hold the shop window
    const shopDiv = document.createElement('div');
    shopDiv.id = 'shop';
    document.body.appendChild(shopDiv);

    // Add a button to close the shop window
    const closeButton = document.createElement('button');
    closeButton.innerText = 'Close Shop';
    closeButton.addEventListener('click', () => {
        document.body.removeChild(shopDiv);
    });
    shopDiv.appendChild(closeButton);
}
//   // Add a list of websites to visit from the shop window
//   const websiteList =

// class Main {
//     constructor() {
//         this.scene = new THREE.Scene();
//         this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
//         this.cameraControl = new THREE.OrbitControls(this.camera);
//         this.renderer = new THREE.WebGLRenderer({ antialias: true });
//         this.init(); //每次進入都先預處理init()這行
//     }

//     init() {
//         var stats = this.initStats();
//         this.createBasicWorld();
//         this.createLight();
//         document.getElementById("WebGL-output").appendChild(this.renderer.domElement);

//         var input = new Input();
//         input.render();

//         var step = 0;
//         this.render();

//         window.addEventListener('resize', this.onResize.bind(this), false);
//     }

//     render() {
//         stats.update();
//         this.cameraControl.update();
//         requestAnimationFrame(this.render.bind(this));
//         this.renderer.render(this.scene, this.camera);
//         var constrols = new THREE.OrbitControls(this.camera, this.renderer.domElement);
//     }

//     initStats() {
//         var stats = new Stats();
//         stats.setMode(0);
//         stats.domElement.style.position = 'absolute';
//         stats.domElement.style.left = '0px';
//         stats.domElement.style.top = '0px';
//         document.getElementById("Stats-output").appendChild(stats.domElement);
//         return stats;
//     }

//     createBasicWorld() {
//         let planeWidth = 220;
//         let planeDeep = 220;
//         this.renderer.setClearColor(new THREE.Color('#c4a9a9'));
//         this.renderer.setSize(window.innerWidth, window.innerHeight);
//         this.renderer.shadowMap.enabled = true;

//         var planeGeometry = new THREE.PlaneGeometry(planeWidth, planeDeep);
//         var planeMaterial = new THREE.MeshLambertMaterial({ color: "#ffffff" });
//         var plane = new THREE.Mesh(planeGeometry, planeMaterial);
//         plane.receiveShadow = true;
//         plane.rotation.x = -0.5 * Math.PI;
//         plane.position.set(0, 0, 0);
//         this.scene.add(plane);

//         var cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
//         var cubeMaterial = new THREE.MeshToonMaterial({ color: 0xff0000, });
//         var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
//         cube.castShadow = true;
//         cube.receiveShadow = true;
//         cube.position.set(0, 2, 0);
//         this.scene.add(cube);

//         const tL = new THREE.TextureLoader();
//         const gTexture = tL.load("https://i.imgur.com/BybHhWd.jpg");
//         var sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
//         var sphereMaterial = new THREE.MeshToonMaterial({ color: 0xff0000, gradientMap: gTexture });
//         var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
//         sphere.castShadow = true;
//         sphere.receiveShadow = true;
//         sphere.position.set(-10, 4, 15);
//         this.scene.add(sphere);
//     }

//     createLight() {
//         this.scene.fog = new THREE.Fog('#c4a9a9', 80, 120);
//         var ambiColor = "#000000";
//         var ambientLight = new THREE.AmbientLight(ambiColor, 0.3);
//         this.scene.add(ambientLight);
//         var spotLight = new THREE.SpotLight(0xffffff);
//         spotLight.position.set(-40, 60, -10);
//         spotLight.castShadow = true;
//         this.scene.add(spotLight);
//     }

//     onResize() {
//         this.camera.aspect = window.innerWidth / window.innerHeight;
//         this.camera.updateProjectionMatrix();
//         this.renderer.setSize(window.innerWidth, window.innerHeight);
//     }
// }

// window.onload = function () {
//     new Main();
// };

