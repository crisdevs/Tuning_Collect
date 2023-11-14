import React, {useState, useEffect} from "react";
import Card from "./Card.jsx";
import Form from "./Form.jsx";

export default function Dashboard(){
    const [tunings, setTunings] = useState([]);
    const notes = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];
    let name;
    let numberOfStrings = 6;
    const tuningNotes = {6: "E", 5:"A", 4:"D", 3:"G", 2:"B", 1:"E"};

    console.log(tunings);

    useEffect( () => {
       fetch("api/tunings/")
        .then(data => data.json())
        .then(response => setTunings(response));
    },[]);

    const handleChange = (event) =>{
        const {value, name} = event.target;
        setTunings((prevState) => {
            return [...prevState]
        });
    }
    
    return(
    <>
        <button onClick={()=>document.getElementById('my_modal_1').showModal()}>Create Tuning</button>
        <dialog id="my_modal_1" className="modal">
            <div className="modal-box" hx-swap = "none">
            <h3 className="font-bold text-lg">Create Tuning</h3>
            <form className = "grid grid-cols-2 gap-y-2">
                <label htmlFor = "tuningName" className="mr-5">Name of Tuning</label>
                <input name = "tuningName" type = "text" onChange ={ (event) => {name = event.target.value;}}/>
                <label htmlFor = "stringNumber" className="mr-5">Number of Strings</label>
                <select name = "stringNumber" value = "6" onChange = {(event) => {numberOfStrings = event.target.value;}}>
                    <option value = "6">6</option>
                    <option value = "7">7</option>
                </select>
                <fieldset className = "col-span-2">
                    <legend>Tunings</legend>
                    <div className = "grid grid-cols-2 gap-y-2">
                        <Form stringNumber = {6} defaultNote = {"E"} notes = {notes} tuningNotes = {tuningNotes}></Form>
                        <Form stringNumber = {5} defaultNote = {"A"} notes = {notes} tuningNotes = {tuningNotes}></Form>
                        <Form stringNumber = {4} defaultNote = {"D"} notes = {notes} tuningNotes = {tuningNotes}></Form>
                        <Form stringNumber = {3} defaultNote = {"G"} notes = {notes} tuningNotes = {tuningNotes}></Form>
                        <Form stringNumber = {2} defaultNote = {"B"} notes = {notes} tuningNotes = {tuningNotes}></Form>
                        <Form stringNumber = {1} defaultNote = {"E"} notes = {notes} tuningNotes = {tuningNotes}></Form>
                    </div>
                </fieldset>
            </form>
                <div className="modal-action">
                    <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button type="submit" className = "btn" onClick = { async (event) => {
                        event.preventDefault();
                        try{
                        await fetch("http://localhost:8080/api/tunings/", {
                            method: 'POST',
                            body: JSON.stringify({
                                name: name,
                                stringNumber: numberOfStrings,
                                tunings: tuningNotes
                            }),
                            headers: {
                                'Content-Type' : 'application/json'
                            }
                        }).then(data => data.json()).then(res =>  setTunings((prevState) =>{
                            return [...prevState, {"name": res.name, "stringNumber": res.stringNumber, "tunings": res.tunings}];
                        }));
                    }
                    catch(err){
                        console.log(error);
                    }
                    }}>Add</button>
                    <button className="btn">Close</button>
                    </form>
                </div>
            </div>
        </dialog>
        <div className = " dashboard grid grid-cols-4 justify-items-center gap-y-10">
            {tunings.map(tuning => <Card key = {tuning._id} setTune = {setTunings} tuningProfile = {tuning} />)}
        </div>
    </>
    );
}