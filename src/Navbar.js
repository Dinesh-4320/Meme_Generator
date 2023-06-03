import React from "react";

export default function Navbar(){
    return(
        <nav>
            <img src="images/logo.png" alt='logo' width="50px"/>
            <h1>Meme Generator</h1>
            <h1 className="project-no">{process.env.REACT_APP_VAR}-Devops-Project</h1>
        </nav>
    )
}