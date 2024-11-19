// Bandeau latéral rétractable
const sidebar = document.getElementById('sidebar');

// Faire apparaître le menu lorsqu'on survole le bord gauche de l'écran
document.addEventListener('mousemove', (event) => {
    if (event.clientX < 10) {
        sidebar.classList.add('open');
    }
});

sidebar.addEventListener('mouseleave', () => {
    sidebar.classList.remove('open');
});

// Configuration du fond interactif avec Three.js
const canvas = document.getElementById('background');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 1;

// Suivi de la souris pour l'effet interactif
let mouse = { x: 0, y: 0 };


// Vertex Shader
const vertexShader = `
varying vec2 vUv;

void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;

// Fragment Shader
const fragmentShader = `
uniform float time;
uniform vec2 mouse;
varying vec2 vUv;

void main() {
    float waveX = sin(vUv.x * 8.0 - time - mouse.x * 2.0) * 0.1;
    float waveY = cos(vUv.y * 8.0 - time - mouse.y * 2.0) * 0.1;
    float wave = waveX + waveY;

    vec3 baseColor = vec3(0.96, 0.93, 0.87); // Couleur crème
    vec3 color = baseColor + vec3(wave * 0.20, wave * 0.8, wave * 0.4);

    gl_FragColor = vec4(color, 2.0);
}`;


const shaderMaterial = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
        time: { value: 0 },
        mouse: { value: new THREE.Vector2(0, 0) }
    },
    transparent: true
});

const planeGeometry = new THREE.PlaneGeometry(2, 2);
const plane = new THREE.Mesh(planeGeometry, shaderMaterial);
scene.add(plane);

// Animation du fond interactif
function animate() {
    shaderMaterial.uniforms.time.value += 0.01;
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();

// Ajuster le canvas pour qu'il couvre tout l'écran lors du redimensionnement
function onWindowResize() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    // Ajuster le plan pour couvrir tout l'écran
    plane.scale.x = camera.aspect > 1 ? camera.aspect : 1;
    plane.scale.y = camera.aspect > 1 ? 1 : 1 / camera.aspect;
}

window.addEventListener('resize', onWindowResize);
onWindowResize();
