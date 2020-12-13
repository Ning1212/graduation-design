import React, { Component } from 'react'
import $ from 'jquery';
import { MapDraw } from './Map';
export var MapData = () => void 0;

export default class List extends Component {

    constructor(){
        super();
        this.state = {
            city:'',
            data: [],
            list:[
                "Agriculture",
                "Coal mining",
                "Petroleum and gas",
                "Metal mining",
                "Nonmetal mining",
                "Food processing and tobaccos",
                "Textile",
                "Clothing, leather, fur, etc.",
                "Wood processing and furnishing",
                "Paper making, printing, stationery, etc.",
                "Petroleum refining, coking, etc.",
                "Chemical industry",
                "Nonmetal products",
                "Metallurgy",
                "Metal products",
                "General and specialist machinery",
                "Transport equipment",
                "Electrical equipment",
                "Electronic equipment",
                "Instrument and meter",
                "Other manufacturing",
                "Electricity and hot water production and supply",
                "Gas and water production and supply",
                "Construction",
                "Transport and storage",
                "Wholesale and retailing",
                "Hotel and restaurant",
                "Leasing and commercial services",
                "Scientific research",
                "Other services",
                "total"
              ],
            colorFlag:30
        }
    }

    render() {
        return (
            <svg width={'200px'} height={'470px'} xmlns={`http://www.w3.org/2000/svg`}>
            {
                this.state.list.map( (item, index) => 
                    <g>
                        <circle key={index}
                            id={'circle'+index}
                            xmlns={`http://www.w3.org/2000/svg`}
                            cx={10} 
                            cy={12+index*15} r={7}
                            style={{
                                position:'absolute',
                                opacity:0.8,
                                fill:this.state.colorFlag === -1 ? 'gray' : (this.state.colorFlag === index ? 'steelblue' : 'gray'),
                                // fill:'gray',
                                strokeWidth: 1,
                                stroke:'#AEEEEE'
                            }}
                            onClick = {()=>{
                                console.log(index);
                                if(index !==     this.state.index)
                                    this.setState({
                                        colorFlag:index
                                    })
                                else{
                                    this.setState({
                                        colorFlag:-1
                                    })
                                }
                                console.log(item);
                                // let d=[];
                                MapDraw(this.state.data,this.state.city,item);
                            }}
                        >
                        </circle>
                        <text style={{position:'absolute',fontSize:8}} 
                                x={20} y={15+index*15}>
                            {item}
                        </text>
                    </g>
                )
            }    
            </svg>
        )
    }

    MapData(data,city){
        this.setState({
            data:data,
            city:city
        })
        console.log(this.state.data);
        MapDraw(data,city,'total');
    }


    componentDidMount() {
        MapData= this.MapData.bind(this);
    }

}
