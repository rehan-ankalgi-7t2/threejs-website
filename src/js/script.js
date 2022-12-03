import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import golfTexture from '../assets/golf-texture.webp'
import normalMap from '../assets/NormalMap.png'


// canvas
const canvas = document.querySelector('.webgl')
const renderer = new THREE.WebGL1Renderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(window.innerWidth, window.innerHeight)

// scene
const scene = new THREE.Scene()

// texture loader
const textureLoader = new THREE.TextureLoader()


// camera
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)
camera.position.set(0, 0, 10)
scene.add(camera)

// orbit controls
const controls = new OrbitControls(camera, canvas)
// scene.add(controls)
controls.update()

// geometry objects
const sphereGeometry = new THREE.SphereGeometry(4, 64, 64)

// Materials
const sphereMaterial = new THREE.MeshStandardMaterial({
    color: 0x292929,
    metalness: 0.7,
    roughness: 0.2,
    normalMap: textureLoader.load(normalMap)
})

// Mesh
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
scene.add(sphere)


// lights
const light = new THREE.AmbientLight(0xffffff, 0.4)
light.position.set(2, 3, 4)
// scene.add(light)

const directionalLight = new THREE.PointLight( 0xFFFFFF , 0.2); // soft white light
scene.add( directionalLight );
directionalLight.position.set(-15, 30, 0);

const pointLight2 = new THREE.PointLight( 0xff0000 , 2.0); // soft white light
pointLight2.position.set(-2, 30, 0);
pointLight2.intensity = 1
scene.add( pointLight2 );

const pointLight3 = new THREE.PointLight( 0x0096ff , 2.0); // soft white light
pointLight3.position.set(200, -300, 20);
pointLight3.intensity = 1
scene.add( pointLight3 );

// sizes
window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / this.window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
})


// animation

let mouseX = 0
let mouseY = 0
let targetX = 0
let targetY = 0
let windowHalfX = window.innerWidth / 2
let windowHalfY = window.innerHeight / 2

const onMouseMove = (e) => {
    mouseX = e.clientX - windowHalfX
    mouseY = e.clientY - windowHalfY
}

document.addEventListener('mousemove', onMouseMove)
const animate = () => {
    targetX = mouseX * 0.001
    targetY = mouseY * 0.001

    sphere.rotation.y += 0.1 * (targetX - sphere.rotation.y)
    sphere.rotation.x += 0.1 * (targetY - sphere.rotation.x)
    sphere.rotation.z += 0.1 * (targetY - sphere.rotation.x)
    renderer.render(scene, camera)
    
    window.requestAnimationFrame(animate)
}
animate()

renderer.render(scene, camera)