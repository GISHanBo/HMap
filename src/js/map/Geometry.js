import {Bounds} from "./Bounds"

/**
 * 几何体抽象类
 */
export class Geometry {
    /**
     * 构造器
     * @param {Array} array 二维点数据组
     */
    constructor(array){
        let latArray=[];
        let lngArray=[];
        for (let point of array){
            latArray.push(point[0]);
            lngArray.push(point[1]);
        }
        let latMax=Math.max(...latArray);
        let latMin=Math.min(...latArray);
        let lngMax=Math.max(...lngArray);
        let lngMin=Math.min(...lngArray);
        this.bounds=new Bounds(latMin,lngMin,latMax,lngMax);
    }

    /**
     * 返回对象的包围盒
     * @returns {Bounds}
     */
    getBounds(){
        return this.bounds;
    }
}