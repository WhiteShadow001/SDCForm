import { useEffect, useState, useContext } from 'react';
import { shareData } from '../App';

function Table_2(props){

    let receivedData = useContext(shareData);
    
    // it ereases the data from te form
    useEffect(()=>{
        receivedData.setName("");
        receivedData.gender.forEach(a=>(a.selected=false))
        receivedData.setGenderID("")
        receivedData.subject.forEach(a=>(a.selected=false))
        receivedData.setSubjectID("")
        receivedData.setToUpdateData("")
    }, [])

    const [studentList, setStudentList] = useState([]);

    // For initial fetch
    useEffect(()=>{
        getData()
    }, []);

    const getData = ()=>{
        fetch('http://localhost:5000/student/getallstudent')
        .then(response => response.json())
        .then(data => {
        // debugger;
            setStudentList(data);
        })
    }

    // for data change after deletion
    const del = (e, itemID)=>{
        console.log("yolo");
        var id ={id: parseInt(itemID)};

        fetch('http://localhost:5000/student/delete', {
          method: 'POST',
          headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
          },
          body: JSON.stringify(id)
        }).then(res=>{
            getData();
        });
        
    }

    return(
        <>
            <table border='2' className="table table-hover table-bordered mt-4">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Gender</th>
                        <th scope="col">Subject</th>
                        <th scope="col-2">Modify</th>
                    </tr>
                </thead>

                <tbody>
                    {studentList.map(a=>(
                        <tr>
                            <td>{a.id}</td>

                            <td>{a.name}</td>

                            <td>{
                                // receivedData.gender.length>0?receivedData.gender.filter(b=>(b.id==a.subject_id))[0].name:""
                                receivedData.gender.length>0?receivedData.capitalize(receivedData.gender.filter(b=>(b.id==a.gender_id))[0].name):""
                            }</td>
                            <td>{
                                receivedData.subject.length>0?receivedData.capitalize(receivedData.subject.filter(b=>(b.id==a.subject_id))[0].name):""
                            }</td>

                            <td>
                                    <button className="btn btn-warning" value={a.id} onClick={(e)=>{receivedData.updateItem(e.target.value)}}>Edit</button>

                                    <button className="btn btn-danger" value={a.id} onClick={(e)=>{del(e, a.id)}}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default Table_2;