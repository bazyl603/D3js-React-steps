import { json, select } from 'd3';
import React, { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';
import "./Month.css";

function Month(props) {    
    const { month } = props.match.params;      
    const [ data, setData ] = useState([]);

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

    useEffect(() => {
        getDBMonth();
    }, []);

    return (
        <div className="Month">
            <h3 className="month">{month}</h3>
            <p>{data}</p>
        </div>
    );
}

export default Month;