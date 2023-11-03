import React from "react";

export default function Form(props){

    console.log(props.stringNumber);
    return(
        <>
            <label>#{props.stringNumber} String:</label>
            <select id = {props.stringNumber} value = {props.defaultNote} onChange = {(event) => props.tuningNotes[props.stringNumber] = event.target.value}>
                {props.notes.map((note, i) => <option key = {i}>{note}</option>)}
                {console.log(props.defaultNote)}
            </select>
        </>
    );
}