const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
import {
    isToday,
    toDate,
    isThisWeek,
    isBefore,
    endOfToday
    add,
    format,
} from "date-fns";
import {signup} from "../dist/signin"

let body = document.querySelector('body')

const auth = firestore.auth();

const whenSignedIn = document.querySelector('#whenSignedIn')

const signOutButton = document.querySelector('#signOutButton')

const userDetails = document.querySelector('#userDetails')

const hiddenContainer = document.querySelector('#hiddenContainer')
hiddenContainer.style.display = "none"

const loginBackground = document.createElement('img')
loginBackground.src = "images/background2.jpg"
loginBackground.setAttribute('id', 'loginBackground')
body.appendChild(loginBackground)

auth.onAuthStateChanged( (user) => {
    if (user) {
      if (user.displayName) userDetails.innerHTML = `Hello, ${user.displayName}`
      else userDetails.innerHTML = `Hello, ${user.email}`
      if (body.querySelector('#signInContainer')) {
        let remove = body.querySelector('#signInContainer')
        body.removeChild(remove)
      }
      toDoList();
      whenSignedIn.hidden = false;
      hiddenContainer.style.display = ""
      hiddenContainer.style.display = "auto"
      hiddenContainer.hidden = false;
      signOutButton.onclick = () => {
        auth.signOut();
        location.reload();
      }
    }
    else {
        whenSignedIn.hidden = true;
        userDetails.innerHTML = `Hello`;
        signInProcess();
      }
})

const database = firebase.firestore();


let signInProcess = () => {
  signup.createSignInContainer();

  let demoButton = signup.signInWithDemoButton;
  demoButton.onclick = () => {
    let email = "demo@gmail.com"
    let password = "demodemo123"
    firebase.auth().signInWithEmailAndPassword(email, password)
  }
    