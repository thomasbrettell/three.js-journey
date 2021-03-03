import './style.css'
import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
mesh.position.x = 0.7
mesh.position.y = -0.6
mesh.position.z = 1
scene.add(mesh)

mesh.scale.x=2
mesh.scale.y=.5
mesh.scale.z=.5
// mesh.position.set(1, 1, 1)

mesh.rotation.reorder('YXZ') //confusing but important
mesh.rotation.y = Math.PI * .25
mesh.rotation.x = Math.PI * .25

const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper)

// mesh.position.normalize() //normalise the position
// console.log(mesh.position.length()); //distance between mesh and center of scene

/**
 * Sizes
 */
const sizes = {
    width: 800,
    height: 600
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
// camera.position.y = 1
// camera.position.x = 1
scene.add(camera)

camera.lookAt(mesh.position)

// console.log(mesh.position.distanceTo(camera.position)); //distance between mesh and the camera

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)