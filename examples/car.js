import * as THREE from 'three'
import Stat from 'three/examples/jsm/libs/stats.module'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const stat = new Stat()
const w = window.innerWidth
const h = window.innerHeight

var scene = new THREE.Scene()

//材质
const material = new THREE.MeshNormalMaterial()

// 整个汽车 car - group
const car = new THREE.Group()

// 车身 body - group
const body = new THREE.Group()

const bodyCube = new THREE.Mesh(
	new THREE.BoxGeometry(1, 2, 0.5),
	material
)

const bodyPeople = new THREE.Mesh(
	new THREE.BoxGeometry(0.5, 0.5, 0.5),
	new THREE.MeshBasicMaterial({color: 0xff0000})
)

bodyPeople.position.z = 0.5

body.add(bodyCube)
body.add(bodyPeople)

car.add(body)

// 轮子1 - group
const wheelGroup1 = new THREE.Group()
const wheel1 = new THREE.Mesh(
	new THREE.BoxGeometry(0.1, 0.7, 0.7),
	material
)
wheelGroup1.position.set(-0.7, 0.6, 0)
wheelGroup1.add(wheel1)
car.add(wheelGroup1)

// 轮子2 - group
const wheelGroup2 = new THREE.Group()
const wheel2 = new THREE.Mesh(
	new THREE.BoxGeometry(0.1, 0.7, 0.7),
	material
)
wheelGroup2.position.set(0.7, 0.6, 0)
wheelGroup2.add(wheel2)
car.add(wheelGroup2)

// 轮子3 - group
const wheelGroup3 = wheelGroup1.clone() // clone一个group
wheelGroup3.position.y = -0.6
car.add(wheelGroup3)

// 轮子4 - group
const wheelGroup4 = wheelGroup2.clone()
wheelGroup4.position.y = -0.6
car.add(wheelGroup4)

// 轮胎 - group 轮子的代码是重点
const circle = new THREE.Group()

let n = 20
for (let i = 0; i < n; i++) {
	let r = 0.5 // 半径
	const geometry = new THREE.BoxGeometry(0.1, 0.1, 0.2)
	const mesh = new THREE.Mesh(geometry, material)
  // x 是让mesh 平铺
	mesh.position.x = r * Math.cos(Math.PI * 2 / n * i)
	// y 是高度不一样
	mesh.position.y = r * Math.sin(Math.PI * 2 / n * i)
	circle.add(mesh)
}
circle.rotation.y = -0.5 * Math.PI

wheelGroup1.add(circle)
wheelGroup2.add(circle.clone())
wheelGroup3.add(circle.clone())
wheelGroup4.add(circle.clone())

scene.add(car)

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

	car.position.y = time % 4 - 2 // 车的移动距离是(-2, 2)

	wheelGroup1.rotation.x = -time
	wheelGroup2.rotation.x = -time
	wheelGroup3.rotation.x = -time
	wheelGroup4.rotation.x = -time

	renderer.render(scene, camera)
	requestAnimationFrame(render)
	stat.update()
	orbitControls.update()
}

render()
