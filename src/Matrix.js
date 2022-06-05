import React, {
    Component
} from 'react';
import './style.css';
import $ from 'jquery';
import * as d3 from 'd3';

class Matrix extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            data:[],
            city:[],
        };
    }
    
    render() {

        var colorScale = d3
        .scaleLinear()
        .domain([0, 1])
        .range(["rgb(247,216,156)", "rgb(210,57,67)"]);
        let rect_width_max = 45;
        let left_margin =45;
        let width = document.getElementById('MatrixSvg')?document.getElementById('MatrixSvg').clientWidth:0;
        let height = document.getElementById('MatrixSvg')?document.getElementById('MatrixSvg').clientHeight:0;
        let rect_width = (width - 100) / this.state.city.length;
        let rect_height = (height -100) / this.state.city.length;
        let rect_width_true = rect_width < rect_height ? rect_width : rect_height;
        const rect_row = this.state.data.map((v1,i)=>{
            const rect_col = v1.map((v2,j)=>{
                return <rect fill={colorScale(v2)} x={left_margin+j*rect_width_true} y={left_margin+i*rect_width_true} width={rect_width_true} height={rect_width_true}></rect>;
            })
            return rect_col;
        })
        var rect_row_all =[];
        var rect_col_all =[];
        if(this.state.data.length>0){
            let value_row_all = this.state.data.map(v=>d3.sum(v));
            let value_col_all = JSON.parse(JSON.stringify(this.state.data[0]));
            for(let i=1;i<this.state.data.length;i++){
                for(let j=0;j<this.state.data.length;j++){
                    value_col_all[j] += this.state.data[i][j];
                }
            }
            var v_max = d3.max([d3.max(value_col_all),d3.max(value_row_all)]);
            var valueScale = d3.scaleLinear([0, v_max], [0, rect_width_max]);
            rect_row_all = value_row_all.map((v,i)=><rect x={left_margin+this.state.city.length*rect_width_true} y={left_margin+i*rect_width_true} height={rect_width_true} width={valueScale(v)} fill="#89D0C2"></rect>);
            rect_col_all = value_col_all.map((v,i)=><rect x={left_margin+i*rect_width_true} y={left_margin+this.state.city.length*rect_width_true} height={valueScale(v)} width={rect_width_true} fill="#F77A82"></rect>);
        }
        var text_col = [];
        var text_row = [];
        if(this.state.city.length>0){
            text_col = this.state.city.map((v,i)=><text x={2} y={10+left_margin+i*rect_width_true} fontSize={10}>{v}</text>)
            text_row = this.state.city.map((v,i)=><text x={5+left_margin+i*rect_width_true} y={5} fontSize={10} writing-mode="tb">{v}</text>)
        }
        return (
            <div id={'MatrixSvg'} style={{width:'100%',height:'100%'}}>
                <svg style={{width:'100%', height:'100%'}}>
                    {rect_row}
                    {rect_row_all}
                    {rect_col_all}
                    {text_col}
                    {text_row}
                </svg>            
            </div>
        )
    }

 
    componentDidMount() {
        console.log("matrix")
        $.ajax({
            url:'../data/datajj.json',
            type:'GET',
            dataType:'json',
            success:(data)=>{
                console.log(data);
                let city = [];
                for(let i in data){
                    for(let j in data[i]){
                        city.push(j)
                    }
                }
                let d = [];
                let all_value = [];
                for(let i=0;i<city.length;i++){
                    let v =[];
                    for(let j = 0;j<city.length;j++){
                        let value = 0;
                        for(let depart in data['2012'][city[i]]){
                            value+=data['2012'][city[i]][depart][city[j]]['total'];
                        }
                        v.push(Math.log(value));
                        all_value.push(Math.log(value));
                    }
                    d.push(v);
                }
                let v_min = d3.min(all_value);
                let v_max = d3.max(all_value);
                let scale = d3.scaleLinear([v_min,v_max],[0,1]);
                console.log(d)
                for(let i=0;i<d.length;i++){
                    for(let j=0;j<d[i].length;j++){
                        d[i][j]=scale(d[i][j]);

                    }
                }

                this.setState({city:city,data:d})
            }
        })
    }
}




export default Matrix;