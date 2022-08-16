import React, { useState } from "react";
import UpdatePasswordPage from '../src/Components/UpdatePassword';
import { auth } from '../src/firebaseConfig';

function UpdatePassword() {
    const [email, setEmail] = useState('');
    const [loader, setLoader] = useState(false);
    const [message , setMessage] = useState('');

    const handleUpdatePassword = (event) => {
        event.preventDefault()
        setLoader(true)
        var actionCodeSettings = {
            url: `https://flowx-2be91.web.app/?email=${email}`,
            handleCodeInApp: true
          };
        auth.sendPasswordResetEmail(email,actionCodeSettings)
            .then((res) => {
                setLoader(false)
                setMessage('We have sent an email through to you to update your password')
            })
            .catch((error) => {
                setLoader(false)
                var errorCode = error.code;
                var errorMessage = error.message;
                setMessage(errorMessage)
            });
    }

    const handleChange = (e) => {

        setEmail(e.target.value)
        setMessage('')
    }
    return (
        <UpdatePasswordPage
            handleChange={handleChange}
            handleUpdatePassword={handleUpdatePassword}
            loader={loader}
            message={message}
        />
    );
}
export default UpdatePassword;
