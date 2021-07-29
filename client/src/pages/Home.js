import React from "react";
import Button from "../components/Buttons"

function Home() {
    return (
        <div className="main-container">
            <header className="header-container">
                <div className="title">
                    <h1 className="landing-title">Travellers</h1>
                </div>
                
                <div className="btn-container">
                    <Button />
                </div>   
            
            </header>

        </div>
        
    )
}

export default Home;