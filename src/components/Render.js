import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import "./Render.css";

function Render() {
    const [month, setMonth] = useState('January');

    const selectMonth = (event) => {
        setMonth(event.target.value);
    }

    return (
        <div className="Render">
            <h2 className="year">2020</h2>
            <label>
                Please select a month:
            <br/>
            <select className="select" value={month} onChange={selectMonth}>
                <option value="January">January</option>
                <option value="February">February</option>
                <option value="March">March</option>
                <option value="April">April</option>
                <option value="May">May</option>
                <option value="June">June</option>
                <option value="July">July</option>
                <option value="August">August</option>
                <option value="September">September</option>
                <option value="October">October</option>
                <option value="November">November</option>
                <option value="December">December</option>
            </select>
            <br/>
            </label>
            <Link to={`/${month}`} className="text-button"><button class="pure-button pure-button-primary">Gooo</button></Link>
        </div>
    );
}

export default Render;