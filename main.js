import * as THREE from 'three'

var scene = new THREE.Scene()
var aspect = window.innerWidth / window.innerHeight
var camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000)
var renderer = new THREE.WebGL1Renderer()

renderer.setSize(window.innerWidth, window.innerHeight)

document.body.appendChild(renderer.domElement)
