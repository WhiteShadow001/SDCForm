import { createContext, useContext, useEffect, useState } from 'react';
import './App.css';
import Form_2 from './Components/Form_2';
import Table_2 from './Components/Table_2';
import 'bootstrap/dist/css/bootstrap.min.css';

// import Table from './Components/Table';

function App() {

  const [state, setState] = useState(1);

  const [name, setName] = useState("");

  const [gender, setGender] = useState([]);
  const [genderID, setGenderID] = useState();

  const [subject, setSubject] = useState([]);
  const [subjectID, setSubjectID] = useState();

  const [toUpdateData, setToUpdateData] = useState();

  const switchState = ()=>{
    state===1?setState(2):setState(1);
  }
  
// gets all the gender form the database
  useEffect(()=>{
    fetch('http://localhost:5000/student/getallgender')
    .then(response => response.json())
    .then(data => {
      data.forEach((a=>{
        a.selected=false
      }))
      setGender(data)
    })
  }, []);

// get all the subjext from the database
  useEffect(()=>{
    fetch('http://localhost:5000/student/getallsubject?id=0')
    .then(response => response.json())
    .then(data => {
      data.forEach((a=>{
        a.selected=false
      }))
      setSubject(data)
    })
  }, []);


  // responsible for handling te changes in the name
const nameHandler = (e)=>{
  var value = e.target.value;
  setName(value.trim());
}

// responsible for handiling the changes in the gender
const genderHandler = (e)=>{
  var value = e.target.value;
  gender.filter(a=>(a.id==value))[0].selected=true;
  setGenderID(value);
}

// responsible for handling the changes in subject
const subjectHandler = (e)=>{
  var value = e.target.value;
  subject.filter(a=>(a.id==value))[0].selected=true;
  setSubjectID(value);
}

// it saves the data and clears the form
const saveData = ()=>{

  var data={
    name: name,
    subject_id: parseInt(subjectID),
    gender_id: parseInt(genderID)
  };

  if(data.name.length <= 0) return;
  if(!data.subject_id) return;
  if(!data.gender_id) return;
  
      fetch('http://localhost:5000/student/create', {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(res=>res.json())
    .then(alert("Data added successuflly"))
    .then(setName(""))
    .then(gender.forEach(a=>(a.selected=false)))
    .then(setGenderID(""))
    .then(subject.forEach(a=>(a.selected=false)))
    .then(setSubjectID(""))
}

// self function for capitalizing the initial alphabeth
function capitalize(val){
  var returnValue = val.charAt(0).toUpperCase() + val.substr(1).toLowerCase();
  return returnValue;
}

// responsible for deleting the data
//  Problem:Need to find a way fo auto refresh
const deleteItem =(itemID) =>{
  var id ={id: parseInt(itemID)};

  fetch('http://localhost:5000/student/delete', {
    method: 'POST',
    headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
    },
    body: JSON.stringify(id)
  }).then(res=>res.json())
}

// doesnt update the item but take us to the editing page
const updateItem = (itemID)=>{
  state===1?setState(2):setState(1);
  var link = 'http://localhost:5000/student/getallstudent?id='+itemID;
  fetch(link)
    .then(response => response.json())
    .then(data => {
      setToUpdateData(data)
      setName(data[0].name.trim())
      gender.filter(a=>(a.id==data[0].gender_id))[0].selected=true
      setGenderID(data[0].gender_id)
      subject.filter(a=>(a.id==data[0].subject_id))[0].selected=true
      setSubjectID(data[0].subject_id)
    })
}

// it updates the data in database to new value
const updateData = (itemID)=>{

  console.log(genderID)
  console.log(subjectID)

  var data={
    name: name,
    subject_id: parseInt(subjectID),
    gender_id: parseInt(genderID),
    id: parseInt(itemID)
  };

  if(data.name.length <= 0) return;
  if(!data.subject_id) return;
  if(!data.gender_id) return;

  var link = 'http://localhost:5000/student/update';
  fetch(link, {
    method: 'POST',
    headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(res=>res.json())
  .then(alert("Data Updated Successfully"))
  .then(setName(""))
  .then(gender.forEach(a=>(a.selected=false)))
  .then(setGenderID())
  .then(subject.forEach(a=>(a.selected=false)))
  .then(setSubjectID())
  .then(toUpdateData)
  state===1?setState(2):setState(1);
}


  return (
    <shareData.Provider value={{
        name: name,
        setGenderID: setGenderID,
        setSubjectID: setSubjectID,
        setName: setName,
        gender: gender,
        setGender: setGender,
        subject: subject,
        setSubject: setSubject,
        nameHandler: nameHandler,
        genderHandler: genderHandler,
        subjectHandler: subjectHandler,
        saveData: saveData,
        capitalize: capitalize,
        deleteItem: deleteItem,
        updateItem: updateItem,
        toupdate: toUpdateData,
        setToUpdateData: setToUpdateData,
        updateData: updateData
      }
    }>
      <div className="App">
        <button onClick={switchState} className="col-sm-6">Table</button>
        <button onClick={switchState} className="col-sm-6">Form</button>
        {state==1?<Table_2 />: <Form_2 />}
        
      </div>
    </shareData.Provider>
  );
}

export default App;
export const shareData = createContext();

