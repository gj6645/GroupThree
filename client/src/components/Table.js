import React from 'react'
import MaterialTable from 'material-table';
import React, { useEffect, useState } from 'react';
import axios from 'axios';



export default function Table() {

    const [Data, setData] = useState([]);

    let columns = [
        { title: 'DESCRIPTION', field: 'description' },
        { title: 'PRIORITY', field: 'priority' },
        { title: 'CATEGORIES', field: 'categories' },
        { title: 'STATUS', field: 'status' },
        { title: 'DUEDATE', field: 'duedate' },
      ]

      useEffect(() => {
        axios.get('https://csc4710dbs.herokuapp.com/api/getTasks')
        .then((response) => response.json())
        .then((json) => setData(json));
        }, []);
        



    return (
        <div>
            
        </div>
    )
}
