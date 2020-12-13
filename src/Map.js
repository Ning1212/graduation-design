import React, {
    Component
} from 'react';
import './style.css';
import $ from 'jquery';
import * as d3 from 'd3';
import echarts from 'echarts/lib/echarts';
import 'echarts/map/js/world.js';
import 'echarts/map/js/china.js';
import 'echarts/extension/bmap/bmap';
import { PieDraw } from './Pie';
export var MapDraw = () => void 0;

class Map extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            data:[],
            list:[],
            min:0,
            max:0
        };
    }
    
    render() {

        return (
            <div className = {"dataMapDiv"} id ={"allmap"} style={{width:'100%',height:"470px",float:'right'}}></div>
        )
        
    }

    MapDraw(d,city,total){
        document.getElementById('allmap').removeAttribute('_echarts_instance_');
        let min=1000000;
        let max=-1;
        let mapData = [];
            // console.log(d);
        for(let i in d){
            // console.log(d[i]);
            for(let j in d[i]){
                // console.log(j)
                let t = d[i][j][total];
                if(d[i][j][total]===0)
                    t=0;
                let c = j;
                let str = [{name:city},{name:c,value:t}];
                // console.log(str);
                let f=0;
                for(let h=0;h<mapData.length;h++){
                    if(mapData[h][1].name===c){
                        mapData[h][1].value+=t;
                        if(max<mapData[h][1].value)
                            max=mapData[h][1].value;
                        if(min>mapData[h][1].value)
                            min=mapData[h][1].value
                        f=1;
                        break;
                    }
                                                    
                }
                if(f!==1)
                    mapData.push(str);
            }
        }
        
        // console.log(mapData);
        this.setState({
            data:mapData
        })
        // console.log(d,city,total);
        var planePath = 'arrow';
        // var planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z'
        // console.log(min,max)
        var BMap = window.BMap;
            var map = new BMap.Map("allmap"); // 创建Map实例
            map.centerAndZoom(new BMap.Point(116.404, 39.915), 11); // 初始化地图,设置中心点坐标和地图级别
            // map.addControl(new BMap.MapTypeControl()); //添加地图类型控件
            // map.setCurrentCity("北京"); // 设置地图显示的城市 此项是必须设置的
            map.enableScrollWheelZoom();

           var geoCoordMap = {
            '北京':[116.46,39.92],
            '浙江':[120.19,30.26],
            '广东':[113.23,23.16],
            '贵州':[106.71,26.57],
            '陕西':[108.95,34.27],
            '山西':[112.53,37.87],
            '天津':[117.2,39.13],
            '湖北':[114.31,30.52],
            '湖南':[113,28.21],
            '河北':[114.48,38.03],
            '河南':[113.65,34.76],
            '安徽':[117.27,31.86],
            '内蒙古':[111.65,40.82],
            '新疆':[87.68,43.77],
            '广西':[108.33,22.84],
            '云南':[102.73,25.04],
            '福建':[119.3,26.08],
            '黑龙江':[126.63,45.75],
            '辽宁':[123.38,41.8],
            '吉林':[125.35,43.88],
            '山东':[117,36.65],
            '海南':[110.35,20.02],
            '上海':[121.48,31.22],
            '江苏':[120.62,31.32],
            '江西':[115.89,28.68],
            '重庆':[106.54,29.59],
            '四川':[104.06,30.67],
            '甘肃':[103.73,36.03],
            '宁夏':[106.27,38.47],
            '青海':[101.74,36.56],
           }
         let linear = d3.scaleLinear().domain([min, max]).range([5, 16]);

         var convertData = function (data) {
            var res = [];
            for (var i = 0; i < data.length; i++) {
                var dataItem = data[i];
                var fromCoord = geoCoordMap[dataItem[0].name];  // 出发地的经纬度
                var toCoord = geoCoordMap[dataItem[1].name];    // 目的地的经纬度
                if (fromCoord && toCoord) {
                    res.push({
                        fromName: dataItem[0].name,
                        toName: dataItem[1].name,
                        coords: [fromCoord, toCoord],
                        'value': dataItem[1].value
                    });
                }
            }
            return res;
        };
           
          // 变量7：color：定义了对指定上述城市用SVG画图时线条的颜色
        var color = ['#a6c84c', '#ffa022', '#46bee9'];
        // 变量8：series：图表的系列，开发时动态填充
        var series = [];
        // 对我们上面定义的空图表系列series进行数据填充
        
        [[city, mapData]].forEach(function (item, i) {
            // console.log(item);
            series.push(

                // {
                //     // 系列名称，用于tooltip的显示
                //     name: item[0],
                //     type: 'lines',
                //     zlevel: 1, // 用于 Canvas 分层，不同zlevel值的图形会放置在不同的 Canvas 中
                //     // effect出发到目的地 的白色尾巴线条
                //     // 线特效的配置
                //     effect: {
                //         show: true,
                //         period: 6, // 特效动画的时间，单位为 s
                //         trailLength: 0.1, // 特效尾迹的长度。取从 0 到 1 的值，数值越大尾迹越长
                //         color: '#46bee9', // 移动箭头颜色
                //         symbol: planePath,
                //         symbolSize: 6 // 特效标记的大小
                //     },
                //     // lineStyle出发到目的地 的线条颜色
                //     lineStyle: {
                //         normal: {
                //             color: color[i],
                //             width: 0,
                //             curveness: 0.2 //幅度
                //         }
                //     },
                //     data: convertData(item[1]) //开始到结束数据
                // }, {
                //     //出发地信息
                //     name: item[0],
                //     type: 'lines',
                //     zlevel: 2,
                //     effect: {
                //         show: true,
                //         period: 6,
                //         trailLength: 0,
                //         symbol: planePath,
                //         symbolSize: function(val) {
                //             console.log(val)
                //             return linear(val[2]);
                //         }
                //     },
                //     lineStyle: {
                //         normal: {
                //             color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                //                 offset: 0,
                //                 color: '#FFFFA8' // 出发
                //             }, {
                //                 offset: 1,
                //                 color: '#58B3CC ' // 结束 颜色
                //             }], false),
                //             width: 1.5,
                //             opacity: 0.4,
                //             curveness: 0.2
                //         }
                //     },
                //     data: convertData(item[1])
                // }, {
                //     // 目的地信息
                //     name: item[0],
                //     type: 'effectScatter',
                //     coordinateSystem: 'geo',
                //     zlevel: 2,
                //     rippleEffect: {
                //         brushType: 'stroke'
                //     },
                //     label: {
                //         normal: {
                //             show: true,
                //             position: 'right',
                //             formatter: '{b}'
                //         }
                //     },
                //     // effect: {
                //     //     // show: true,
                //     //     // period: 6,
                //     //     // trailLength: 0,
                //     //     // symbol: planePath,
                //     //     symbolSize: function(val) {
                //     //         // console.log(val)
                //     //         return linear(val[2]);
                //     //     }
                //     // },
                //     symbolSize: function(val) {
                //         return linear(val[2]);
                //     },
                //     itemStyle: {
                //         normal: {
                //             color: color[i],
                //             // size:function(val) {
                //             //             // console.log(val)
                //             //             return linear(val[2]);
                //             //         }
                //         }
                //     },
                //     data: item[1].map(function(dataItem) {
                //         return {
                //             name: dataItem[1].name,
                //             value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
                //         };
                //     })
    
        //     {
        //     //涟漪特效类型
        //     type: "effectScatter",
        //     //地理坐标系采用bmap里配置的百度地图
        //     coordinateSystem: "geo",
        //     //用于 Canvas 分层（相当于z-index），z相比zlevel优先级更低，而且不会创建新的 Canvas,为了使点位于底图（bmap配置的百度地图）之上
        //     zlevel: 2,
        //     //涟漪特效相关配置
        //     // rippleEffect: {
        //     //     //波纹的绘制方式可选 'stroke' 和 'fill'。 相当于丢石头那个涟漪效果，一个类似圆环，一个类似圆饼
        //     //     brushType: "fill"
        //     // },
        //     //配置线条样式
        //     label: {
        //         normal: {
        //             show: true,
        //             position: "right",
        //             //采用 rich 中定义样式。
        //             formatter: "{b}"
        //         }
        //     },
        //     symbolSize: function(val) {
        //         return linear(val[2]);
        //     },
        //     //配置何时显示特效。'render' 绘制完成后显示特效  'emphasis' 高亮（hover）的时候显示特效。
        //     showEffectOn: "render",
        //     itemStyle: {
        //         normal: {
        //             color: color[i]
        //         }
        //     },
        //     data: item[1].map(function (dataItem) {
        //             // dataItem ==> [{'name':'北京'}, {'name':'上海','value':95}]
        //             return {
        //                 // dataItem[1] ==> {'name':'上海','value':95}
        //                 'name': dataItem[0].name,
        //                 'value': geoCoordMap[dataItem[0].name].concat(dataItem[0].value)    // [121.4648, 31.2891, 95]
        //             };
        //             // console.log(geoCoordMap[dataItem[1].'name'].concat([dataItem[1].'value']))
        //         })
        // },
            // 第一组：两地之间的动态轨迹
            // {
            //     'name': item[0],   // 系列的名称
            //     // lines：用于带有起点和终点信息的线数据的绘制，主要用于路线可视化
            //     type: 'lines',
            //     zlevel: 1,              // 画布的权重，权重大的在最上面
            //     effect: {
            //         show: true,         // 打开线条特效
            //         period: 6,          // 特效动画时间，单位s
            //         trailLength: 0.7,   // 特效尾迹的长度，值越大越长
            //         color: '#fff',
            //         symbolSize: 3       // 特效标记的大小
            //     },
            //     // 线条的样式
            //     lineStyle: {
            //         normal: {
            //             color: color[i],
            //             width: 0,
            //             curveness: 0.2  // 边的曲度，取值0~1，值越大曲度越大
            //         }
            //     },
            //     data: convertData(item[1])  // 对北上广的数据转换成特定格式
            // },
            // 第二组：两地之间的线条
            {
                name: item[0],
                type: 'lines',
                zlevel: 2,
                effect: {
                    show: true,
                    period: 6,
                    trailLength: 0,
                    symbol: planePath,  // 基于SVG矢量图的特效图形标记，用于绘制小飞机的
                    symbolSize: 5
                },
                lineStyle: {
                    normal: {
                        color: color[i],
                        width: 1,
                        opacity: 0.4,   // 图形透明度
                        curveness: 0.2
                    }
                },
                data: convertData(item[1])
            },
            {
                name: item[0],
                type: 'effectScatter',      // 带有涟漪特效的散点图，起到视觉突出的效果
                coordinateSystem: 'geo',    // 该系列使用的坐标系指定为地理坐标系
                zlevel: 2,
                rippleEffect: {
                    brushType: 'stroke'     // 波纹的绘制方式
                },
                label: {
                    normal: {
                        show: true,
                        position: 'right'   ,  // 地区名称标签显示位置
                        formatter (params){
                            // console.log(params['data']);
                            return params['data'].name
                            // +'\nco2:'+ params['data'].value[2]
                        }  // 格式化显示标签，b指的是系列的名称
                    }
                },
                symbolSize: function (val) {
                    // val：[121.4648, 31.2891, 95]
                    // console.log(val[2]);
                    return linear(val[2]);    // 目的地涟漪特效的大小
                },
                itemStyle: {
                    normal: {
                        color: color[i]
                    }
                },
                // 解析：item[1] ==> BJData：[[{'name':'北京'}, {'name':'上海','value':95}],...]
                data: item[1].map(function (dataItem) {
                    // dataItem ==> [{'name':'北京'}, {'name':'上海','value':95}]
                    // console.log(dataItem);
                    return {
                        // dataItem[1] ==> {'name':'上海','value':95}
                        'name': dataItem[1].name,
                        'value': geoCoordMap[dataItem[1].name].concat(dataItem[1].value)    // [121.4648, 31.2891, 95]
                    };
                    // console.log(geoCoordMap[dataItem[1].'name'].concat([dataItem[1].'value']))
                })
            }
            );
        });
        // 变量9：option：指定图表的配置项和数据
        var option = {
            // Dom背景颜色
            backgroundColor: '#8799a3',
            tooltip: {
                trigger: 'item',
                formatter (params){
                    console.log(params['data']);
                    return params['data'].name+'\nco2:'+ params['data'].value[2]
                    
                }
            },
            legend: {
                orient: 'vertical',
                top: 'bottom',
                left: 'right',
                data: ['node1', 'node2', 'node3'],
                textStyle: {
                    color: '#021019'
                },
                selectedMode: 'single'  // 图例选择的模式：single和multiple分别对应单选和多选
            },
            // geo：地理坐标系组件
            geo: {
                map: 'china',
                label: {
                    emphasis: {
                        // 鼠标触发显示地区名称
                        show: true
                    }
                },
                roam: true,
                itemStyle: {
                    normal: {
                        // 正常时地区的颜色
                        areaColor: '#323c48',
                        borderColor: '#404a59'
                    },
                    emphasis: {
                        // 鼠标经过时地区的颜色
                        areaColor: '#c99979'
                    }
                }
            },
            series: series	// 调用上面已经填充好的series
        };


        // 5. 使用指定的配置项和数据显示图表
            var myChart = echarts.init(document.getElementById('allmap'));
            myChart.setOption(option,true);
    }
 
    componentDidMount() {
        MapDraw = this.MapDraw.bind(this);
    }
    
        
    
}




export default Map;