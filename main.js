import * as THREE from 'three'

// 场景：- 3d 容器
var scene = new THREE.Scene()
var aspect = window.innerWidth / window.innerHeight
// 相机
var camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000)
var renderer = new THREE.WebGL1Renderer()
// 初始化, 设置窗口大小
// 渲染器
renderer.setSize(window.innerWidth, window.innerHeight)
// 渲染器dom结构
document.body.appendChild(renderer.domElement)

var geometry = new THREE.BoxGeometry(1, 1, 1)
var material = new THREE.MeshNormalMaterial()
// 物体: geometry (几何体，骨架) + material (材质，皮肤)
var cube = new THREE.Mesh(geometry, material)
scene.add(cube)
camera.position.z = 5

var render = function () {
	requestAnimationFrame(render)
	cube.rotation.x += 0.1
	cube.rotation.y += 0.1
	renderer.render(scene, camera)
}

render()