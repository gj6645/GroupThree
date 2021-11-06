import React from "react"
import Cards from "../components/Cards"
import "./Authors.css"


export default function Authors() {

   

    return (
        <>
            {/* Create h1 title called Author and center it*/}
            <h1 className="text-center" >Authors</h1>

            {/* Paragraph */}
            <p className="text-center">
                Here are all the contributors to the development of CSC 4710 Todo Application.
            </p>

        <Cards />

        </>
        
    )
}