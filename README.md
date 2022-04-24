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

### Unit Cycle

![](./images/旋转角度.jpg)

```js
// 旋转45度
cube.rotation.y = THREE.MathUtils.degToRad(45)
```