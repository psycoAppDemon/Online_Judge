import React, { useContext } from "react";

const compile = () =>{
    const {proID} = useContext(AddProblem);
    console.log(proID);
    return(
        <AddProblemProvider>
            <div>

</div>

        </AddProblemProvider>
        
    )
}