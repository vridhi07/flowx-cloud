import React, { useState } from "react";
import SignInPage from "../src/Components/SignIn";
import { useRouter } from "next/router";
import { login } from "../src/services/API/auth";
import { auth, db } from '../src/firebaseConfig';

function Login() {
  const [loginDetails, setLoginDetails] = useState({
    emailId: "",
    passWord: "",
    confirmPassword: "",
    errorMessage: "",
    uid: '',
    errorStatus: false,
    firstName: "",
    lastName: "",
  });
  const [loader, setLoader] = useState(false)
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginDetails({ ...loginDetails, [name]: value });
  };

  const handleClick = async () => {
    setLoader(true);
    if (loginDetails.emailId) {
      try {
        let resp = await login(loginDetails);
        localStorage.setItem('currentUser', JSON.stringify(resp.user.uid));
        //------add data in firestore-------//
        router.push("/");
      } catch (error) {
        let errorMessage = error.message;
        setLoginDetails({
          ...loginDetails,
          errorMessage: errorMessage,
          errorStatus: true,
        });
        setLoader(false);
      }
    } else {
      setLoginDetails({
        ...loginDetails,
        errorMessage: "Enter email",
        errorStatus: true,
      });
    }
  };

  const handleSignUp = async () => {
    setLoader(true)
    if (loginDetails.passWord === loginDetails.confirmPassword) {
      if (loginDetails.passWord.length >= 6) {
        auth.createUserWithEmailAndPassword(loginDetails.emailId, loginDetails.passWord)
          .then((userCredential) => {
            var user = auth.currentUser; 
            localStorage.setItem('currentUser', JSON.stringify(userCredential.user.uid));
            user.updateProfile({ displayName: `${loginDetails.firstName} ${loginDetails.lastName}`})
            setLoginDetails({ ...loginDetails, uid: userCredential.user.uid })
            const data = {
              Email: loginDetails.emailId,
              Name: `${loginDetails.firstName} ${loginDetails.lastName}`,
            }
            db.collection('Users').doc(`${userCredential.user.uid}`).set({ userInfo: data });
            router.push("/");
          })
          .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            setLoginDetails({ ...loginDetails, errorStatus: true, errorMessage: errorMessage })
          });
      }
      else {
        setLoginDetails({ ...loginDetails, errorStatus: true, errorMessage: 'please enter atleast 6 digit password' })
        setLoader(false)
      }
    } else {
      setLoginDetails({ ...loginDetails, errorStatus: true, errorMessage: 'password does not matched' })
      setLoader(false)
    }
  }

  return (
    <SignInPage
      handleChange={handleChange}
      handleClick={handleClick}
      errorStatus={loginDetails.errorStatus}
      errorMessage={loginDetails.errorMessage}
      handleSignUp={handleSignUp}
      loader={loader}
    />
  );
}

export default Login;
