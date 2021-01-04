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


