import React, {useContext} from "react";
import {MyContext} from "./Context";


function Home(){
    const ctx = useContext(MyContext);
    console.log(ctx)
    return(
        <div>
            <p>Home</p>
        </div>
    )
}

export default Home ;