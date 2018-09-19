window.addEventListener('DOMContentLoaded', init);

let windowWidth = 800;
let windowHeight = 521;

function init() {
  let camera = new THREE.PerspectiveCamera(90, windowWidth / windowHeight, 0.1, 2000000);
  camera.position.set(0, 200, -5000);

  let controls = new THREE.OrbitControls(camera);

  let scene = new THREE.Scene();

  let light = new THREE.DirectionalLight('#ffffff');
  light.intensity = 2;
  light.position.set(1, 1, 1);
  scene.add(light);

  let amb = new THREE.AmbientLight('#464646');
  scene.add(amb);

  let centerLogHeight = 90;
  let sideLogHeight = 100;
  let bottomLogLength = 110;

  let bridge = new THREE.Object3D();
  scene.add(bridge);

  let logPos = {
    x: 0,
    z: 0,
  };

  let theta = Math.PI / 4;
  for (let i = 0; i < 30; i++) {
    let logs = new THREE.Object3D();

    let centerLogGeometry = new THREE.CylinderGeometry(3, 3, centerLogHeight, 20, 0, false);
    let logMaterial = new THREE.MeshPhongMaterial({ color: 0xffff00 });
    let centerLog1 = new THREE.Mesh(centerLogGeometry, logMaterial);
    centerLog1.position.set(logPos.x - 20, centerLogHeight / 2, logPos.z);

    let centerLog2 = new THREE.Mesh(centerLogGeometry, logMaterial);
    centerLog2.position.set(logPos.x + 20, centerLogHeight / 2, logPos.z);

    let rightLogGeometry = new THREE.CylinderGeometry(3, 3, sideLogHeight, 20, 0, false);
    let rightLog = new THREE.Mesh(rightLogGeometry, logMaterial);
    rightLog.rotation.z = -Math.PI / 15;
    rightLog.position.set(logPos.x - 65, sideLogHeight / 2.5, logPos.z);

    let leftLogGeometry = new THREE.CylinderGeometry(3, 3, sideLogHeight, 20, 0, false);
    let leftLog = new THREE.Mesh(leftLogGeometry, logMaterial);
    leftLog.rotation.z = Math.PI / 15;
    leftLog.position.set(logPos.x + 65, sideLogHeight / 2.5, logPos.z);

    logs.add(centerLog1);
    logs.add(centerLog2);
    logs.add(rightLog);
    logs.add(leftLog);

    bridge.add(logs);

    // logPos.x -= 100;
    logPos.z += 100;

    if (i > 15) {
      centerLogHeight -= 3;
      sideLogHeight -= 3;
    } else {
      centerLogHeight += 3;
      sideLogHeight += 3;
    }
  }

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(windowWidth, windowHeight);
  renderer.setClearColor(0x000000, 1.0);

  document.body.appendChild(renderer.domElement);

  animation();

  function animation() {
    requestAnimationFrame(animation);
    // camera.lookAt(new THREE.Vector3(0, 0, 0));
    renderer.render(scene, camera);
  }
}

export function bridge() {
  let bridge = new THREE.Object3D();

  let centerLogHeight = 90;
  let sideLogHeight = 100;
  let bottomLogLength = 110;

  let logPos = {
    x: 0,
    z: 0,
  };

  for (let i = 0; i < 30; i++) {
    let logs = new THREE.Object3D();

    let centerLogGeometry = new THREE.CylinderGeometry(3, 3, centerLogHeight, 20, 0, false);
    let logMaterial = new THREE.MeshPhongMaterial({ color: 0xffff00 });
    let centerLog1 = new THREE.Mesh(centerLogGeometry, logMaterial);
    centerLog1.position.set(logPos.x - 20, centerLogHeight / 2, logPos.z);

    let centerLog2 = new THREE.Mesh(centerLogGeometry, logMaterial);
    centerLog2.position.set(logPos.x + 20, centerLogHeight / 2, logPos.z);

    let rightLogGeometry = new THREE.CylinderGeometry(3, 3, sideLogHeight, 20, 0, false);
    let rightLog = new THREE.Mesh(rightLogGeometry, logMaterial);
    rightLog.rotation.z = -Math.PI / 15;
    rightLog.position.set(logPos.x - 65, sideLogHeight / 2.5, logPos.z);

    let leftLogGeometry = new THREE.CylinderGeometry(3, 3, sideLogHeight, 20, 0, false);
    let leftLog = new THREE.Mesh(leftLogGeometry, logMaterial);
    leftLog.rotation.z = Math.PI / 15;
    leftLog.position.set(logPos.x + 65, sideLogHeight / 2.5, logPos.z);

    logs.add(centerLog1);
    logs.add(centerLog2);
    logs.add(rightLog);
    logs.add(leftLog);

    bridge.add(logs);

    logPos.z += 100;

    if (i > 15) {
      centerLogHeight -= 3;
      sideLogHeight -= 3;
    } else {
      centerLogHeight += 3;
      sideLogHeight += 3;
    }
  }
}
