/**
 * 边界类
 */
export class Bounds {
    /**
     * 构造器
     * @param {Number} latMin 纬度最小值
     * @param {Number} lngMin 经度最小值
     * @param {Number} latMax 纬度最大值
     * @param {Number} lngMax 经度最大值
     */
    constructor(latMin = 0, lngMin = 0, latMax = 0, lngMax = 0) {
        this.latMin = latMin;
        this.lngMin = lngMin;
        this.latMax = latMax;
        this.lngMax = lngMax;
    }

    /**
     * 向Bunds内添加点，如果点在Bounds外，则扩大Bounds范围
     * @param {Point} point
     * @constructor
     */
    includePoint(point) {
        if (point.getLat() > this.latMax) {
            this.latMax = point.getLat()
        } else if (point.getLat() < this.latMin) {
            this.latMin = point.getLat()
        }
        if (point.getLng() > this.lngMax) {
            this.lngMax = point.getLng()
        } else if (point.getLng() < this.lngMin) {
            this.lngMin = point.getLng()
        }
    }

}