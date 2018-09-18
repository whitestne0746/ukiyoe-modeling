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

  // let texture = new THREE.ImageUtils.loadTexture('./pictures/fuji_texture.png');

  let geometry = new THREE.CylinderGeometry(200, 1000, 1000, 36, 32, false);
  let cylinder = new THREE.Mesh(
    geometry,
    new THREE.MeshPhongMaterial(
      {
        /*
        map: texture,
        bumpMap: texture,
        bumpScale: 0.05,
        */
       color: 0xffffff,
      }
    )
  );
  cylinder.overdraw = true;
  scene.add(cylinder);

  let simplexNoise = new SimplexNoise();
  for (var i = 0; i < geometry.vertices.length; i++) {
    var v = geometry.vertices[i];
    v.z = v.z + 30 * simplexNoise.noise(v.x / 50, v.y / 50);
    v.y = v.y + 50 * simplexNoise.noise(v.z / 50, v.x / 50);
    geometry.vertices[i] = v;
  }

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 1.0);

  document.body.appendChild(renderer.domElement);

  animation();

  function animation() {
    requestAnimationFrame(animation);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    renderer.render(scene, camera);
  }
}
