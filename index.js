window.addEventListener('DOMContentLoaded', init);

function init() {
  let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 2000);
  camera.position.set(-1000, 300, 0);

  let scene = new THREE.Scene();

  let light = new THREE.DirectionalLight('#ffffff');
  light.intensity = 2;
  light.position.set(1, 1, 1);
  scene.add(light);

  let amb = new THREE.AmbientLight('#464646');
  scene.add(amb);

  let plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1000, 1000),
    new THREE.MeshPhongMaterial({color: 0x8b4513}));
  plane.rotation.x = -Math.PI / 2;
  scene.add(plane);

  let lineGeo = new THREE.Geometry();

  lineGeo.vertices.push(new THREE.Vector3(150, 0, 0));
  lineGeo.vertices.push(new THREE.Vector3(0, 400, 0));

  let line = new THREE.Line(lineGeo, new THREE.LineBasicMaterial({color: 0x990000}));

  scene.add(line);

  const renderer = new THREE.WebGLRenderer({antialias: true});
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
