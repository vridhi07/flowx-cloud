import React from 'react';
import InputBox from '../InputBox';
import Button from '../Button';

function SingnUpPage({handleChange,handleClick,errorStatus,errorMessage}) {
   
    return (
        <div className='login_page'>
            <div className='login_heading'>SignUp Page</div>
            <div className="login_feilds">
                <InputBox name='firstName' type='text'  handleChange={handleChange} placeholder='First Name' />
                <InputBox name='lastName' type='text'  handleChange={handleChange} placeholder='Last Name' />
                <InputBox name='emailId' type='text'  handleChange={handleChange} placeholder='Emai Id' />
                <InputBox name='passWord' type='password'  handleChange={handleChange} placeholder='PassWord' />
                {errorStatus ? <div>{errorMessage}</div> : null }
                <Button text='Sign Up' handleClick={handleClick} />
                <div className='login_here'>Login here</div>
            </div>
        </div>
    )
}

export default SingnUpPage;