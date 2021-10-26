import Firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyCFx_PAWJ8eYZGT_E3sTOfpMRyvxDBiqJA",
  authDomain: "instagram-with-react-fdf82.firebaseapp.com",
  projectId: "instagram-with-react-fdf82",
  storageBucket: "instagram-with-react-fdf82.appspot.com",
  messagingSenderId: "435054180394",
  appId: "1:435054180394:web:5333ea554c8ba07d5deb53",
};

const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;

export { firebase, FieldValue };
