import { select, axisBottom, axisRight, scaleLinear, scaleBand, max} from 'd3';
import React, { useState, useEffect, useRef } from 'react';

import { useParams } from 'react-router-dom';
import "./Month.css";

function Month(props) {    
    const { month } = props.match.params;      
    const [ data, setData ] = useState([]);
    const [ total, setTotal ] = useState([]);
    const svgRef = useRef();

    function getDBMonth() {
        fetch('steps.json', {
            headers : { 
              'Content-Type': 'application/json',
              'Accept': 'application/json'
             }
          }).then(function(response){
            return response.json();
          })
          .then(function(myJson) {

            const selectMonth = month;
            const arr = [];

            let jsonSort = myJson[0];
            jsonSort = jsonSort[2020];
        
            jsonSort = Object.values(jsonSort[selectMonth]);
            Object.values(jsonSort).forEach(e => {
               arr.push(e['steps']);
            })  
            
            setData(arr); 
            console.log(arr);             
          }).catch(err => console.log(err));
    }

    function totalSteps() {
        let ddd = 0;
        for(let i=0; i<=data.length-1; i++){
            ddd += data[i];
        }
        return  ddd;
    }

    useEffect(() => {
        if(data.length == 0){
            getDBMonth();
        }        

        let t = totalSteps();
        setTotal(t);

        const svg = select(svgRef.current);
        const xScale = scaleBand()
            .domain(data.map((value, index) => index))
            .range([0, 500])
            .padding(0.2);

        const yScale = scaleLinear()
            .domain([0, max(data)])
            .range([300, 0]);

        const colorScale = scaleLinear()
            .domain([1000, 8000, 15000])
            .range(["red","orange","green"])
            .clamp(true);

        const xAxis = axisBottom(xScale).tickFormat(i => i+1);

        svg
            .select(".x-axis")
            .style("transform", "translateY(300px)")
            .call(xAxis);

        const yAxis = axisRight(yScale);
        svg
            .select(".y-axis")
            .style("transform", "translateX(500px)")
            .call(yAxis);

        svg
            .selectAll(".bar")
            .data(data)
            .join("rect")
            .attr("class", "bar")

            .style("transform", "scale(1, -1)")
            .attr("x", (value, index) => xScale(index))
            .attr("y", -300)
            .attr("width", xScale.bandwidth())
            .transition()
            .attr("fill", colorScale)
            .attr("height", value => 300 - yScale(value));
    }, [data]);

    return (
        <React.Fragment>
            <div className="Month">
                <h3 className="month">{month}</h3>           
            </div>
            <svg ref={svgRef}>
                <g className="x-axis" />
                <g className="y-axis" />
            </svg>
            <h4 className="steps">total: {total}</h4>
        </React.Fragment>
        
    );
}

export default Month;