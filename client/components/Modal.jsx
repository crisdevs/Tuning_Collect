import Form from "./Form.jsx";
import React from "react";
const Modal = (props) => {
    return(
        <div className = "absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] shadow-xl shadow-primary ">
            <Form intention = {props.intention} setTunings = {props.setTunings} tuningProfile = {props.tuningProfile} isEdit = {props.isEdit} setEdit = {props.setEdit}/>
        </div>
    )
}

export default Modal;