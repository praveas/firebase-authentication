import React, { Component } from "react";
import "./App.css";
import firebase from "firebase";
import StyledFirebaseAUth from "react-firebaseui/StyledFirebaseAuth";
const config = require("./util/config");

firebase.initializeApp(config);

class App extends Component {
  state = { isSignedIn: false };
  uiConfig = {
    signInflow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccess: () => false
    }
  };

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ isSignedIn: !!user });
      console.log("user", user);
    });
  };

  render() {
    return (
      <div className="App">
        {this.state.isSignedIn ? (
          <span>
            <div>Signed In!</div>
            <button onClick={() => firebase.auth().signOut()}>Sign out</button>
            <h1>Welcome {firebase.auth().currentUser.displayName}</h1>
            <img src={firebase.auth().currentUser.photoURL} alt="profile" />
            <br />
            <h1>Your details are: {firebase.auth().currentUser.email}</h1>
            <br />
            <h1>
              Your Creation Time is:{" "}
              {firebase.auth().currentUser.metadata.creationTime}
            </h1>
          </span>
        ) : (
          <StyledFirebaseAUth
            uiConfig={this.uiConfig}
            firebaseAuth={firebase.auth()}
          />
        )}
      </div>
    );
  }
}

export default App;
