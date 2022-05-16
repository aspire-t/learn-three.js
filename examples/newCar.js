import * as THREE from 'three'
import Stat from 'three/examples/jsm/libs/stats.module'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const stat = new Stat()
const w = window.innerWidth
const h = window.innerHeight

let scene = new THREE.Scene()

// 相机 Camera
var camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000)
camera.position.set(0, 0, 5)
camera.lookAt(0, 0, 0)

// 渲染器 renderer
var renderer = new THREE.WebGL1Renderer()
renderer.setSize(w, h)

document.body.appendChild(renderer.domElement)
document.body.appendChild(stat.domElement)

const orbitControls = new OrbitControls(camera, renderer.domElement)

const clock = new THREE.Clock()

var render = function () {
	const time = clock.getElapsedTime()

	renderer.render(scene, camera)
	requestAnimationFrame(render)
	stat.update()
	orbitControls.update()
}

render()

