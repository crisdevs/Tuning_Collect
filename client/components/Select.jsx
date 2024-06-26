import React from "react";


export default function Select(props) {
    return (
        <>
            <label htmlFor="tuningNotes">#{props.stringNumber} String:</label>
            <select className = "ml-[10px] text-center rounded-md bg-primary opacity-80" name="tuningNotes" id={props.stringNumber} value={props.default} onChange={props.handleChange}>
            {props.allNotes.map((note, i) => <option key={i}>{note}</option>)}
            /</select>
        </>
            );
}