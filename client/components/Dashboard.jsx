import React from "react";
import Card from "./Card.jsx";

export default function Dashboard(){
    return(
    <div className = "grid grid-cols-4 justify-items-center gap-y-10">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
    </div>
    );
}