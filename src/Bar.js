import React, { Component } from 'react'
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import $ from 'jquery';

export default class Bar extends Component {

    constructor(){
        super();
        this.state = {

        }
    }

    componentDidMount () {
        $.getJSON('/data/data消费类型.json', (filedata) => {
            console.log(filedata);
            let d = filedata[2012];
            let city=[];
            let Rural=[];
            let Urban=[];
            let Gov=[];
            let Fix=[];
            let In =[];
            for(let i in d){
                city.push(i);
                let R=0;
                let U=0;
                let G=0;
                let F=0;
                let I=0;
                for(let j in d[i]){
                    // console.log(d[i][j])
                    for(let h in d[i][j]){
                        R+=d[i][j][h]['Rural household consumption'];
                        U+=d[i][j][h]['Urban household consumption'];
                        G+=d[i][j][h]['Government consumption'];
                        F+=d[i][j][h]['Fixed capital formation'];
                        I+=d[i][j][h]['Inventory increase'];
                    }
                }
                Rural.push(R);
                Urban.push(U);
                Gov.push(G);
                Fix.push(F);
                In.push(I);

            }
            console.log(city);
            // console.log(Rural,Urban,Gov,Fix,In);

            var dom = document.getElementById("bar");
            var myChart = echarts.init(dom);
            var app = {};
            let option = null;
            var emphasisStyle = {
                itemStyle: {
                    barBorderWidth: 1,
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowOffsetY: 0,
                    shadowColor: 'rgba(0,0,0,0.5)'
                }
            };
            
            option = {
                backgroundColor: '#eee',
                legend: {
                    data: ['Rural household consumption', 'Urban household consumption', 'Government consumption', 'Fixed capital formation','Inventory increase'],
                    left: 20,
                    top:22
                },
                brush: {
                    toolbox: ['rect', 'polygon', 'lineX', 'lineY', 'keep', 'clear'],
                    xAxisIndex: 0,
                    
                },
                toolbox: {
                    feature: {
                        magicType: {
                            type: ['stack', 'tiled']
                        },
                        dataView: {}
                    }
                },
                tooltip: {},
                xAxis: {
                    data: city,
                    name: 'city',
                    axisLine: {onZero: true},
                    splitLine: {show: false},
                    splitArea: {show: false},
                    // axisTick: {
                    //     alignWithLabel: true
                    // },
                    axisLabel:{
                        color:"black",
                        interval: 0,
                        fontSize:11,
                        fontweight:650,
                        rotate:38
                    },
                },
                yAxis: {
                    inverse: true,
                    splitArea: {show: false},
                    boundaryGap:false
                },
                grid: {
                    left: 100
                },
                // visualMap: {
                //     type: 'continuous',
                //     dimension: 1,
                //     text: ['High', 'Low'],
                //     inverse: true,
                //     itemHeight: 200,
                //     calculable: true,
                //     min: -2,
                //     max: 6,
                //     top: 60,
                //     left: 10,
                //     inRange: {
                //         colorLightness: [0.4, 0.8]
                //     },
                //     outOfRange: {
                //         color: '#bbb'
                //     },
                //     controller: {
                //         inRange: {
                //             color: '#2f4554'
                //         }
                //     }
                // },
                series: [
                    {
                        name: 'Rural household consumption',
                        type: 'bar',
                        stack: 'one',
                        emphasis: emphasisStyle,
                        data: Rural
                    },
                    {
                        name: 'Urban household consumption',
                        type: 'bar',
                        stack: 'one',
                        emphasis: emphasisStyle,
                        data: Urban
                    },
                    {
                        name: 'Government consumption',
                        type: 'bar',
                        stack: 'two',
                        emphasis: emphasisStyle,
                        data:Gov
                    },
                    {
                        name: 'Fixed capital formation',
                        type: 'bar',
                        stack: 'two',
                        emphasis: emphasisStyle,
                        data:Fix
                    },
                    {
                        name: 'Inventory increase',
                        type: 'bar',
                        stack: 'two',
                        emphasis: emphasisStyle,
                        data: In
                    }
                ]
            };
            
            // myChart.on('brushSelected', renderBrushed);
            
            function renderBrushed(params) {
                var brushed = [];
                var brushComponent = params.batch[0];
            
                for (var sIdx = 0; sIdx < brushComponent.selected.length; sIdx++) {
                    var rawIndices = brushComponent.selected[sIdx].dataIndex;
                    brushed.push('[Series ' + sIdx + '] ' + rawIndices.join(', '));
                }
            
                myChart.setOption({
                    title: {
                        backgroundColor: '#333',
                        text: 'SELECTED DATA INDICES: \n' + brushed.join('\n'),
                        bottom: 0,
                        right: 0,
                        width: 100,
                        textStyle: {
                            fontSize: 12,
                            color: '#fff'
                        }
                    }
                });
            };
            if (option && typeof option === "object") {
                myChart.setOption(option, true);
            }

        })
    }


    render() {
        return (
            <div id='bar' style={{width:'100%',height:'100%'}}>
                
            </div>
        )
    }
}
