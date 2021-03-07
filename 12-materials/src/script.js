import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Plane } from 'three'
import * as dat from 'dat.gui'

// Loading textures
const textureLoader = new THREE.TextureLoader()
const cubeTextureLoader = new THREE.CubeTextureLoader()

const colorTexture = textureLoader.load('textures/door/color.jpg')
const alphaTexture = textureLoader.load('textures/door/alpha.jpg')
const heightTexture = textureLoader.load('textures/door/height.jpg')
const normalTexture = textureLoader.load('textures/door/normal.jpg')
const ambientOcclusionTexture = textureLoader.load('textures/door/ambientOcclusion.jpg')
const metalinessTexture = textureLoader.load('textures/door/metalness.jpg')
const roughnessTexture = textureLoader.load('textures/door/roughness.jpg')
const gradientTexture = textureLoader.load('textures/gradients/5.jpg')
gradientTexture.magFilter = THREE.NearestFilter
gradientTexture.minFilter = THREE.NearestFilter
gradientTexture.generateMipmaps = false
const matcapTexture = textureLoader.load('textures/matcaps/8.png')

const environmentMapTexure = cubeTextureLoader.load([
    '/textures/environmentMaps/4/px.png',
    '/textures/environmentMaps/4/nx.png',
    '/textures/environmentMaps/4/py.png',
    '/textures/environmentMaps/4/ny.png',
    '/textures/environmentMaps/4/pz.png',
    '/textures/environmentMaps/4/nz.png'
])

const gui = new dat.GUI()
/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// const material = new THREE.MeshStandardMaterial()
// material.metalness = 0.45
// material.roughness = 0.65
// material.map = colorTexture
// material.aoMap = ambientOcclusionTexture
// material.aoMapIntensity = 1
// material.displacementMap = heightTexture
// material.displacementScale = 0.05
// material.metalnessMap = metalinessTexture
// material.roughnessMap = roughnessTexture
// material.normalMap = normalTexture
// material.normalScale.set(0.5, 0.5)
// material.side = THREE.DoubleSide
// material.transparent = true
// material.alphaMap = alphaTexture


const material = new THREE.MeshStandardMaterial()
material.metalness = 0.7
material.roughness = 0.2
material.envMap = environmentMapTexure

gui.add(material, 'metalness').min(0).max(1).step(0.001)
gui.add(material, 'roughness').min(0).max(1).step(0.001)
gui.add(material, 'aoMapIntensity').min(-10).max(10).step(0.001)
gui.add(material, 'displacementScale').min(-1).max(1).step(0.001)
// gui.add(material, 'normalScale.set').min(-1).max(1).step(0.001)

// const material = new THREE.MeshToonMaterial({})
// material.gradientMap = gradientTexture
// material.shininess = 100
// material.specular = new THREE.Color(0x00ff00)
// const material = new THREE.MeshDepthMaterial()

// const material = new THREE.MeshMatcapMaterial({
//     matcap: matcapTexture
// })

// const material = new THREE.MeshNormalMaterial({ 
//     flatShading: true
// })
// material.map = colorTexture
// material.wireframe = true;
// material.side = THREE.DoubleSide
// material.transparent = true
// material.opacity = 0.5
// material.alphaMap = alphaTexture

const sphere = new THREE.Mesh(
    new THREE.SphereBufferGeometry(0.5, 64, 64),
    material
)
sphere.position.x = -1.5
sphere.geometry.setAttribute(
    'uv2', 
    new THREE.BufferAttribute(sphere.geometry.attributes.uv.array, 2)
)

const plane = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(1, 1, 100, 100),
    material
)
plane.geometry.setAttribute(
    'uv2', 
    new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2)
)

const torus = new THREE.Mesh(
    new THREE.TorusBufferGeometry(0.3, 0.2, 64, 128),
    material
)
torus.geometry.setAttribute(
    'uv2', 
    new THREE.BufferAttribute(torus.geometry.attributes.uv.array, 2)
)
torus.position.x = 1.5
scene.add(sphere, plane, torus)
/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
const pointLight = new THREE.PointLight(0xffffff, 0.5)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4

scene.add(ambientLight, pointLight)

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // update objects
    sphere.rotation.y = 0.1 * elapsedTime
    plane.rotation.y = 0.1 * elapsedTime
    torus.rotation.y = 0.1 * elapsedTime

    sphere.rotation.x = 0.15 * elapsedTime
    plane.rotation.x = 0.15 * elapsedTime
    torus.rotation.x = 0.15 * elapsedTime

    // torus.position.x = Math.sin(elapsedTime)
    // torus.position.y = Math.cos(elapsedTime)

    // mesh.position.x = Math.sin(elapsedTime)


    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()