import * as THREE from 'three'
import Stat from 'three/examples/jsm/libs/stats.module'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const stat = new Stat()
const w = window.innerWidth
const h = window.innerHeight

let scene = new THREE.Scene()

//公共的材质
const material = new THREE.MeshNormalMaterial()

// 整个车 group
const car = new THREE.Group()
// 前轮 group
const frontWheels = new THREE.Group()

// 左前轮wheel1 - group
const wheel1 = new THREE.Group()
// TorusGeometry https://threejs.org/docs/index.html#api/en/geometries/TorusGeometry
const wheelG = new THREE.TorusGeometry(0.5, 0.1, 10, 20)
const wheel1Mesh = new THREE.Mesh(wheelG, material)

// 车轱辘
const n = 10
for(let i = 0; i < n; i++) {
	const g = new THREE.CylinderBufferGeometry(0.03, 0.03, 1)
	const mesh = new THREE.Mesh(g, material)
	mesh.rotation.z = Math.PI * 2 / n * i 
	wheel1.add(mesh)
}

wheel1.add(wheel1Mesh)

// 车轴
const len = 2
const cylinderG = new THREE.CylinderGeometry(0.05, 0.05, len)
const cylinder = new THREE.Mesh(cylinderG, material)
cylinder.rotation.x = -0.5 * Math.PI

// 移动车轮z轴，让车轴连接两端
wheel1.position.z = -len / 2

// 车轮2 clone wheel1 就可以了
const wheel2 = wheel1.clone()
wheel2.position.z = len / 2

frontWheels.add(wheel1, cylinder, wheel2)
// 旋转90度
frontWheels.rotation.y = 0.5 * Math.PI
frontWheels.position.y = -1

// 后面的两个轮子 backWheels 
const backWheels = frontWheels.clone()
backWheels.position.y = 1

/**************************/
// 车身 body group
const body = new THREE.Group()
const cubeG = new THREE.BoxGeometry(1.6, 3.4, 0.5)
const cube = new THREE.Mesh(cubeG, material)

// 车顶
// https://threejs.org/docs/index.html#api/en/geometries/CylinderGeometry
const roofG = new THREE.CylinderGeometry(1.4, 1.4, 1.6, 3, 1, false, -Math.PI / 2, Math.PI)
const roof = new THREE.Mesh(roofG, material)

roof.rotation.z = Math.PI / 2
roof.position.z = -0.2
body.add(cube, roof)
/***********************************/

car.add(frontWheels, backWheels, body)
scene.add(car)

/******************* */
// 地面
const planeG = new THREE.PlaneGeometry(20, 20)
const planeM = new THREE.MeshBasicMaterial({ color: 0xcccccc })
const plane = new THREE.Mesh(planeG, planeM)
scene.add(plane)
plane.rotation.x = -0.5 * Math.PI

car.rotation.x = -0.5 * Math.PI
car.position.y = 0.6
/********************* */


// 相机 Camera
var camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000)
camera.position.set(4, 2, 5)
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

	frontWheels.rotation.x = time
	backWheels.rotation.x = time

	car.position.z = time % 4 - 2

	renderer.render(scene, camera)
	requestAnimationFrame(render)
	stat.update()
	orbitControls.update()
}

render()

