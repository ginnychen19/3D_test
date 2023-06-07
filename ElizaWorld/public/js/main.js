//npx vite
/*
稍後，當您準備好部署 Web 應用程序時，您只需要告訴 Vite 運行生產構建 — npx vite build。
應用程序使用的所有內容都將被編譯、優化並複製到dist/文件夾中。
該文件夾的內容已準備好託管在您的網站上。
*/
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// A.預創建 - 創建場景 scene
const scene = new THREE.Scene();

// B.創建物件 Geometry
let planeWidth = 300;
let planeDeep = 220;
const planeGeometry = new THREE.PlaneGeometry(planeWidth, planeDeep);//設定長寬
const planeMaterial = new THREE.MeshLambertMaterial({ color: "#ffffff" });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);

plane.receiveShadow = true; //設置一個物體是否接收其他物體的陰影。
plane.rotation.x = -0.5 * Math.PI;
plane.position.set(0, 0, 0);
scene.add(plane);
const cubeSize = 6;
const cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
const cubeMaterial = new THREE.MeshBasicMaterial({ color: "#189ead" });
const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
cubeMesh.position.set(0, cubeSize / 2, 0);
cubeMesh.castShadow = true;
scene.add(cubeMesh);

// C.創建燈光
scene.fog = new THREE.Fog('#c4a9a9', 80, 120);// 加霧氣
var ambiColor = "#000000";
var ambientLight = new THREE.AmbientLight(ambiColor, 0.3);
scene.add(ambientLight);
var directionalLight = new THREE.DirectionalLight('#ff5808');//直線光
directionalLight.position.set(-40, 60, 0);//預設指向0 0 0
directionalLight.castShadow = true;
directionalLight.distance = 0.5;
directionalLight.intensity = 1.0;
directionalLight.shadow.mapSize.width = 1024; // default
directionalLight.shadow.mapSize.height = 1024; // default
// 調整陰影相機的遠近剪裁面
directionalLight.shadow.camera.near = 0;
directionalLight.shadow.camera.far = 400;
directionalLight.shadow.camera.top = 120;
directionalLight.shadow.camera.right = 120;
directionalLight.shadow.camera.bottom = - 120;
directionalLight.shadow.camera.left = - 120;
scene.add(directionalLight);

// debug
const axes = new THREE.AxesHelper(20);//數字是控制大小
scene.add(axes);
var helper = new THREE.CameraHelper(directionalLight.shadow.camera);
scene.add(helper);

// D.鍵盤移動事件 - 01.先給keydown、up的監聽，限制可存的按鈕
const keys = [];
const speed = 0.1;// 給移動初始速度
document.addEventListener('keydown', (e) => {
    e.preventDefault();
    if (
        e.key === 'ArrowDown' ||
        e.key === 's' ||
        e.key === 'ArrowUp' ||
        e.key === 'w' ||
        e.key === 'ArrowLeft' ||
        e.key === 'a' ||
        e.key === 'ArrowRight' ||
        e.key === 'd' ||
        e.key === ' '
    ) {
        if (!keys.includes(e.key)) {
            keys.push(e.key);
            // console.log(keys);
        }
    }
});
document.addEventListener('keyup', (e) => {
    e.preventDefault();
    if (
        e.key === 'ArrowDown' ||
        e.key === 's' ||
        e.key === 'ArrowUp' ||
        e.key === 'w' ||
        e.key === 'ArrowLeft' ||
        e.key === 'a' ||
        e.key === 'ArrowRight' ||
        e.key === 'd' ||
        e.key === ' '
    ) {
        const index = keys.indexOf(e.key);
        if (index !== -1) {
            keys.splice(index, 1);
        }
    }
});

// F.創建渲染器 renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(new THREE.Color('#c4a9a9'));
renderer.shadowMap.enabled = true;//開啟或關閉渲染陰影的功能
renderer.shadowMap.type = THREE.PCFSoftShadowMap;//柔和陰影

// E.創建相機 camera
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
const cameraControl = new OrbitControls(camera, renderer.domElement);
cameraControl.enableDamping = true; // 啟用阻尼效果
cameraControl.dampingFactor = 0.25; // 阻尼系數
cameraControl.minDistance = 5;
cameraControl.maxDistance =60;
cameraControl.enablepan = false;
cameraControl.maxPolarAngle = Math.PI / 2 - 0.05;


console.log(cameraControl);


// cameraControl.autoRotate = true    // 啟用自動旋轉F
//移動的方向最好是相對於鏡頭會比較直覺

// 把渲染內容加入到dom元素
document.body.appendChild(renderer.domElement);

// G.Animation，重複渲染區
function animate() {
    //鍵盤移動事件 - 02.再重複渲染的部分判斷現在鍵盤有輸入什麼事件並做對應的移動
    if (keys.includes('w') || keys.includes('ArrowUp')) {
        cubeMesh.position.z -= speed;
    }
    if (keys.includes('s') || keys.includes('ArrowDown')) {
        cubeMesh.position.z += speed;
    }
    if (keys.includes('a') || keys.includes('ArrowLeft')) {
        cubeMesh.position.x -= speed;
    }
    if (keys.includes('d') || keys.includes('ArrowRight')) {
        cubeMesh.position.x += speed;
    }
    if (keys.includes(' ')) {
        cubeMesh.position.y += speed;
    }
    //因為position會一直更新，所以要放在Animation裡
    camera.position.set(cubeMesh.position.x + 0, cubeMesh.position.y + 20, cubeMesh.position.z + 30);
    camera.lookAt(cubeMesh.position);
    cameraControl.update();

    // Render the scene
    renderer.render(scene, camera);
    // Request the next frame
    requestAnimationFrame(animate);
}
// animate是所有需要一直檢查的地方要用的
renderer.render(scene, camera);
animate();