import React, { useState, useEffect, useContext } from "react";
import { TuningContext } from "./Dashboard.jsx";

export default function Card(props) {
    const { name, stringNumber, _id } = props.tuningProfile;
    const store = useContext(TuningContext);
    const tunings = Object.entries(props.tuningProfile.tunings).reverse();
    const deleteTuning = () => {
        fetch(`api/tunings/${_id}`, { method: 'DELETE' })
            .then(() => store.setTunings((prevState) => prevState.filter(state => state._id !== _id)));
    }
    return (
        <div className="text-white border border-primary w-52 flex flex-col items-center rounded-lg py-2 h-[300px]">
            <h2 >Name: {name}</h2>
            <p>Number of Strings: {stringNumber}</p>
            <ul>
                {tunings.map((tuning) => {
                    return <li key={tuning[0]}>{tuning[0]}: {tuning[1]}</li>
                })}
            </ul>
            <div className="mt-auto mb-[10px]">
                <button className="mr-3 border border-primary hover:bg-primary rounded p-2" onClick={() => {
                    store.setEdit(true);
                    store.setSelectedTuning(props.tuningProfile);
                }}>Edit</button>
                <button className="border border-primary hover:bg-primary rounded p-2" onClick={deleteTuning}>Delete</button>
            </div>
        </div>
    );
}