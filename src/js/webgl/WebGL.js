/**
 * 作者:hanbo
 * 日期:2018/9/410:16
 * 描述:WebGL工具类
 */
export class WebGL {
    /**
     * 由canvas对象获取webGL上下文对象
     * @param {Element} canvas
     * @returns {*}
     */
    static getWebGLContext(canvas){
        let names=['webgl','experimental-webgl'];
        let context=null;
        for(let name of names){
            try{
                context=canvas.getContext(name);
            }catch (e) {}
            if(context){
                break
            }
        }
        if(context){
            context.viewportWidth=canvas.width;
            context.viewportHeight=canvas.height;
        }else{
            console.error('获取webgl对象失败');
            return;
        }
        return context;
    }

    /**
     * 编译着色器
     * @param gl
     * @param type
     * @param shaderSource
     * @returns {*}
     */
    static loadShader(gl,type,shaderSource){
      let shader=gl.createShader(type);
      gl.shaderSource(shader,shaderSource);
      gl.compileShader(shader);

      if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS)){
          console.error('编译着色器失败');
          return null;
      }
      return shader;
    }
}