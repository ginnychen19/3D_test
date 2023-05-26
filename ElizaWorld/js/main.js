var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();

function creatBacisWorld() {
    let planeWidth = 30;
    let planeDeep = 30;

    renderer.setClearColor(new THREE.Color(0xEEEEEE, 1.0));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMapEnabled = true;//開啟或關閉渲染陰影的功能
    // 地板
    var planeGeometry = new THREE.PlaneGeometry(planeWidth, planeDeep);//設定長寬
    var planeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    console.log(plane);
    plane.receiveShadow = true; //設置一個物體是否接收其他物體的陰影。
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.set(0, 0, 0)
    scene.add(plane);
    // 方塊
    var cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
    var cubeMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000 });
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.castShadow = true; //設置一個物體是否投射陰影，不透明的物體就不會投射陰影
    cube.position.set(0, 0, 0)
    scene.add(cube);

    //球體
    var sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
    var sphereMaterial = new THREE.MeshLambertMaterial({ color: 0x7777ff });
    var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.castShadow = true;
    sphere.receiveShadow = true;
    sphere.position.set(10, 0, 10);
    scene.add(sphere);
}
function creatLight() {
    // 加入點光源
    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-40, 60, -10);
    spotLight.castShadow = true;
    scene.add(spotLight);

    renderer.render(scene, camera);
}
function onResize() { //這邊就是自適應的的設定
    console.log("fewfw")
    //.aspect 決定了相機拍攝視景的橫向比例
    camera.aspect = window.innerWidth / window.innerHeight;
    //我們使用updateProjectionMatrix()方法更新相機的投影矩陣
    camera.updateProjectionMatrix();
    //調整了渲染器的尺寸，使其填滿整個窗口。
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function init() {
    var stats = initStats();

    creatBacisWorld(); // + 場景
    // + 相機
    camera.position.set(-30, 40, 30);
    camera.lookAt(scene.position);
    creatLight();  // + 燈光
    //都好了再把渲染物+到網頁
    document.getElementById("WebGL-output").appendChild(renderer.domElement);
    //
    var step = 0;
    var controls = new function () {//加入方形旋轉、和圓球運動的速度
        this.rotationSpeed = 0.02;
        this.bouncingSpeed = 0.03;
    };
    var gui = new dat.GUI();
    gui.add(controls, 'rotationSpeed', 0, 0.5);
    gui.add(controls, 'bouncingSpeed', 0, 0.5);

    render();
   
    function render() {
        stats.update();
        // render using requestAnimationFrame
        requestAnimationFrame(render);
        renderer.render(scene, camera);
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
