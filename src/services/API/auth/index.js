import React from "react";
import { auth } from '../../../../src/firebaseConfig';

export const login = (loginDetails) => {
  return new Promise((resolve, reject) => {
    try {
      auth
        .signInWithEmailAndPassword(loginDetails.emailId, loginDetails.passWord)
        .then((userCredential) => {
          resolve(userCredential);
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          reject(error);
        });
    } catch (error) {
      reject(error);
    }
  });
};
