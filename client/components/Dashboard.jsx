import React, {useState, useEffect} from "react";
import Card from "./Card.jsx";
import Form from "./Form.jsx";

export default function Dashboard(){
    const [tunings, setTunings] = useState([]);
    const notes = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];
    let name, numberOfStrings;
    const tuningNotes = {6: "", 5:"", 4:"", 3:"", 2:"", 1:""};

    useEffect( () => {
       fetch("api/tunings/")
        .then(data => data.json())
        .then(response => setTunings(response));
    },[]);
    return(
    <>
        <button onClick={()=>document.getElementById('my_modal_1').showModal()}>Create Tuning</button>
        <dialog id="my_modal_1" className="modal">
            <div className="modal-box" hx-swap = "none">
            <h3 className="font-bold text-lg">Create Tuning</h3>
            <form className = "grid grid-cols-2 gap-y-2">
                <label className="mr-5">Name of Tuning</label>
                <input type = "text" onChange ={ (event) => {name = event.target.value; console.log(name)}}/>
                <label className="mr-5">Number of Strings</label>
                <select onChange = {(event) => {numberOfStrings = event.target.value; console.log(numberOfStrings)}}>
                    <option value = "6">6</option>
                    <option value = "7">7</option>
                </select>
                <fieldset className = "col-span-2">
                    <legend>Tunings</legend>
                    <div className = "grid grid-cols-2 gap-y-2">
                        <Form stringNumber = {6} notes = {notes} tuningNotes = {tuningNotes}></Form>
                        <Form stringNumber = {5} notes = {notes} tuningNotes = {tuningNotes}></Form>
                        <Form stringNumber = {4} notes = {notes} tuningNotes = {tuningNotes}></Form>
                        <Form stringNumber = {3} notes = {notes} tuningNotes = {tuningNotes}></Form>
                        <Form stringNumber = {2} notes = {notes} tuningNotes = {tuningNotes}></Form>
                        <Form stringNumber = {1} notes = {notes} tuningNotes = {tuningNotes}></Form>
                    </div>
                    <button type="button" className = "btn" onClick = { async () => {
                        try{
                        await fetch("http://localhost:8080/api/tunings/", {
                            method: 'POST',
                            body: JSON.stringify({
                                name: name,
                                stringNumber: numberOfStrings,
                                tunings: {tuningNotes}
                            }),
                            headers: {
                                'Content-Type' : 'application/json'
                            }
                        }).then(data => data.json()).then(res => console.log(res));
                    }
                    catch(err){
                        console.log(error);
                    }
                    }}>Add</button>
                </fieldset>
            </form>
                <div className="modal-action">
                    <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn">Close</button>
                    </form>
                </div>
            </div>
        </dialog>
        <div className = " dashboard grid grid-cols-4 justify-items-center gap-y-10">
            {tunings.map(tuning => <Card key = {tuning._id} tuningProfile = {tuning} />)}
        </div>
    </>
    );
}