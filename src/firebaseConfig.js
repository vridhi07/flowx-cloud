import { apps } from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import { firebase } from '@firebase/app';
 



if (!apps?.length) {
    const firebaseConfig = {
        apiKey: "AIzaSyBDMMCUukjdQzkBkH9mquYqFydWFVQzPQM",
        authDomain: "flowx-2be91.firebaseapp.com",
        databaseURL: "https://flowx-2be91.firebaseio.com",
        projectId: "flowx-2be91",
        storageBucket: "flowx-2be91.appspot.com",
        messagingSenderId: "407173134045",
        appId: "1:407173134045:web:41e9cd9712c0d83b2b8d34",
        measurementId: "G-2P6QGWJVN7"
    }
    firebase.initializeApp(firebaseConfig)
}

const storage = firebase.storage()
const db = firebase.firestore()
const auth = firebase.auth()


export {
    storage,
    db,
    auth,
}
