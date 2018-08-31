import {Bounds} from "../map/Bounds"

/**
 * 四叉树类
  */
export class QuadTree {


    /**
     * 构造器
     */
     constructor(){
         //四叉树当前等级
         this.level=0;
         this.bounds=null;
         this.nodes=[];
     }

    /**
     * 添加点
     * @param {Point} point
     */
     addPoint(point){
     	console.log(`${this.level}添加点`);
     	if(this.level==0){
     		//小于四个点时，四叉树的节点就为这些点
         if(this.nodes.length<5){
             this.nodes.push(point);
             //添加第一个点时，点的范围为四叉树的范围
             if(this.nodes.length==0){
             	this.bounds=point.getBounds();
             }else{
             	//再添加点时，节点的范围不断扩张；
             	//this.bounds.includePoint(point);
             }
         }
     	}
     	
     	
     	
     }
     /**
      * 设置当前四叉树的层级
      */
     setLevel(level){
     	this.level=level;
     }
 }