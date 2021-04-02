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

function logIn() {
    var email = document.getElementById("email");
    var password = document.getElementById("password");
    const promise = auth.signInWithEmailAndPassword(email.value, password.value);
    promise.catch(e => alert(e.message));
    alert("Signed in " + email.value);
}

firebase.auth().onAuthStateChanged(function(user) {
if (user) {
    var email = user.email;
    alert("Active user email : " + email);
    document.getElementById("navbar-auth").innerHTML = '<a href="index.html" class="button primary" onclick="signOut()" id="navbar-auth">Sign Out</a>';
} else {
    document.getElementById("navbar-auth").innerHTML = '<a href="index.html" class="button primary" id="navbar-auth">Sign In</a>';
    alert("Currently no active users");
}
});

function signOut() {
    auth.signOut();
    alert("Signed out");
}

const googleSignIn = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
  
    auth.signInWithPopup(googleProvider)
    .then(() => {
      console.log("bruh");
    })
    .catch(error => {
      console.error(error);
    })
  }