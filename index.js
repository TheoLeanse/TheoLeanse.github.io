const renderer = getRenderer();
document.body.appendChild(renderer.domElement);

const scene = getScene();
const camera = getCamera();
const loader = new THREE.OBJLoader();
var controls = new THREE.OrbitControls( camera );
let face;
loader.load(
	'my-face.obj',
	object => {
		object.rotation.set(0, 1, 0)
		object.children[0].geometry.center()
		face = object;
		scene.add(object)
	}
);

var ambientLight = new THREE.AmbientLight(0xffffff, 0.0002, 10);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, .50);
pointLight.position.set(10, 10, 10);
scene.add(pointLight);

const pointLight4 = new THREE.PointLight( 0xffffff, 10 );
pointLight4.position.set( 0, -10, 0 );
scene.add( pointLight4 );


function render () {
	requestAnimationFrame(render);
	controls.update();
	if (face) {
		face.rotation.x += 0.005;
		face.rotation.y += 0.005;
		const upper = 100 / (camera.position.x + 0.001);
		camera.position.x = camera.position.x - upper;
		if (-1000 > camera.position.x || camera.position.x > 1000) {
			camera.position.x = Math.floor(Math.random() * 500) + 1
		}
	}
	renderer.render(scene, camera);
}

render()

function getScene () {
	return new THREE.Scene();
}

function getRenderer () {
	const renderer = new THREE.WebGLRenderer({
		antialias: true,
		alpha: false
	});
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;
	return renderer;
}

function getCamera () {
	const camera = new THREE.PerspectiveCamera(
		75,
		window.innerWidth / window.innerHeight,
		0.1,
		1000
	);
	camera.position.set(200, 0, 0);
	camera.lookAt(new THREE.Vector3(0, 0, 0));
	return camera;
}
