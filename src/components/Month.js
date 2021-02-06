import React, { useState } from 'react';

import { useParams } from 'react-router-dom';
import "./Month.css";

function Month(props) {    
    const { month } = props.match.params;
    return (
        <div className="Month">
            <h3 className="month">{month}</h3>
        </div>
    );
}

export default Month;