var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
var cameraControl = new THREE.OrbitControls(camera);
var renderer = new THREE.WebGLRenderer({ antialias: true });


function creatBacisWorld() {
    let planeWidth = 220;
    let planeDeep = 220;
    renderer.setClearColor(new THREE.Color('#c4a9a9'));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMapEnabled = true; //開啟或關閉渲染陰影的功能
    // 地板
    var planeGeometry = new THREE.PlaneGeometry(planeWidth, planeDeep);//設定長寬
    var planeMaterial = new THREE.MeshLambertMaterial({ color: "#ffffff" });
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    // console.log(plane);
    plane.receiveShadow = true; //設置一個物體是否接收其他物體的陰影。
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.set(0, 0, 0);
    scene.add(plane);
    // 方塊
    var cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
    var cubeMaterial = new THREE.MeshToonMaterial({ color: 0xff0000, });
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.castShadow = true; //設置一個物體是否投射陰影，不透明的物體就不會投射陰影
    cube.receiveShadow = true;
    cube.position.set(0, 2, 0);
    scene.add(cube);

    //球體
    const tL = new THREE.TextureLoader();
    const gTexture = tL.load("https://i.imgur.com/BybHhWd.jpg");
    var sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
    var sphereMaterial = new THREE.MeshToonMaterial({ color: 0xff0000, gradientMap: gTexture });
    var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.castShadow = true;
    sphere.receiveShadow = true;
    sphere.position.set(-10, 4, 15);
    scene.add(sphere);
}
function creatLight() {
    // 加霧氣
    scene.fog = new THREE.Fog('#c4a9a9', 80, 120);
    var ambiColor = "#000000";
    var ambientLight = new THREE.AmbientLight(ambiColor, 0.3);
    scene.add(ambientLight);
    // 加入點光源
    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-40, 60, -10);
    spotLight.castShadow = true;
    scene.add(spotLight);

    renderer.render(scene, camera);
}
function onResize() { //這邊就是自適應的的設定
    //.aspect 決定了相機拍攝視景的橫向比例
    camera.aspect = window.innerWidth / window.innerHeight;
    //我們使用updateProjectionMatrix()方法更新相機的投影矩陣
    camera.updateProjectionMatrix();
    //調整了渲染器的尺寸，使其填滿整個窗口。
    renderer.setSize(window.innerWidth, window.innerHeight);
}
function OrbitCamera() {// 建立 OrbitControls
    console.log(cameraControl);
    const minZoom = 0.5;
    const maxZoom = 2;
    camera.zoom = 1; // 初始縮放值
    camera.updateProjectionMatrix();

    camera.position.set(-30, 40, 30);// + 相機
    camera.lookAt(scene.position);
    cameraControl.enableDamping = true; // 啟用阻尼效果
    cameraControl.dampingFactor = 0.25; // 阻尼系數

    // cameraControl.userRotate = false;
    // cameraControl.autoRotate = true    // 啟用鏡頭自動旋轉
}
function init() {
    var stats = initStats();
    creatBacisWorld(); // + 場景
    OrbitCamera();
    creatLight();  // + 燈光
    //都好了再把渲染物+到網頁
    document.getElementById("WebGL-output").appendChild(renderer.domElement);

    var step = 0;
    render();
    function render() {
        stats.update();
        cameraControl.update();
        // render using requestAnimationFrame
        requestAnimationFrame(render);
        renderer.render(scene, camera);
        var constrols = new THREE.OrbitControls(camera, renderer.domElement);

    }
    function initStats() {
        var stats = new Stats();
        stats.setMode(0); // 0: fps, 1: ms

        // Align top-left
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.left = '0px';
        stats.domElement.style.top = '0px';

        document.getElementById("Stats-output").appendChild(stats.domElement);
        return stats;
    }
}


window.onload = init;
//當瀏覽器窗口被縮放時，就會觸發resize事件
window.addEventListener('resize', onResize, false);
