import * as THREE from 'three'
import Stat from 'three/examples/jsm/libs/stats.module'

var scene = new THREE.Scene()
const stat = new Stat()

var aspect = window.innerWidth / window.innerHeight
// 相机
var camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000)
camera.position.set(0, 0, 5)
camera.lookAt(0, 0, 0)

let group = new THREE.Group()
let group2 = new THREE.Group()

var geometry = new THREE.SphereGeometry(0.5)
var material = new THREE.MeshBasicMaterial({
	color: 0xff0000
})
var earth = new THREE.Mesh(geometry, material)
group2.position.y = 2.5
group2.add(earth)

var geometry2 = new THREE.SphereGeometry(1)
var material2 = new THREE.MeshBasicMaterial({
	color: 0x00ff00
})
var sun = new THREE.Mesh(geometry2, material2)
group.add(sun)

var geometry3 = new THREE.SphereGeometry(0.2)
var material3 = new THREE.MeshBasicMaterial({
	color: 0x0000ff
})
var moon = new THREE.Mesh(geometry3, material3)
// moon的位置实际上是按照group2的位置而言的
moon.position.y = 0.8
group2.add(moon)

group.add(group2)
scene.add(group)

// 渲染器
var renderer = new THREE.WebGL1Renderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const clock = new THREE.Clock()

var render = function () {
	const time = clock.getElapsedTime()

	earth.rotation.z = time
	sun.rotation.z = time
	moon.rotation.z = time

	group.rotation.z = time
	group2.rotation.z = time

	renderer.render(scene, camera)
	requestAnimationFrame(render)
}

render()
