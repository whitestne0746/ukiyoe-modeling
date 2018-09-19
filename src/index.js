import bridge from './bridge';

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

  let plane = new THREE.Mesh(
    new THREE.PlaneGeometry(10000, 10000),
    new THREE.MeshPhongMaterial({ color: 0x8b4513 })
  );
  plane.rotation.x = -Math.PI / 2;
  scene.add(plane);

  let centerLogHeight = 90;
  let sideLogHeight = 100;
  let bottomLogLength = 110;

  let bridge = new THREE.Object3D();
  scene.add(bridge);

  let logPos = {
    x: 300,
    z: -4800,
  };

  let theta = Math.PI / 4;
  for (let i = 0; i < 30; i++) {
    let logs = new THREE.Object3D();

    let centerLogGeometry = new THREE.CylinderGeometry(3, 3, centerLogHeight, 20, 0, false);
    let logMaterial = new THREE.MeshPhongMaterial({ color: 0xffff00 });
    let centerLog1 = new THREE.Mesh(centerLogGeometry, logMaterial);
    centerLog1.rotation.y = -theta;
    // centerLog1.rotation.z = -Math.PI / 19;
    centerLog1.position.set(logPos.x - 20 * Math.cos(theta), centerLogHeight / 2, logPos.z - 20 * Math.sin(theta));
    // centerLog.position.set(x, centerLogHeight / 2, 0);
    // centerLogGeometry.applyMatrix(new THREE.Matrix4().makeTranslation(logPos.x, centerLogHeight / 2, logPos.z));

    let centerLog2 = new THREE.Mesh(centerLogGeometry, logMaterial);
    centerLog2.rotation.y = -theta;
    // centerLog2.rotation.z = Math.PI / 19;
    centerLog2.position.set(logPos.x + 20 * Math.cos(theta), centerLogHeight / 2, logPos.z + 20 * Math.sin(theta));

    let rightLogGeometry = new THREE.CylinderGeometry(3, 3, sideLogHeight, 20, 0, false);
    let rightLog = new THREE.Mesh(rightLogGeometry, logMaterial);
    rightLog.rotation.z = -Math.PI / 15;
    rightLog.rotation.y = -theta;
    rightLog.position.set(logPos.x - 65 * Math.cos(theta), sideLogHeight / 2.5, logPos.z - 65 * Math.sin(theta));
    // rightLog.position.set(x - 35, sideLogHeight / 2.5, 0);
    // rightLogGeometry.applyMatrix(new THREE.Matrix4().makeTranslation(logPos.x - 35, sideLogHeight, logPos.z));

    let leftLogGeometry = new THREE.CylinderGeometry(3, 3, sideLogHeight, 20, 0, false);
    let leftLog = new THREE.Mesh(leftLogGeometry, logMaterial);
    leftLog.rotation.z = Math.PI / 15;
    leftLog.rotation.y = -theta;
    leftLog.position.set(logPos.x + 65 * Math.cos(theta), sideLogHeight / 2.5, logPos.z + 65 * Math.sin(theta));
    // leftLog.position.set(x + 35, sideLogHeight / 2.5, 0);
    // leftLogGeometry.applyMatrix(new THREE.Matrix4().makeTranslation(logPos.x + 35, -sideLogHeight, logPos.z));

    logs.add(centerLog1);
    logs.add(centerLog2);
    logs.add(rightLog);
    logs.add(leftLog);

    // logs.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));

    /*
    let quaternion = logs.quaternion;
    let target = new THREE.Quaternion();
    let axis = new THREE.Vector3(0, 1, 0).normalize();
    target.setFromAxisAngle(axis, Math.PI / 2);
    target.multiply(quaternion.clone());
    quaternion.copy(target);
    */

    // logs.rotation.y = -Math.PI / 4;
    // logs.position.set(logPos.x, centerLogHeight / 2, logPos.z);
    // centerLog.position.set(logPos.x, centerLogHeight / 2, logPos.z);

    // scene.add(logs);

    bridge.add(logs);

    logPos.x -= 100;
    logPos.z += 50;

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
