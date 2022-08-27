import React from "react";

export default function Die(props){

    const styles = {
        backgroundColor : props.isHeld ? "#59E391" : "white"
    }
    return (
        <div className="col-sm-2 mt-5 die--face" style={styles} onClick={props.toggle}>
            <h3 className="die--num">{props.value}</h3>
        </div>
        
    )
}