import React from 'react'
import Axios from "axios";
import "./Main.css"



export default function Sample() {

    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    


    // Create function to call API
    const createTask = () => {
        Axios.post("https://csc4710dbs.herokuapp.com/api/createTask", {
            title: title,
            description: description,
        }).then(() => {
            console.log("Added Task");
        })
    }

    return (
        <>
        <div className="text-center">
            {/*Create a space before inpu field*/}

            <p1>Create Task</p1>
            <div className="form-group">
                {/* create a title text field*/}
                <input
                    type="text"
                    onChange={(event) => {
                        setTitle(event.target.value);
                    }}
                    placeholder="Enter a title" />

                {/* create a body text field*/}
                <input type="text"
                    onChange={(event) => {
                        setDescription(event.target.value);
                    }}
                    placeholder="Enter a description" />


                {/* create a button to submit the form, and clear text field*/}
                < button onClick={createTask} > Submit</button >
            </div>


        </div >
        </>
    )
}
