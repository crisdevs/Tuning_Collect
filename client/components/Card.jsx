import React from "react";

export default function Card(){
    return(
        <div className = "text-white border w-52 flex flex-col items-center rounded-lg py-2">
            <h2 >My Tuning Name</h2>
            <p>Number of Strings: 6</p>
            <ul>
                <li>E</li>
                <li>A</li>
                <li>D</li>
                <li>G</li>
                <li>B</li>
                <li>E</li>
            </ul>
            <div className = "mt-5">
                <button className = "mr-3 border rounded p-2">Edit</button>
                <button className = "border rounded p-2">Delete</button>
            </div>
        </div>
    );
}