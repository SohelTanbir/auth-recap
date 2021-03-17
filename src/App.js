import './App.css';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useState } from 'react';



if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}else {
  firebase.app();
}


function App() {
    const [user, setUser] = useState({})
      var gProvider = new firebase.auth.GoogleAuthProvider();
      var gitProvider = new firebase.auth.GithubAuthProvider();
      var fbProvider = new firebase.auth.FacebookAuthProvider();
      const googleSignIn = ()=>{
        firebase.auth()
      .signInWithPopup(gProvider)
      .then((result) => {
        var credential = result.credential;
        // var token = credential.accessToken;
        var user = result.user;
        setUser(user)
      }).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        console.log(errorMessage)
      });
  }

  const handleGithubSignIn = ()=>{
    firebase
    .auth()
    .signInWithPopup(gitProvider)
    .then((result) => {
      var credential = result.credential;
  
      var token = credential.accessToken;
  
      // The signed-in user info.
      var user = result.user;
      console.log(user)
    }).catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      var credential = error.credential;
      console.log(errorMessage)
    });
  }
// facebook authentication

const handleFacebookSignIn = ()=>{
  firebase
  .auth()
  .signInWithPopup(fbProvider)
  .then((result) => {
    var credential = result.credential;
    var user = result.user;
    console.log('facebook auth ', result )
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    var email = error.email;
    var credential = error.credential;
    console.log(errorMessage)
  });


}



  return (
    <div className="App">
      <h2>Welcome to User Authentication System</h2>
        <button onClick={googleSignIn}>SignIn with google</button> <br/><br/>
        <button onClick={handleGithubSignIn}>SignIn with Github</button> <br/><br/>
        <button onClick={handleFacebookSignIn}>SignIn with Facebook</button>
      <p>Email: {user.email}</p>
      <p>Name: {user.displayName}</p>
    </div>
  );
}

export default App;
