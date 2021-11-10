import React from 'react';

export default function Datatable({ data }) {
  const columns = data[0] && Object.keys(data[0]);
  return (
    <>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>
      </head>
      <table cellPadding={0} cellSpacing={0}>
        <thead>
          <tr>
            {data[0] && columns.map((heading) => <th>{heading}</th>)}
            {/* if we want "edit" as header than we can add the line below this*/}
            {/* <th>edit</th> */}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr>
              {columns.map((column) => (
                <td>{row[column]}</td>
              ))}
              <span  class="material-icons" style={{color: "rgb(25 118 210)"}}>edit</span>
            </tr>
            
          ))}
        </tbody>
        
      </table>
    </>
  );
}