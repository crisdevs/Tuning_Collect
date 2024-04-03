import React, {useState ,useEffect, useContext} from "react";
import Select from "./Select.jsx";
import { TuningContext } from "./Dashboard.jsx";

export default function Form(props) {
    const store = useContext(TuningContext);
    const defaultTuningProfile = {
         _id: "", 
         name: "", 
         stringNumber: "6", 
         tunings: 
            { 6: "E",
              5: "A",
              4: "D",
              3: "G",
              2: "B",
              1: "E" 
            } 
        };
    const tuningProfile = store.isCreate ? defaultTuningProfile : store.selectedTuning;
    const [formData, setFormData] = useState(tuningProfile);
    const notes = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];
    window.addEventListener("keydown", (e) =>{
        if(e.key === "Escape"){
            store.setEdit(false);
            store.setCreate(false);
        }
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
    
        setFormData((prevState) => {
            if (name === "tuningNotes") {
                return { ...prevState, tunings: { ...prevState.tunings, [event.target.id]: value } }
            }
            else if (name === "stringNumber") {
                let tempTuning = {};
                for (let y = parseInt(value); y > 0; y--) {
                    if (y === 7) {
                        tempTuning[y] = "B";
                    }
                    else {
                        tempTuning[y] = formData.tunings[y];
                    }

                }
                return { ...prevState, stringNumber: value, tunings: tempTuning };
            }
            return { ...prevState, [name]: value }
        });
    }
    const renderSelect = (numOfString = 6) => {
        const arr = [];
        for (let i = numOfString; i > 0; i--) {
            arr.push(<Select key={i} stringNumber={i} default={formData.tunings[i]} handleChange={handleChange} allNotes={notes} />);
        }
        return arr;
    }

    const createNewTuning = (event) => {
        console.log("Create tuning is being run");
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
            }).then(data => data.json()).then((res) => {
                 store.setTunings((prevState) => [...prevState, { "_id": res._id, "name": res.name, "stringNumber": res.stringNumber, "tunings": res.tunings }]);
                 store.setCreate(false);
                });
            //To prevent the page from refreshing
            event.preventDefault();
        }
        catch (err) {
            console.log(err);
        }
    }

    const editTuning = (event) =>{
        console.log("Edit tuning is being run");
        try {
            fetch(`http://localhost:8080/api/tunings/${formData._id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    name: formData.name,
                    stringNumber: formData.stringNumber,
                    tunings: formData.tunings
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(data => data.json()).then((res) => {store.setTunings((prevState) => {
                    for(let i =0; i < prevState.length; i++){
                        if(prevState[i]._id === formData._id){
                            prevState[i] = formData;
                            return prevState;
                        }
                    }});
                    store.setEdit(false);
                });
                    //To prevent the page from refreshing
                    event.preventDefault()
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
            <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] shadow-xl shadow-primary bg-[#0a1828] border-primary border-2 p-[23px] rounded-md h-[530px]">
                <h3 className="font-bold text-[24px] text-center mb-[25px] text-primary">Create Tuning</h3>
                <form className="grid grid-cols-2 gap-y-2 justify-items-center text-white">
                    <label htmlFor="name" className="mr-5">Name of Tuning</label>
                    <input className = "w-full rounded-md bg-primary opacity-80" name="name" id = "name" type="text" onChange={handleChange} value={formData.name} />
                    <label htmlFor="stringNumber" className="mr-5">Number of Strings</label>
                    <select className = "w-full rounded-md bg-primary opacity-80" name="stringNumber" id = "stringNumber" value={formData.stringNumber}
                        onChange={(event) => {
                            handleChange(event);
                        }}>
                        <option value={"6"}>6</option>
                        <option value={"7"}>7</option>
                    </select>
                    <fieldset className="col-span-2 h-[295px]">
                        <legend className = "text-xl py-[20px] text-center text-primary font-bold">Strings</legend>
                        <div className="grid grid-cols-2 gap-y-2">
                            {renderSelect(parseInt(formData.stringNumber))}
                        </div>
                    </fieldset>
                        <button type="submit" className="text-white border-primary border-2 border-solid rounded-md py-2 px-5 mr-[40px] hover:bg-primary" onClick={(e) => {
                            if(store.isCreate){
                            createNewTuning(e);
                            }
                            else if(store.isEdit){
                                editTuning(e);
                            }
                            }}>Add</button>
                        <button className="text-white border-primary border-2 border-solid rounded-md py-2 px-5 hover:bg-primary" onClick={(e) => {
                            e.preventDefault();
                            if(store.isCreate) store.setCreate(false);
                            else if(store.isEdit) store.setEdit(false);
                            }}>Close</button>
                </form>
            </div >
    );
}