import React from "react";

const getInfo = async function(){
    let tunings;
    return await fetch("http://localhost:8080/api/tunings")
    .then(res => res.json()).then(data => console.log(data)).then(data1 => data1);
}
const postTuning = async function(){
    await fetch('http://localhost:8080/api/tunings', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({name: "Drop D", stringNumber: "6", tunings: ["E", "A", "D", "G", "B", "E"]})
  });
}
const updateTuning = async function(){
    await fetch(`http://localhost:8080/api/tunings/64288a1e0ba1a726ca2494b1`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({name: "Drop C", stringNumber: "6", tunings: ["C", "G", "C", "F", "A", "D"]})
  });
}
const deleteTuning = async function (){
    await fetch(`http://localhost:8080/api/tunings/64288a1e0ba1a726ca2494b1`, {
        method: 'DELETE'});
}
const Dashboard = ()=>{
   return  <div>
        <button onClick={getInfo}> Get tunings</button>
        <button onClick={postTuning}>Post Tunings</button>
        <button onClick={updateTuning}>Update Tunings</button>
        <button onClick={deleteTuning}>Delete Tunings</button>
    </div>
}

export default Dashboard