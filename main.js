import * as THREE from 'three'
import Stat from 'three/examples/jsm/libs/stats.module'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// 场景：- 3d 容器
var scene = new THREE.Scene()
const stat = new Stat()

// 辅助参考坐标系
var axes = new THREE.AxesHelper(2, 2, 2)
scene.add(axes)

var aspect = window.innerWidth / window.innerHeight
// 相机
var camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000)
camera.position.set(0, 0, 5)
camera.lookAt(0, 0, 0)

var renderer = new THREE.WebGL1Renderer()
// 初始化, 设置窗口大小
// 渲染器
renderer.setSize(window.innerWidth, window.innerHeight)
// 渲染器dom结构
// console.log(renderer.domElement) // 这个就是个canvas
document.body.appendChild(renderer.domElement)
document.body.appendChild(stat.domElement)

const orbitControls = new OrbitControls(camera, renderer.domElement)

// var geometry = new THREE.BoxGeometry(1, 1, 1)
// var material = new THREE.MeshNormalMaterial() // 这个是根据法向量的，因为每个面的发线都不一样，所以每个面的颜色都不一样

// // 物体: geometry (几何体，骨架) + material (材质，皮肤)
// var cube = new THREE.Mesh(geometry, material)
// // cube.position.set(1, 1, 1)
// cube.rotation.z = THREE.MathUtils.degToRad(45)
// // cube.rotation.z = 45 / 180 * Math.PI
// // cube.scale.set(2, 2, 2)
// scene.add(cube)
// // camera.position.z = 5

let cubes = []
// 创建cube的方法
function createCube () {
	var geometry = new THREE.BoxGeometry(1, 1, 1)
	var material = new THREE.MeshBasicMaterial({
		color: 0xffffff * Math.random()
	})

	var cube = new THREE.Mesh(geometry, material)
	cube.position.x = (Math.random() - 0.5) * 10
	cube.position.y = (Math.random() - 0.5) * 4
	cube.position.z = (Math.random() - 0.5) * 4

	cubes.push(cube)

	orbitControls.update()
}

for (let i = 0; i < 20; i++) {
	createCube()
}

cubes.forEach(cube => {
	scene.add(cube)
})

// 渲染方式
// let time = Date.now()
// var render = function () {
// 	let currentTime = Date.now()
// 	let deltaTime = currentTime - time
// 	time = currentTime
// 	console.log(deltaTime)
// 	cube.rotation.z += deltaTime * 0.001
// 	// cube.rotation.x += 0.1
// 	// cube.rotation.y += 0.1
// 	// cube.rotation.y = THREE.MathUtils.degToRad(45)
// 	renderer.render(scene, camera)
// 	// stat.update()
// 	requestAnimationFrame(render)
// }
// render()

const clock = new THREE.Clock()

var render = function () {
	const time = clock.getElapsedTime()
	// cube.rotation.z = time
	// cube.position.x = Math.sin(time)
	// cube.position.y = Math.cos(time)

	cubes.forEach((cube, index) => {
		cube.rotation.x = time * 0.4 + index
		cube.rotation.y = time * 0.4 + index
	})
	// console.log(time)
	renderer.render(scene, camera)
	requestAnimationFrame(render)
}

render()


// setInterval(()=>{
// 	cube.rotation.z += 0.01
// 	renderer.render(scene, camera)
// }, 1000/60)