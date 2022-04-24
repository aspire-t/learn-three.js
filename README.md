# 学习 three.js

一个three.js场景的基本组成
![](./images/%E5%9F%BA%E6%9C%AC%E7%BB%84%E6%88%90.jpg)

补充：Mesh 通常表示面， 还可以是点，线
webgl图元：
1 * 点， 3 * 线， 3 * 面

在webgl中，所有的面都是三角面

## Object

Object 包括： point, line, mesh
但无论哪种，都是由 geometry + material 组成的

## Camera

Camera 和scene 其实不是父子关系，他是一半在scene里面，一半在scene外面的

## transform

- Position	 位置
- rotation	 旋转
- scale			 缩放

这3个对应 webgl中的 MVP 矩阵
Model
View
Projection 投影

three.js 	中，rgb，对应的就是xyz
![](images/XYZ.jpg)

### position

```js
// 写法一
cube.position.x = 1
cube.position.y = 1
cube.position.z = 1
// 写法二
cube.position.set(1,1,1)

console.log(cube.position) // 返回的是Vector3这个对象, 就是 x,y,z
```

### rotation

```js
cube.rotation.y = 45 / 180 * Math.PI
cube.rotation.x = 45 / 180 * Math.PI
cube.rotation.z = 45 / 180 * Math.PI

console.log(cube.rotation) // 返回的是Euler这个对象， 
```

两种旋转45度的方法，也说明了webgl中用的是弧度制
> tips: 其实可以不用旋转3个轴，旋转两个轴就可以，可以从数学上证明，旋转两个轴就可以旋转到任意位置。

```js
// 旋转45度
cube.rotation.z = THREE.MathUtils.degToRad(45)
cube.rotation.z = 45 / 180 * Math.PI
```

### scale

```js
// 写法一
cube.scale.x = 2
cube.scale.y = 2
cube.scale.z = 2
// 写法二
cube.scale.set(2,2,2)

console.log(cube.scale) // 返回的也是Vector3这个对象
```

### Unit Cycle

![](./images/旋转角度.jpg)

