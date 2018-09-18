window.addEventListener('DOMContentLoaded', init);

function init() {
  let camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 2000000);
  camera.position.set(0, 1500, -20000);

  let controls = new THREE.OrbitControls(camera);

  let scene = new THREE.Scene();

  let light = new THREE.DirectionalLight('#ffffff');
  light.intensity = 2;
  light.position.set(1, 1, 1);
  scene.add(light);

  let amb = new THREE.AmbientLight('#464646');
  scene.add(amb);

  let plane = new THREE.Mesh(
    new THREE.PlaneGeometry(100000, 100000),
    new THREE.MeshPhongMaterial({ color: 0x8b4513 })
  );
  plane.rotation.x = -Math.PI / 2;
  scene.add(plane);

  let fujiHeight = 25000;
  let geometry1 = new THREE.CylinderGeometry(6000, 40000, fujiHeight, 36, 32, false);
  let fujiMount = new THREE.Mesh(
    geometry1,
    new THREE.MeshPhongMaterial(
      {
        /*
        map: texture,
        bumpMap: texture,
        bumpScale: 0.05,
        */
        color: 0xffff00,
      }
    )
  );
  fujiMount.overdraw = true;
  fujiMount.position.set(15000, fujiHeight / 2, 20000);
  scene.add(fujiMount);

  let simplexNoise = new SimplexNoise();
  for (var i = 0; i < geometry1.vertices.length; i++) {
    var v = geometry1.vertices[i];
    // v.z = v.z + 30 * simplexNoise.noise(v.x / 50, v.y / 50);
    v.y = v.y + 800 * simplexNoise.noise(v.z / 50, v.x / 50);
    geometry1.vertices[i] = v;
  }

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(1440, 960);
  renderer.setClearColor(0x000000, 1.0);

  document.body.appendChild(renderer.domElement);

  animation();

  function animation() {
    requestAnimationFrame(animation);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    renderer.render(scene, camera);
  }
}
