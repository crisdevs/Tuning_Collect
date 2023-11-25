import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import Select from "./Select.jsx";

export default function Form(props) {
    const [formData, setFormData] = useState({ _id: "", name: "", stringNumber: "6", tunings: {6: "E", 5: "A", 4: "D", 3: "G", 2: "B", 1: "E" } });
    const notes = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];

   const handleChange = (event) => {
    const {name, value} = event.target;

    setFormData((prevState) =>{
        if(name === "tunings"){
            return {...prevState, tunings: {...prevState.tunings, [event.target.id]: value}}
        }
        return {...prevState, [name]: value}
    });
   }
   const renderSelect = (numOfString = 6) =>{
        const arr = [];
        for(let i = numOfString; i > 0; i--){
            arr.push(<Select key = {i} stringNumber = {i} default = {formData.tunings[i]} handleChange = {handleChange} allNotes = {notes} />);
        }
        return arr;
   }

    return (
        <>
            <div className="modal-box" hx-swap="none">
                <h3 className="font-bold text-lg">Create Tuning</h3>
                <form className="grid grid-cols-2 gap-y-2">
                    <label htmlFor="name" className="mr-5">Name of Tuning</label>
                    <input name="name" type="text" onChange={handleChange} />
                    <label htmlFor="stringNumber" className="mr-5">Number of Strings</label>
                    <select name="stringNumber" defaultValue="6" 
                    onChange={(event) => {
                            handleChange(event);
                        }}>
                        <option value={"6"}>6</option>
                        <option value={"7"}>7</option>
                    </select>
                    <fieldset className="col-span-2">
                        <legend>Tunings</legend>
                        <div className="grid grid-cols-2 gap-y-2">
                        {renderSelect(parseInt(formData.stringNumber))}
                    </div>
                </fieldset>
            </form>
            <div className="modal-action">
                <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button type="submit" className="btn" onClick={() => {
                        try {
                             fetch("http://localhost:8080/api/tunings/", {
                                method: 'POST',
                                body: JSON.stringify({
                                    name: formData.name,
                                    stringNumber: formData.stringNumber,
                                    tunings: formData.tunings
                                }),
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                            }).then(data => data.json()).then((res) => { props.setTunings((prevState) => [...prevState, {"_id" : res._id, "name": res.name, "stringNumber": res.stringNumber, "tunings": res.tunings}])});

                            const inputs = document.querySelectorAll("input");
                            for (let i = 0; i < inputs.length; i++) {
                                inputs[i].value = "";
                            }
                        }
                        catch (err) {
                            console.log(err);
                        }
                    }}>Add</button>
                    <button className="btn">Close</button>
                </form>
            </div>
        </div >
        </>
    );
}