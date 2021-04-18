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

var db = firebase.firestore();
const auth = firebase.auth();

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

function signOut() {
  auth.signOut();
}

function signUp() {
  var email = document.getElementById("email");
  var password = document.getElementById("password");
  var username = document.getElementById("username");
  firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
  .then((userCredential) => {
    db.collection("users").add({
      email: email.value,
      password: password.value,
      username: username.value,
      voted : false
    })
    .then((docRef) => {
      //console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  })
  .catch((error) => {
    console.log("sign up error " + error.message);
  });
}
