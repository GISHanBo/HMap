/**
 * 作者:hanbo
 * 日期:2018/8/3016:07
 * 描述:
 */
export class RenderTool {
    static initShaders(gl, vshader, fshader){
        var program = RenderTool.createProgram(gl, vshader, fshader);
        if (!program) {
            console.log('创建program失败');
            return false;
        }

        gl.useProgram(program);
        gl.program = program;

        return true;
    }
    static createProgram(gl, vshader, fshader){
        // 创造着色器对象
        let vertexShader = RenderTool.loadShader(gl, gl.VERTEX_SHADER, vshader);
        let fragmentShader = RenderTool.loadShader(gl, gl.FRAGMENT_SHADER, fshader);
        if (!vertexShader || !fragmentShader) {
            return null;
        }

        // 创造 program 对象
        let program = gl.createProgram();
        if (!program) {
            return null;
        }

        // 绑定着色器与program
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);

        //连接program
        gl.linkProgram(program);

        // 检查连接结果
        let linked = gl.getProgramParameter(program, gl.LINK_STATUS);
        if (!linked) {
            let error = gl.getProgramInfoLog(program);
            console.log('连接 program失败: ' + error);
            gl.deleteProgram(program);
            gl.deleteShader(fragmentShader);
            gl.deleteShader(vertexShader);
            return null;
        }
        return program;
    }

    /**
     * 创建着色器
     * @param gl
     * @param type
     * @param source
     * @returns {*}
     */
    static loadShader(gl, type, source){
        // 创建着色器
        let shader = gl.createShader(type);
        if (shader == null) {
            console.log('创建着色器失败');
            return null;
        }

        // Set the shader program
        gl.shaderSource(shader, source);

        // 编译着色器
        gl.compileShader(shader);

        // 检查编译结果
        let compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
        if (!compiled) {
            let error = gl.getShaderInfoLog(shader);
            console.error('编译着色器失败: ' + error);
            gl.deleteShader(shader);
            return null;
        }

        return shader;
    }
}