import { useContext, useEffect, useState } from "react";
import { shareData } from "../App";

function Form_2(){

  const props = useContext(shareData);

  const [buttonName, setButtonName] = useState("Save");

  useEffect(()=>{
    props.toupdate?setButtonName("Update"):setButtonName("Save")
  });
  
  
    return(
        <>

          <div className="form-group row mt-4">
            <h3 className="col-sm-2 col-form-label">Name</h3>
            <div className="col-sm-8">
              <input type="text" className="form-control" value={ props.name} onChange={(e)=>{
              props.nameHandler(e)}} />
            </div>
          </div>

          <div className="form-group row mt-4">
            <h3 className="col-sm-2 col-form-label">Gender:</h3>
            <div className="col-sm-8">
              <select className="form-select" onChange={(e)=>{
                props.genderHandler(e)
              }}>
                  <option>--SELECT GENDER--</option>
                  {props.gender.map(a=>(
                      <option selected={a.selected} key={a.id} value={a.id}>{props.capitalize(a.name)}</option>
                  ))}
              </select>
            </div>
          </div>


          <div className="form-group row mt-4">
            <h3 className="col-sm-2 col-form-label">Subject:</h3>
            <div className="col-sm-8">
            <select className="form-select" onChange={(e)=>{
              props.subjectHandler(e)
            }}>
              <option>--SELECT SUBJECT--</option>
                {props.subject.map(a=>(
                    <option selected={a.selected} key={a.id} value={a.id}>{props.capitalize(a.name)}</option>
                ))}
            </select>
            </div>
          </div>

          {buttonName==="Save"?
            <button className="btn btn-success mt-4 col-sm-3" onClick={props.saveData}>{buttonName}</button>:
            <button value={props.toupdate.length>0?props.toupdate[0].id:0} className="btn btn-success mt-4 col-sm-3" onClick={(e)=>{props.updateData(e.target.value)}}>{buttonName}</button>
          }
        </>
    );
}

export default Form_2;