import React, { useEffect, useState } from "react";

function Table(props){
    // useEffect(()=>{
    //     console.log(props);
    // }, []);
    const [counter, setCounter] = useState(1);

    return(
        <>
            {props.studentList.map(a=>(
                <tr><th>{a.id}</th><th>{a.name}</th></tr>
            ))}
        </>
    );
}

export default Table;