import React, { Component } from 'react';
import $ from 'jquery';
import * as d3 from "d3";
import { event } from 'd3-selection'; 
import './style.css';
import { PieDraw } from './Pie';
import { MapData } from './list';
export var MdsGetIndex = (index, city,d1,d2) => void 0


export default class Mds extends Component {

    constructor(){
        super();
        this.state = {
            data:[[ 235.94675098,-7.32438728],
                [ 156.28125955,21.95351181],
                [-396.501585, 207.85550013],
                [-179.5256502, 10.15708264],
                [-382.25596338 ,-128.33436397],
                [-158.69348615,51.61353852],
                [  83.12016742,-1.76058079],
                [  54.7435723,-14.44859157],
                [ 127.23615231,11.63141364],
                [-394.39164535 , -37.80837921],
                [ -75.31151535,  -58.72540966],
                [ -10.72151616,  -25.26853321],
                [  82.01923203 , -16.28087852],
                [ 167.21055316, 8.32366924],
                [-551.40018568,-8.54355424],
                [-203.05360916 , -19.16337169],
                [ -29.29703282,19.7031857 ],
                [  64.71505849,13.25954081],
                [-196.3588594,-58.26711498],
                [ 135.76039065, 5.56699662],
                [ 286.84008042,-6.40014563],
                [ 178.27929818,21.02370336],
                [  52.29628252,57.59283881],
                [  93.65680544  ,-18.83129722],
                [ 127.78636905,23.36753291],
                [  67.17758648,-9.58205291],
                [ 164.25074342,-6.68656806],
                [ 283.70150508, 3.23743122],
                [ 161.93454117 , -26.74309865],
                [  54.55469998 , -11.11761781]]
       }
    }


    render() {
        console.log(this.state.data);
        return (
            <div id='svg' style={{height:'168px'}}>
                
            </div>
        )
    }

    MdsDraw (index, city, d1, d2) {
        let c = this.state.city;
        d3.select('#svg')
            .selectAll('svg')
            .remove();

        var width = 450;    // 可视区域宽度
        var height = 168;   // 可视区域高度
        var padding = {top: 10, right: 5, bottom:5, left:5};

        var svg = d3.select("#svg")
                .append("svg")
                .attr("width", width)
                .attr("height", height);
        
        let dataset = this.state.data;
        let minX=100;
        let maxX=0;
        let minY=100;
        let maxY=0;
        for(let i =0;i<dataset.length;i++){
            if(dataset[i][0]<minX){
                minX=dataset[i][0]
            }
            if(dataset[i][1]<minY){
                minY=dataset[i][1]
            }
            if(dataset[i][0]>maxX){
                maxX=dataset[i][0]
            }
            if(dataset[i][1]>maxY){
                maxY=dataset[i][1]
            }
        }
        // console.log(minX,minY,maxX,maxY);

        var xScale=d3.scaleLinear()
                .domain([minX,maxX])
                .nice()
				.range([5,width-padding.left-padding.right]);
 
        var yScale=d3.scaleLinear()
                    .domain([minY,maxY])
                    .nice()
                    .range([height-padding.top-padding.bottom,10]);
        
        var tooltip = d3.select("#svg").append("div")
                    .attr("class","tooltip") //用于css设置类样式
                    .attr("opacity",0.0);

        var circle=svg.selectAll("circle")
                    .data(dataset)
                    .enter()
                    .append("circle")
                    .attr("fill",function (d,i) {
                        if(i===index)
                            return 'steelblue';
                        else
                            return 'gray'
                    })
                    .attr('id',function (d,i) {
                        return i;
                    })
                    .attr('opacity',0.7)
                    .attr("cx",function(d){
                        return xScale(d[0]);//设置圆心x坐标
                    })
                    .attr("cy",function(d){
                        
                        console.log(yScale(d[1]));
                        return yScale(d[1]);
                        //调节y的值  调了好久 
                        //需要与设置的y轴的坐标相对应
                    })
                    .attr("r",3);//半径     

                $(document).mouseover(function (e) {
                    let c=['北京', '天津', '河北', '山西', '内蒙古', '辽宁', '吉林', '黑龙江', '上海', '江苏', '浙江', '安徽', '福建', '江西', '山东', '河南', '湖北', '湖南', '广东', '广西', '海南', '重庆', '四川', '贵州', '云南', '陕西', '甘肃', '青海', '宁夏', '新疆']

                    circle.on("mouseover",function(d)
                        {
                        var x = e.pageX;
                        var y = e.pageY;
                        // console.log(x,y);
                        // console.log(d.target.id);
                        tooltip.html(c[d.target.id])
                        // 设置tooltip的位置(left,top 相对于页面的距离) 
                            .style("left",(x)+"px")
                            .style("top",(y)+"px")
                            .style("opacity",1.0);
                        })
                        .on('click',function (d) {
                            PieDraw(d1["2012"][c[d.target.id]],c[d.target.id]);
                            MapData(d2["2012"][c[d.target.id]],c[d.target.id]);
                            d3.selectAll('circle').attr('fill','gray');
                            d3.select(d.target).attr('fill','steelblue');
                        })
                        //--鼠标移出事件
                        .on("mouseout",function(d)
                        {
                            tooltip.style("opacity",0.0);
                    }); 
                })
						
                    
                        
        
    }

    componentDidMount () {        
        MdsGetIndex = this.MdsDraw.bind(this);
        
    }
}
