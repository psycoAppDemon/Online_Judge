import React, { useContext } from "react";
impo

const problemList = () =>{
    const {proID,setProID} = useContext(AddProblem);

    const fetchProb = async() =>{
        const response = await fetchProb();
        setProID(response.proID);
    }
    return(
        <div>

        </div>
    )
}