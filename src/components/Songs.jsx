import React from "react";

export default function Songs({a,changePlayer})
{
    const playChange = ()=>{
        changePlayer(a);
    }
    const musicPlayer = new Audio();
    return (
        <div onClick={playChange} style={{display:"flex",justifyContent:"space-between",padding:"5px",alignItems:"center",borderRadius:"10px",border:"1px solid black"}}>
            <img src={a.image} alt="" />
            <p style={{width:"20%"}}>{a.name}</p>
            <p style={{width:"20%"}}>{a.artist}</p>
        </div>
    )
}