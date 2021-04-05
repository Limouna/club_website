// Initialize Cloud Firestore through Firebase
const firebaseConfig = {
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
var user = firebase.auth().currentUser;

//OnStateChange listener for the auth
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        var email = user.email;
        alert("Active user email : " + email);
        var user = firebase.auth().currentUser;
        var email = user.email;
        db.collection("users").where("email", "==", email)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.get("voted"));
                var voted = doc.get("voted");
                if (voted == true) {
                    var animeVotesArray = document.getElementsByClassName("vote-anime");
                    for (let index = 0; index < animeVotesArray.length; index++) {
                        animeVotesArray[index].setAttribute("disabled", true);                        
                    }
                }
            });
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
        //document.getElementById("navbar-auth").innerHTML = '<a href="index.html" class="button primary" onclick="signOut()" id="navbar-auth">Sign Out</a>';
    } else {
        //document.getElementById("navbar-auth").innerHTML = '<a href="index.html" class="button primary" id="navbar-auth">Sign In</a>';
        alert("Currently no active users");
    }
    });

function vote(name) {
    db.collection("voting").where("name", "==", name)
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            db.collection("voting").doc(doc.id).update({
                votes : firebase.firestore.FieldValue.increment(1)
            })
            .then(() => {
                var user = firebase.auth().currentUser;
                var email = user.email;
                db.collection("users").where("email", "==", email).get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        db.collection("users").doc(doc.id).update({
                            voted: true
                        })
                        .then(() => {
                            //console.log("Document successfully updated!");
                        })
                        .catch((error) => {
                            console.error("Error updating document: ", error);
                        });
                    });
                })
                .catch((error) => {
                    console.log("Error getting documents: ", error);
                });
            })
            .catch((error) => {
                console.error("Error updating document: ", error);
            });
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
    
}