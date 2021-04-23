// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyAMpBcRzjTQqopg_O0KOC6jQJgqGVAMCoI",
    authDomain: "club-website-d0ff7.firebaseapp.com",
    projectId: "club-website-d0ff7",
    storageBucket: "club-website-d0ff7.appspot.com",
    messagingSenderId: "884971407460",
    appId: "1:884971407460:web:e99883a8f60868de057771",
    measurementId: "G-CCF6566J4N"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
var provider = new firebase.auth.GoogleAuthProvider();

function logIn() {
    var email = document.getElementById("email");
    var password = document.getElementById("password");
    const promise = auth.signInWithEmailAndPassword(email.value, password.value);
    promise.catch(e => alert(e.message));
    alert("Signed in " + email.value);
}

function signOut() {
  auth.signOut();
  alert("Signed out");
}

//OnStateChange listener for the auth
firebase.auth().onAuthStateChanged(function(user) {
if (user) {
    var email = user.email;
    alert("Active user email : " + email);
    document.getElementById("navbar-auth").innerText = "Déconnexion";
    document.getElementById("navbar-auth").href = "index.html";
    document.getElementById("navbar-auth").setAttribute('onclick','signOut()')
} else {
    document.getElementById("navbar-auth").innerText = "Connexion";
    document.getElementById("navbar-auth").href = "login/index.html";
    alert("Currently no active users");
  }
});

function logInWithGmail() {
  firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;

    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
  }).catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
  // Apparently login with redirection is better for mobile devices, this is the code for it : firebase.auth().signInWithRedirect(provider);
}   