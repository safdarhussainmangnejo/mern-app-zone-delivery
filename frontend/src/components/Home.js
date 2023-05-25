import React from "react";
import Navbar from "./Navbar";
function Home(){
    const username = localStorage.getItem('username');
    return(
        <div>
            <Navbar/><br/>
            <h1>Welcome  {username}</h1>
        </div>
    )
}
export default Home;