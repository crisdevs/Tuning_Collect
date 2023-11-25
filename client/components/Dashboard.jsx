import React, {useState, useEffect} from "react";
import Card from "./Card.jsx";
import Form from "./Form.jsx";

export default function Dashboard(){
    const [tunings, setTunings] = useState([]);
    let isSevenString = false;

    console.log("these are tunings from dashboard", tunings);

    useEffect( () => {
       fetch("api/tunings/")
        .then(data => data.json())
        .then(response => setTunings(response));
    },[]);
    return(
    <>
        <button onClick={()=>document.getElementById('my_modal_1').showModal()}>Create Tuning</button>
        <dialog id="my_modal_1" className="modal">
            <Form setTunings = {setTunings} isSevenString = {isSevenString}/>
        </dialog>
        <div className = " dashboard grid grid-cols-4 justify-items-center gap-y-10">
            {tunings.map(tuning => <Card key = {tuning._id} setTune = {setTunings} tuningProfile = {tuning} isSevenString = {isSevenString}/>)}
        </div>
    </>
    );
}