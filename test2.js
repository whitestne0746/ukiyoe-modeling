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

  for (var i = 0; i < 300; i++) {
    // 頂点ベクトルの配列
    var vertices = [];
    for (var j = 0; j < 100; j++) {
      vertices.push(new THREE.Vector3(Math.random() * 100, Math.random() * 100, Math.random() * 100));
    }
    geometry = new THREE.ConvexGeometry(vertices);
    material = new THREE.MeshLambertMaterial({ color: 0xffffff, transparent: true, opacity: 0.2 });
    var convex = new THREE.Mesh(geometry, material);// 与えられた頂点から凹みのない立体を作成
    scene.add(convex);
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
