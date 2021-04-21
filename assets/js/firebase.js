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

function signOut() {
    auth.signOut();
    alert("Signed out");
  }
//firebase auth changer listener
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        var email = user.email;
        alert("Active user email : " + email);
        document.getElementById("navbar-auth").innerText = "Déconnexion";
        document.getElementById("navbar-auth").href = "index.html";
        document.getElementById("navbar-auth").setAttribute('onclick','signOut()')
    } else {
        document.getElementById("navbar-auth").innerText = "Connexion";
        document.getElementById("navbar-auth").href = "login_v2/index.html";
        alert("Currently no active users");
    }
    });