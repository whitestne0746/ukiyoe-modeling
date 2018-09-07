window.addEventListener('DOMContentLoaded', init);

function init() {
  let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 20000);
  camera.position.set(0, 300, -2000);

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

  // 各座標の初期値
  let x = 1000;
  let y = 0;
  let z = 0;
  let deg = 0;
  let rad = 0;
  for (let i = 0; i < 72; i++) {
    let lineGeo = new THREE.Geometry();
    for (let k = 0; k < 800; k++) {
      y = 0.0009 * (k + 1) * (k + 1);
      x -= Math.cos(rad);
      z -= Math.sin(rad);
      let rand = Math.random() * 10;
      if (rand < 1) {
        if (y > 50) {
          y = y - Math.random() * 1;
        }
        x = x - Math.random() * 1;
        z = z - Math.random() * 1;
      } else if (rand >= 1 && rand < 2) {
        y = y + Math.random() * 1;
        x = x + Math.random() * 1;
        z = z + Math.random() * 1;
      }
      lineGeo.vertices.push(new THREE.Vector3(x, y, z));
    }
    let line = new THREE.Line(lineGeo, new THREE.LineBasicMaterial({ color: 0x000000 }));
    scene.add(line);
    y = 0;
    deg += 5;
    rad = deg * (Math.PI / 180);
    x = 1000 * Math.cos(rad);
    z = 1000 * Math.sin(rad);
  }

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0xffffff, 1.0);

  document.body.appendChild(renderer.domElement);

  animation();

  function animation() {
    requestAnimationFrame(animation);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    renderer.render(scene, camera);
  }
}
