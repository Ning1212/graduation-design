import React, {
    Component
} from 'react';
import './style.css';
import $ from 'jquery';
import * as d3 from 'd3';
export var PieDraw = () => void 0;


class Pie extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            data:[],
            city:[]
        };
    }
    
    render() {
        return (
            <div id={'PieSvg'} style={{width:'100%',height:'282px'}}>            
            </div>
        )
    }

    drawChart(dataset,city){
        
        console.log(dataset,city);
        d3.select('#PieSvg')
            .selectAll('svg')
            .remove();
        let width = 224;
        let radius = width / 6;
        let height=102; 
        // let svg = d3
        //     .select('#PieSvg')
        //     .append('svg')
        //     .attr('width', '100%')
        //     .attr('height', '282px');
        let data;
        if(city===undefined)
            data=null;
        else
            data= {"name":city,"children":[]};
        console.log("data",data);
        for(let i in dataset){
            let str1={"name":i,"children":[]}
            for(let j in dataset[i]){
                let str2={"name":j,"value":dataset[i][j]}
                str1.children.push(str2);
            }
            data.children.push(str1);
        }
        console.log(data);
        
        let partition = data => {
            const root = d3.hierarchy(data)
                .sum(d => d.value)
                .sort((a, b) => b.value - a.value);
            return d3.partition()
                .size([2 * Math.PI, root.height + 1])
              (root);
          };

        let color = d3.scaleOrdinal(d3.quantize(d3.interpolateRainbow, 7));
        console.log(data.children.length);
        let root = partition(data);
        console.log(root);
        root.each(d => d.current = d);

        const svg = d3.select('#PieSvg')
            .append('svg')
            .attr("viewBox", [0, 0, width, width])
            .attr('width', '100%')
            .attr('height', '282px')
            .style("font", "10px sans-serif");

        const g = svg.append("g")
            .attr("transform", `translate(${width / 2},${width / 2})`);

        let arc = d3.arc()
        .startAngle(d => d.x0)
        .endAngle(d => d.x1)
        .padAngle(d => Math.min((d.x1 - d.x0) / 2, 0.005))
        .padRadius(radius * 1.5)
        .innerRadius(d => d.y0 * radius)
        .outerRadius(d => Math.max(d.y0 * radius, d.y1 * radius - 1));
        const path = g.append("g")
            .selectAll("path")
            .data(root.descendants().slice(1))
            .join("path")
            .attr("fill", d => { while (d.depth > 1) d = d.parent; return color(d.data.name); })
            .attr("fill-opacity", d => arcVisible(d.current) ? (d.children ? 0.6 : 0.4) : 0)
            .attr("d", d => arc(d.current));

        path.filter(d => d.children)
            .style("cursor", "pointer")
            .on("click", clicked);

        let format = d3.format(",d")
        path.append("title")
            .text(d => `${d.ancestors().map(d => d.data.name).reverse().join("\n")}\n${format(d.value)}`);

        const label = g.append("g")
            .attr("pointer-events", "none")
            .attr("text-anchor", "middle")
            .style("user-select", "none")
            .selectAll("text")
            .data(root.descendants().slice(1))
            // .join("text")
            // .attr("dy", "0.35em")
            // .attr("fill-opacity", d => +labelVisible(d.current))
            // .attr("transform", d => labelTransform(d.current))
            // .text(d => d.data.name);

        
        const parent = g.append("circle")
            .datum(root)
            .attr("r", radius)
            .attr("fill", "none")
            .attr("pointer-events", "all")
            .on("click", clicked);

        function clicked(event, p) {
            parent.datum(p.parent || root);

            root.each(d => d.target = {
            x0: Math.max(0, Math.min(1, (d.x0 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
            x1: Math.max(0, Math.min(1, (d.x1 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
            y0: Math.max(0, d.y0 - p.depth),
            y1: Math.max(0, d.y1 - p.depth)
            });

            const t = g.transition().duration(750);

            // Transition the data on all arcs, even the ones that aren’t visible,
            // so that if this transition is interrupted, entering arcs will start
            // the next transition from the desired position.
            path.transition(t)
                .tween("data", d => {
                const i = d3.interpolate(d.current, d.target);
                return t => d.current = i(t);
                })
            .filter(function(d) {
                return +this.getAttribute("fill-opacity") || arcVisible(d.target);
            })
                .attr("fill-opacity", d => arcVisible(d.target) ? (d.children ? 0.6 : 0.4) : 0)
                .attrTween("d", d => () => arc(d.current));

            label.filter(function(d) {
                return +this.getAttribute("fill-opacity") || labelVisible(d.target);
            }).transition(t)
                .attr("fill-opacity", d => +labelVisible(d.target))
                .attrTween("transform", d => () => labelTransform(d.current));
        }
        
        function arcVisible(d) {
            return d.y1 <= 3 && d.y0 >= 1 && d.x1 > d.x0;
        }

        function labelVisible(d) {
            return d.y1 <= 3 && d.y0 >= 1 && (d.y1 - d.y0) * (d.x1 - d.x0) > 0.03;
        }

        function labelTransform(d) {
            const x = (d.x0 + d.x1) / 2 * 180 / Math.PI;
            const y = (d.y0 + d.y1) / 2 * radius;
            return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
        }

        return svg.node();
    }
 
    componentDidMount() {
        PieDraw=this.drawChart.bind(this);
        
    }
}




export default Pie;