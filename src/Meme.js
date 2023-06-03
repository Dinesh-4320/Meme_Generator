import React from "react";
import MemeData from "./MemeData";

export default function Meme(){
    const memeArray=MemeData.data.memes;
    const [image,setImage]=React.useState("");
    function get_image(){
        const randomNo=Math.floor(Math.random()*memeArray.length);
        setImage(memeArray[randomNo].url)
    }

    const [Memelines,setMemelines]=React.useState({
        firstline:"",
        bottomline:""
    })

    function handlechange(event){
        const {name, value}= event.target
        setMemelines(prevstate => ({
            ...prevstate,
            [name]:value
        })
    )}
    
    return(
        <main>
            <div className="form">
                <input type="textbox"  className="form-input" onChange={handlechange} value={Memelines.firstline} name="firstline" placeholder="Enter the statement 1"/>
                <input type="textbox" className="form-input" onChange={handlechange} value={Memelines.bottomline} name="bottomline" placeholder="Enter the statement 2"/>
                <button onClick={get_image} className="form-button">Get a new meme image</button>
            </div>
                {image===""?"":<center><div className="meme-container">
                        <h1 className="topline">{Memelines.firstline}</h1>
                        <h1 className="bottomline">{Memelines.bottomline}</h1>
                        <img src={image} width="100%" height="100%" alt="meme" className="meme-image"/>
                        </div></center>}
        </main>
    )
}