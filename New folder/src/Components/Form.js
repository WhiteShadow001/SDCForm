function Form(props){

    const nameHandler = (e)=>{
        var nameInput = e.target.value;
        props.setName(nameInput);
    }

    const userInfoSetter = ()=>{
        props.setUserInfo({
          id:1,
          name: props.name
        })
    }

    return(
        <>
        <h3>Name:</h3>
        <input type="text" onChange={nameHandler} onKeyUp={userInfoSetter} value={props.name} />

        </>
    );
}

export default Form;