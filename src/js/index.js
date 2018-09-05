import "../css/index.css";
import {RenderTool} from "./lib_webgl/cuon-utils-ES6";
import {WebGL} from "./webgl/WebGL";
// import {Transform} from "./coordinate/Transform";
import pic1 from '../img/christmas.png';
import pic2 from '../img/windmill.png';

var VSHADER_SOURCE =
    `attribute vec4 a_Position;
     attribute vec2 a_TexCoord;
     varying vec2 v_TexCoord;
     void main() {
       gl_Position = a_Position;
       v_TexCoord = a_TexCoord;
     }`;

// Fragment shader program
var FSHADER_SOURCE =
    `#ifdef GL_ES
     precision mediump float;
     #endif
     uniform sampler2D u_Sampler0;
     uniform sampler2D u_Sampler1;
     varying vec2 v_TexCoord;
     void main() {
       vec4 color0 = texture2D(u_Sampler0, v_TexCoord);
       vec4 color1 = texture2D(u_Sampler1, v_TexCoord);
       gl_FragColor = color0 * color1;
     }`;

function main() {

    let canvas = document.getElementById('glcanvas');

    // 获取WebGL上下文对象
    const gl = WebGL.getWebGLContext(canvas);
    if (!gl) {
        console.log('获取 context for WebGL失败');
        return;
    }

    // 初始化着色器
    if (!RenderTool.initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.log('Failed to intialize shaders.');
        return;
    }

    // 设置顶点坐标
    let n = initVertexBuffers(gl);
    if (n < 0) {
        console.log('设置顶点信息失败');
        return;
    }

    // 设置背景色
    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    // 设置材质
    if (!initTextures(gl, n)) {
        console.log('Failed to intialize the texture.');
        return;
    }
}

function initVertexBuffers(gl) {
    let verticesTexCoords = new Float32Array([
        // 顶点坐标，材质坐标
        -0.5,  0.5,   0.0, 1.0,
        -0.5, -0.5,   0.0, 0.0,
        0.5,  0.5,   1.0, 1.0,
        0.5, -0.5,   1.0, 0.0,
    ]);
    let n = 4; // 顶点数量

    // 生成缓冲区对象
    let vertexTexCoordBuffer = gl.createBuffer();
    if (!vertexTexCoordBuffer) {
        console.log('生成缓冲区对象失败');
        return -1;
    }

    // 绑定缓冲区
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexTexCoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, verticesTexCoords, gl.STATIC_DRAW);

    let FSIZE = verticesTexCoords.BYTES_PER_ELEMENT;
    //
    let a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    if (a_Position < 0) {
        console.log('获取 a_Position失败');
        return -1;
    }
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE * 4, 0);
    gl.enableVertexAttribArray(a_Position);  // 开启缓冲区对象

    // 获取材质坐标存储
    var a_TexCoord = gl.getAttribLocation(gl.program, 'a_TexCoord');
    if (a_TexCoord < 0) {
        console.log('获取材质坐标失败');
        return -1;
    }
    gl.vertexAttribPointer(a_TexCoord, 2, gl.FLOAT, false, FSIZE * 4, FSIZE * 2);
    gl.enableVertexAttribArray(a_TexCoord);  //开启缓冲区

    return n;
}

function initTextures(gl, n) {
    // 新建材质
    let texture0 = gl.createTexture();
    let texture1 = gl.createTexture();
    if (!texture0 || !texture1) {
        console.log('新建材质失败');
        return false;
    }

    //获取取样器存储
    let u_Sampler0 = gl.getUniformLocation(gl.program, 'u_Sampler0');
    let u_Sampler1 = gl.getUniformLocation(gl.program, 'u_Sampler1');
    if (!u_Sampler0 || !u_Sampler1) {
        console.log('获取取样器失败');
        return false;
    }

    // Create the image object
    let image0 = new Image();
    let image1 = new Image();
    if (!image0 || !image1) {
        console.log('新建图像失败');
        return false;
    }
    // 图片加载完成后执行创建材质
    image0.onload = function(){ loadTexture(gl, n, texture0, u_Sampler0, image0, 0); };
    image1.onload = function(){ loadTexture(gl, n, texture1, u_Sampler1, image1, 1); };

    image0.src = pic1;
    image1.src = pic2;

    return true;
}
// 指定图片加载状态
let g_texUnit0 = false, g_texUnit1 = false;
function loadTexture(gl, n, texture, u_Sampler, image, texUnit) {
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);// 翻转Y轴
    // 激活材质单元
    if (texUnit == 0) {
        gl.activeTexture(gl.TEXTURE0);
        g_texUnit0 = true;
    } else {
        gl.activeTexture(gl.TEXTURE1);
        g_texUnit1 = true;
    }
    // 绑定材质
    gl.bindTexture(gl.TEXTURE_2D, texture);

    // 设置材质参数
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    // 将图片赋予材质
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

    gl.uniform1i(u_Sampler, texUnit);   // 将材质传递给取样器

    // 清空绘图
    gl.clear(gl.COLOR_BUFFER_BIT);

    if (g_texUnit0 && g_texUnit1) {
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, n);   // Draw the rectangle
    }
}
main();