import React, { useState, useEffect } from "react"
//tables
import Datatable from '../datatable/index';

export default function UseEffect({ link }) {
    //requirements for fetch 
    require('es6-promise').polyfill();
    require('isomorphic-fetch');
    
    //function for table
    const [data,setData] = useState([])
    useEffect(() => {
        fetch('https://csc4710dbs.herokuapp.com/api/getTasks')
          .then((response) => response.json())
          .then((json) => setData(json));
      }, []);
        return(
            <Datatable data={(data)} />
        )
}