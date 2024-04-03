import React, {useState, useEffect, createContext} from "react";
import Card from "./Card.jsx";
import ModalForm from "./ModalForm.jsx";

const TuningContext = createContext({});

export default function Dashboard(){
    const [tunings, setTunings] = useState([]);
    const[isEdit, setEdit] = useState(false);
    const [isCreate, setCreate] = useState(false);
    const [selectedTuning, setSelectedTuning] = useState();
    const blur = (isEdit || isCreate) ? 'blur-md' : "";
    const stateStore = {
        tunings,
        setTunings,
        isEdit,
        setEdit,
        isCreate,
        setCreate,
        selectedTuning,
        setSelectedTuning
    };

    //Runs only in the beggining of the application
    useEffect( () => {
        console.log("fetching......");
       //Fetch from the server which will get from the database
       fetch("api/tunings/")
        .then(data => data.json())
        .then(response => setTunings(response)); //Sets to local state
    },[]);
    return(
    <>
    <TuningContext.Provider value = {stateStore}>
    <div className = {`flex flex-col pt-20 pb-20 ${blur}`}>  
        <div className = "flex justify-center text-white mb-16">
            <button className = "border-solid border-primary border-2 p-4 rounded-md hover:bg-primary " onClick={()=> setCreate(true)}>Create Tuning</button>
        </div>
        <div className = " dashboard grid grid-cols-4 justify-items-center gap-y-10">
            {tunings.map((tuning) => <Card key = {tuning._id} tuningProfile = {tuning}/>)}
        </div>
    </div>
    {(isCreate || isEdit) && <ModalForm />}
    </TuningContext.Provider>
    </>
    );
}

export {TuningContext};