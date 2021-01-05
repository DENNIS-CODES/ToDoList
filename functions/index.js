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
  endOfToday,
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

//signin with email+ password
let signInButton = signup.signInButton
signInButton.onclick = () => {
  let emailInput = signup.emailInputArea
  let email = emailInput.value
  let passInput = signup.passwordInputArea
  let password = passInput.value
  firebase.auth().signInWithEmailAndPassword(email, password)
  .catch(function(error) {
    var errorCode = error.code;
    emailInput.value = ""
    passInput.value = ""
    if (errorCode == 'auth/user-not-found') {
      emailInput.setAttribute('placeholder', "email not registered")
    }
    else if (errorCode == 'auth/invalid-email') {
      emailInput.setAttribute('placeholder', "Invalid email/password")
    }
    else if (errorCode == 'auth/wrong-password') {
      passInput.setAttribute('placeholder', 'Invalid email/password')
    }
  });
}

const provider =  new firebase.auth.GoogleAuthProvider();
  let signInWithGoogleButton = signup.signInWithGoogleButton
  signInWithGoogleButton.onclick = () => {
    auth.signInWithPopup(provider);
    }
     var actionCodeSettings = {
    url: 'https://github.com/DENNIS-CODES/ToDoList',
    handleCodeInApp: true
  };

  let signUpButton = signup.signUpButton
  signUpButton.onclick = () => {
      let signUpEmailOnly = signup.signUpEmailOnly
      signUpEmailOnly.onclick = () => {
        let submit = signup.submit
        submit.onclick = () => {
          let email = signup.emailInputArea
          let inputEmail = email.value
          firebase.auth().sendSignInLinkToEmail(inputEmail, actionCodeSettings)
          .then(function() {
            signup.emailSent();
            window.localStorage.setItem('emailForSignIn', inputEmail);
            })
            .catch(function(error) {
              email.value = ""
              email.setAttribute('placeholder', error.message)
            });
        }
      }
    
      let emailPass = signup.signUpEmailPass
      emailPass.onclick = () => {
        let submit = signup.submit
        submit.onclick = () => {
          let emailInput = signup.emailInputArea
          let email = emailInput.value
          
          let passwordInputArea = signup.passwordInputArea
          let password = passwordInputArea.value
          firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(function() {
          })
          .catch(function(error) {
            emailInput.value = ""
            passwordInputArea.value = ""
            emailInput.setAttribute('placeholder', "Invalid email")
            var errorCode = error.code;
            var errorMessage = error.message;
          });
        }
      }
    
    }

    if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
      var email = window.localStorage.getItem('emailForSignIn');
      if (!email) {
        signup.createSignInContainer();
        signup.reconfirmEmail();
        let emailArea = signup.emailInputArea
        let submit = signup.submit
        submit.onclick = () => {
          email = emailArea.value
            firebase.auth().signInWithEmailLink(email, window.location.href)
          .then(function(result) {
            window.localStorage.removeItem('emailForSignIn');
            let body = document.querySelector('body')
            let signInContainer = signup.signInContainer
            body.removeChild(signInContainer)
          })
          .catch(function(error) {
            emailArea.value = ""
            emailArea.setAttribute('placeholder', "Invalid Email")
          });
        }
        
      }
      if (email) {
        firebase.auth().signInWithEmailLink(email, window.location.href)
        .then(function(result) {
          window.localStorage.removeItem('emailForSignIn');
          let body = document.querySelector('body')
          let signInContainer = signup.signInContainer
          body.removeChild(signInContainer)
        })
        .catch(function(error) {
          let emailArea = signup.emailInputArea
          emailArea.value = ""
          emailArea.setAttribute('placeholder', "Invalid Email")
        });
      }  
    }
  }

  let toDoList =() => {
    let toggleMenu = document.querySelector("#sidebarToggleMenu");
    toggleMenu.addEventListener("click", toggleSideBar);
    function toggleSideBar() {
      let sidebar = document.querySelector("#sidebar");
      if (toggleMenu.classList.contains("unclicked")) {
        toggleMenu.classList.remove("unclicked");
        toggleMenu.classList.add("clicked");
        sidebar.style.left = "0";
  
        window.addEventListener("click", closeMenu);
        function closeMenu(e) {
          if (!e.target.id.includes("sidebar")) {
            toggleMenu.classList.add("unclicked");
            toggleMenu.classList.remove("clicked");
            sidebar.style.left = "-300px";
          }
        }
      } else {
        toggleMenu.classList.add("unclicked");
        toggleMenu.classList.remove("clicked");
        sidebar.style.left = "-300px";
      }
    }
    const taskFactoryFunc = (
      description,
      dueDate,
      project,
      completion,
      filter,
      details
    ) => {
      return { description, dueDate, project, completion, filter, details};
    };
  
    let taskArray = [];
  
    const projectHashMap = new Map();
  
    let onStartDemoCondition = (() => {
      auth.onAuthStateChanged( user => {      
        if (user) {
          if (user.uid == "SDzLU3EAgWOXI25mAkPNM4KslHj2"){
            let thingsRef = database.collection('users').doc('whfH5WOfbwe6ZQfXmEGWgYc2WRj2')
            thingsRef.get().then(function(doc) {
              taskArray = [...doc.data().userTaskArray]
              refreshTaskContainer(taskArray)
              initialHashMapSync ();
              refreshProjectsPanel();
            })
          }
          else {
            let thingsRef = database.collection('users').doc(user.uid)
            thingsRef.get().then(function(doc) {
              if(doc.data()) taskArray = [...doc.data().userTaskArray]
              else syncWithFirebase ();
              refreshTaskContainer(taskArray)
              initialHashMapSync ();
              refreshProjectsPanel();
            })
          }
        }
      })
    })();

    function syncWithFirebase () {
      auth.onAuthStateChanged( user => {      
        if (user) {
          let thingsRef = database.collection('users').doc(user.uid)
          thingsRef.get().then(function(doc) {
            if (doc.exists) {
  
              thingsRef.set({
                userTaskArray: taskArray
              })
            } 
            else {
              thingsRef.set({
                userTaskArray: taskArray
            })
          }
        }).catch(function(error) {
        });
      }})
    }
  
    function initialHashMapSync () {
      for (let i = 0; i < taskArray.length; i++) {
        if (taskArray[i].project != "") {
          if (!projectHashMap.has(taskArray[i].project)){
            projectHashMap.set(taskArray[i].project, 1)
          }
          else {
            let value = projectHashMap.get(taskArray[i].project);
            value += 1;
            projectHashMap.set(taskArray[i].project, value);
          }
        }
      }
    }
   
    const addItemsToHashMap = (projectName) => {
      if (projectName == "") return;
      else if (projectHashMap.has(projectName)) {
        let value = projectHashMap.get(projectName);
        value += 1;
        projectHashMap.set(projectName, value);
      } else {
        projectHashMap.set(projectName, 1);
      }
    };
  
    const removeItemsToHashMap = (projectName) => {
      if (projectHashMap.has(projectName)) {
        let value = projectHashMap.get(projectName);
        value -= 1;
        projectHashMap.set(projectName, value);
      }
      if (projectHashMap.get(projectName) == 0) {
        projectHashMap.delete(projectName);
      }
    };