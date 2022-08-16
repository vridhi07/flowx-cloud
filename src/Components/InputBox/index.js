import React from 'react';

function InputBox ({placeholder,type,handleChange,name}) {
    
    
    return(
        <input name={name}  className='login_inputbox' type={type} placeholder={placeholder} onChange={(e) =>handleChange(e)}/>
    )
}

export default InputBox;