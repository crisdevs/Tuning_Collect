import React from "react";

export default function Nav(){
    return (
        <>
            <nav className = "flex justify-between text-primary items-center mb-20"> 
                <h1 className = "text-2xl ml-10">Tuning Collect</h1>
                <ul className = "flex">
                    <li className = "mr-10">Home</li>
                    <li className = "mr-10">My Dashboard</li>
                </ul>
            </nav>
        </>
    );
}