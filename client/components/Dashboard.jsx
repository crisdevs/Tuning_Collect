import React, {useState, useEffect} from "react";
import Card from "./Card.jsx";
import Form from "./Form.jsx";
import Modal from "./Modal.jsx";

export default function Dashboard(){
    const [tunings, setTunings] = useState([]);
    const[isEdit, setEdit] = useState(false);
    const [isCreate, setCreate] = useState(false);
    const [selectedTuning, setSelectedTuning] = useState();
    let isSevenString = false;
    //Runs only in the beggining of the application
    useEffect( () => {
        console.log("fetching......");
       //Fetch from the server which will get from the database
       fetch("api/tunings/")
        .then(data => data.json())
        .then(response => setTunings(response)); //Sets to local state
    },[]);
    const blur = (isEdit || isCreate) ? 'blur-md' : "";
    return(
    <>
    <div className = {`flex flex-col pt-20 pb-20 ${blur}`}>  
        <div className = "flex justify-center text-white mb-16">
            <button className = "border-solid border-primary border-2 p-4 rounded-md hover:bg-primary " onClick={()=> setCreate(true)}>Create Tuning</button>
        </div>
        <div className = " dashboard grid grid-cols-4 justify-items-center gap-y-10">
            {tunings.map((tuning) => {return <Card key = {tuning._id} setEdit = {setEdit} isEdit = {isEdit} setTune = {setTunings} tuningProfile = {tuning} isSevenString = {isSevenString} setSelectedTuning = {setSelectedTuning}/>})}
        </div>
    </div>
    {isEdit && <Modal intention = "Edit" setTunings = {setTunings} tuningProfile = {selectedTuning} isEdit = {isEdit} setEdit = {setEdit}/>}
    {isCreate && <Modal intention = "Create" setTunings = {setTunings} tuningProfile = {{ _id: "", name: "", stringNumber: "6", tunings: { 6: "E", 5: "A", 4: "D", 3: "G", 2: "B", 1: "E" } }} setEdit={setCreate} isSevenString = {isSevenString}/>}
    </>
    );
}