import React from "react";

export default function Form(props){

    function changeTuning (event){
        props.tuningNotes[props.stringNumber - 1] = event.target.value;
    }
    console.log(props.stringNumber);
    return(
        <>
            <label>#{props.stringNumber} String:</label>
            <select onChange = {(event) => props.tuningNotes[props.stringNumber] = event.target.value}>
                {props.notes.map((note, i) => <option key = {i}>{note}</option>)}
            </select>
        </>
    );
}