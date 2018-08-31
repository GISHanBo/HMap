/**
 * 作者:hanbo
 * 日期:2018/8/3110:27
 * 描述:坐标系转换类
 */

export class Transform {
    /**
     * 从Html屏幕坐标系坐标转到WebGL绘图坐标系
     * @param canvas 绘图对象
     * @param x 屏幕坐标系x坐标
     * @param y 屏幕坐标系y坐标
     * @returns {{x: number, y: number}}
     * @constructor
     */
    static ScreenToWebGL(canvas,x,y){
        let rect=canvas.getBoundingClientRect();
        //注意不可以使用canvas.style.width
        let X=((x-rect.left)-canvas.width/2)/(canvas.width/2);
        let Y=(canvas.height/2-(y-rect.top))/(canvas.height/2);
        return{x:X,y:Y};
    }
}