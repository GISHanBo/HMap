import "../css/index.css";
import {RenderTool} from "./lib_webgl/cuon-utils-ES6";
import {Transform} from "./coordinate/Transform";

let VSHEADER_SOURCE =
    `attribute vec4 a_Position;
    void main(){
    gl_Position = a_Position;
    gl_PointSize = 10.0;
    }
    `;
let FSHEADER_SOURCE =
    `
    precision mediump float;
    uniform vec4 u_FragColor;
    void main(){
    gl_FragColor = u_FragColor;
    }
    `;
main();

function main() {
    //获取上下文对象
    const canvas = document.querySelector("#glcanvas");
    initCanvas(canvas);

    const gl = canvas.getContext("webgl");
    //检测WebGL支持
    if (!gl) {
        console.error("浏览器不支持WebGL");
        return
    }
    if (!RenderTool.initShaders(gl, VSHEADER_SOURCE, FSHEADER_SOURCE)) {
        console.error("初始化着色器失败");
        return
    }

    let a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    let u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');

    canvas.onmousedown = function (ev) {
        click(ev, gl, canvas, a_Position, u_FragColor);
    };
    //设置背景色
    gl.clearColor(0.0, 0.0, 0.0, 1);
    //设置缓冲区颜色
    gl.clear(gl.COLOR_BUFFER_BIT);
}


let points = [];//鼠标点数组
let colors = [];

function click(ev, gl, canvas, a_Position, u_FragColor) {
    //屏幕坐标系转WebGL坐标系
    let x = ev.clientX;//鼠标点击处的X坐标
    let y = ev.clientY;//鼠标点击处的Y坐标
    let result = Transform.ScreenToWebGL(canvas, x, y);
    points.push([result.x, result.y]);
    if (result.x>0&&result.y>0) {
        colors.push([1.0,0.0,0.0,1.0])
    } else if (result.x>0&&result.y<0) {
        colors.push([0.0,1.0,0.0,1.0])
    } else if (result.x<0&&result.y>0) {
        colors.push([1.0,0.0,1.0,1.0])
    } else {
        colors.push([0.0,0.0,1.0,1.0])
    }

    gl.clear(gl.COLOR_BUFFER_BIT);//清除之前绘制的点
    for (let i = 0; i < points.length; i ++) {
        let point=points[i];
        let color=colors[i];
        //重新绘制点
        gl.vertexAttrib3f(a_Position, point[0],point[1], 0.0);
        gl.uniform4f(u_FragColor,color[0],color[1],color[2],color[3]);
        gl.drawArrays(gl.POINTS, 0, 1)
    }

}

/**
 * 设置画布全屏
 * @param canvas
 */
function initCanvas(canvas) {
    canvas.width = document.documentElement.clientWidth;
    canvas.height = document.documentElement.clientHeight;
}

