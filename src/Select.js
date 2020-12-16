import React, {
    Component
} from 'react';
import './style.css';
import $ from 'jquery';
import * as d3 from 'd3';
import { PieDraw } from './Pie';
import { MapData } from './list';
import { MdsGetIndex } from "./mds";

class Select extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            data1:[],
            data2:[],
            city:[],
            min:0,
            max:0
        };
    }
    
    render() {
        MdsGetIndex(0,'北京',this.state.data1,this.state.data2);
        let linear = d3.scaleLinear().domain([this.state.min, this.state.max]).range([20, 100]);
        let linear1 = d3.scaleLinear().domain([this.state.min, this.state.max]).range([0.7, 1]);
        return (
            <div  style={{height:'100%',width:'100%'}}>
                <div id={"CityBtn"} style={{height:'275px',width:'100%',float:'left',overflowY:'scroll'}}>    
                    <table  border={0} cellPadding={0} cellSpacing={0} style={{marginLeft:4}}>   
                    {
                        
                        this.state.city.map((item,index)=>{
                            //"border:1px solid #ccc;background:#fff;
                            //line-height:37px;color:#999;font-size:14px;text-align:center;font-family:微软雅黑;font-size:16px"
                            return ( 
                                // index>14 ? null:
                                <tr>
                                    <td id={"List"+index}
                                        key={index}
                                        style={{
                                            fontSize:11,
                                            fontFamily:'微软雅黑',
                                            width:'450px',
                                            textAlign:'center',
                                            background:`linear-gradient(to right,rgba(70,130,180) 0%, rgba(70,130,180,0) ${
                                                linear(this.state.data1["2012"][Object.keys(this.state.data1[2012])[index]]["Total Consumption"]["Total"])}%)`,
                                            // background:this.state.indexs[index]===0 ? 
                                            //     `linear-gradient(to right,rgba(70,130,180) 0%, rgba(70,130,180,0) ${linear(item.value)}%)`
                                            //     :`linear-gradient(to right,rgba(205,133,63) 0%, rgba(205,133,63,0) ${linear(item.value)}%)`,
                                            border:'2px solid #ccc',
                                            color:'black',
                                            // opacity: linear1(this.state.data["2012"][Object.keys(this.state.data[2012])[index]]["Total Consumption"]["Total"])
                                        }}
                                        onClick={(e)=>{
                                            console.log(item);
                                            PieDraw(this.state.data1["2012"][item],item);
                                            MapData(this.state.data2["2012"][item],item);
                                            MdsGetIndex(index,item,this.state.data1,this.state.data2);
                                        }}
                                        >
                                        {item}
                                    </td>
                                </tr>
                            )
                        })
                    }
                    </table>
                </div>
            </div>
        )
    }


 
    componentDidMount() {
        
        $.getJSON(`/data/data.json`, (filedata) => {
            let cities=[];
            let dataset=filedata;
            let min = 10000;
            let max = 0;
            console.log(dataset);
            for(let i=0;i< Object.keys(filedata[2012]).length;i++){
                // cities.push();
                //console.log(dataset["2012"][Object.keys(filedata[2012])[i]]);
                if(min>dataset["2012"][Object.keys(filedata[2012])[i]]["Total Consumption"]["Total"])
                    min = dataset["2012"][Object.keys(filedata[2012])[i]]["Total Consumption"]["Total"];
                if(max<dataset["2012"][Object.keys(filedata[2012])[i]]["Total Consumption"]["Total"])
                    max = dataset["2012"][Object.keys(filedata[2012])[i]]["Total Consumption"]["Total"];
                cities[i]=Object.keys(filedata[2012])[i];
            }
            // console.log(cities.length);
            // console.log(max,min);
            PieDraw(dataset["2012"]['北京'],'北京');
            
            this.setState({
                city:cities,
                data1:dataset,
                min:min,
                max:max
            })
        })

        $.getJSON(`/data/datajj.json`, (filedata) => {
            let allCity = [];
            let total = 0;
            let dataset=filedata;
            let city=Object.keys(filedata[2012]);

            // for(let i=0;i< city.length;i++){
            //     for(let j=0; j< list.length;j++){
            //         // console.log()
            //         for(let h=0;h<city.length;h++){
            //             total=0;
            //             for(let m=0; m < list.length; m++){
            //                 total += parseFloat(dataset["2012"][city[i]][list[j]][city[h]][list[m]]);  
            //             }
            //             dataset["2012"][city[i]][list[j]][city[h]].total=total;
            //         }
            //     }
            //     // list.push(Object.keys(dataset["2012"][Object.keys(filedata[2012])[i]]));
            //     // list[i]=Object.keys(filedata[2012])[i];
            // }
            console.log(dataset);
            // console.log(list);
            // // console.log(max,min);
            MapData(dataset["2012"]['北京'],'北京');
            this.setState({
                data2:dataset
            })
        })
    }

}




export default Select;