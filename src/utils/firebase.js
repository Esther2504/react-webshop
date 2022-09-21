// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { signOut } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
   apiKey: "AIzaSyCm1qXmCSPHeUMKTkgqHNGqwK2JAG9-PdQ",
   authDomain: "webshop-happypaws.firebaseapp.com",
   projectId: "webshop-happypaws",
   storageBucket: "webshop-happypaws.appspot.com",
   messagingSenderId: "959894529783",
   appId: "1:959894529783:web:37fc540e739dc5297a95f2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const SignOut = () => {
   signOut(auth)
      .then(function () {
         // console.log('Signout Succesfull')
      }, function (error) {
         // console.log('Signout Failed')
      });
}

export const googleSignIn = () => {
   const provider = new GoogleAuthProvider();
   signInWithPopup(auth, provider)
      .then((result) => {
         // console.log(result)

      })
      .catch((error) => {
         // console.log(error);

       
      })
};

export const signIn = (email, password) => {
   signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
         // Signed in 
         const user = userCredential.user;
         //  alert("ingelogd!")
         // ...
      })
      .catch((error) => {
         const errorCode = error.code;
         const errorMessage = error.message;

         switch (errorCode) {
            case "auth/user-not-found":
               alert("Onbekende gebruiker");
               break;
            case "auth/invalid-email":
               alert("Ongeldige email");
               break;
            case "auth/wrong-password":
               alert("Onjuist wachtwoord");
               break;
            default:
               alert(errorMessage)

         }
      });
}

export const signUp = (email, password) => {

   createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
         // Signed in 
         const user = userCredential.user;
         // console.log(user.email)
         //  alert("account created")
         // ...
      })
      .catch((error) => {
         const errorCode = error.code;
         const errorMessage = error.message;
         switch (errorCode) {
            case "auth/invalid-email":
               alert("Ongeldige email");
               break;
            case "auth/weak-password":
               alert("Wachtwoord moet minstens 6 tekens hebben");
               break;
            case "auth/email-already-in-use":
               alert("Er bestaat al een account met dit emailadres");
               break;
            default:
               alert(errorMessage)

         }
         // alert(errorMessage)
         // ..
      });

}