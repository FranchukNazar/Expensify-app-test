import React from 'react';


const InputExpenses = (props) => (

    <div>
        <input type="text" onChange={props.handleOnChange}/>
        <button onClick={props.handleParse}>Submit</button>
    </div>

);

export default InputExpenses;


