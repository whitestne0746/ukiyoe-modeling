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

  let centerLogHeight = 70;
  let sideLogHeight = 80;
  /*
  let centerLogGeometry = new THREE.CylinderGeometry(3, 3, centerLogHeight, 20, 0, false);
  let logMaterial = new THREE.MeshPhongMaterial({ color: 0xffff00 });
  let centerLog = new THREE.Mesh(centerLogGeometry, logMaterial);
  centerLog.position.set(300, centerLogHeight / 2, -4800);
  scene.add(centerLog);

  let sideLogHeight = 80;
  let rightLogGeometry = new THREE.CylinderGeometry(3, 3, rightLogHeight, 20, 0, false);
  let rightLog = new THREE.Mesh(rightLogGeometry, logMaterial);
  rightLog.rotation.z = -Math.PI / 13;
  rightLog.position.set(265, rightLogHeight / 2.5, -4800);
  scene.add(rightLog);
  */

  let logs = new THREE.Group();

  let logPos = {
    x: 300,
    z: -4800,
  };

  for (let i = 0; i < 30; i++) {
    let centerLogGeometry = new THREE.CylinderGeometry(3, 3, centerLogHeight, 20, 0, false);
    let logMaterial = new THREE.MeshPhongMaterial({ color: 0xffff00 });
    let centerLog = new THREE.Mesh(centerLogGeometry, logMaterial);
    centerLog.position.set(logPos.x, centerLogHeight / 2, logPos.z);

    let rightLogGeometry = new THREE.CylinderGeometry(3, 3, sideLogHeight, 20, 0, false);
    let rightLog = new THREE.Mesh(rightLogGeometry, logMaterial);
    rightLog.rotation.z = -Math.PI / 13;
    rightLog.position.set(logPos.x - 35, sideLogHeight / 2.5, logPos.z);

    let leftLogGeometry = new THREE.CylinderGeometry(3, 3, sideLogHeight, 20, 0, false);
    let leftLog = new THREE.Mesh(leftLogGeometry, logMaterial);
    leftLog.rotation.z = Math.PI / 13;
    leftLog.position.set(logPos.x + 35, sideLogHeight / 2.5, logPos.z);

    logs.add(centerLog);
    logs.add(rightLog);
    logs.add(leftLog);

    logPos.x -= 70;
    logPos.z += 30;

    if (i > 15) {
      centerLogHeight -= 3;
      sideLogHeight -= 3;
    } else {
      centerLogHeight += 3;
      sideLogHeight += 3;
    }
  }

  scene.add(logs);

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
