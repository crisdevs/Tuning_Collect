import React from "react";
import { GiGuitarHead } from "react-icons/gi";

export default function Nav(){
    return (
        <>
            <nav className = "flex justify-between text-primary border-b-2 border-primary items-center pt-2 pb-2 shadow-md shadow-current"> 
                <div className = "flex items-center ml-10 text-white">
                <GiGuitarHead className = "mr-6 text-2xl"/>
                <h1 className = "text-2xl">Tuning Collect</h1>
                </div>
                {/* <ul className = "flex text-white">
                    <li className = "mr-10"><a href = "#" >Home</a></li>
                    <li className = "mr-10"><a href = "#">My Dashboard</a></li>
                </ul> */}
            </nav>
        </>
    );
}