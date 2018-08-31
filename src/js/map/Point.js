import {Geometry} from "./Geometry"

/**
 * 几何点类型
 */
export class Point extends Geometry{
    /**
     * 构造器
     * @param {Number} lat 纬度
     * @param {Number} lng 经度
     */
    constructor(lat=0,lng=0){
        super([lat,lng]);
        this.lat=lat;
        this.lng=lng;
    }

    /**
     * 获取点的纬度
     * @returns {number|*}
     */
    getLat(){
        return this.lat
    }

    /**
     * 获取点的经度
     * @returns {number|*}
     */
    getLng(){
        return this.lng
    }
}