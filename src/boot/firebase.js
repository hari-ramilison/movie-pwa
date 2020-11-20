import firebase from "firebase/app"

import "firebase/firestore"

// ADD YOUR FIREBASE CONFIG OBJECT HERE:
var firebaseConfig = {
  apiKey: "AIzaSyBXUfNa-HXVUi7BO6qoTfukrKKukiUW-Og",
  authDomain: "movies-pwa-6c86f.firebaseapp.com",
  databaseURL: "https://movies-pwa-6c86f.firebaseio.com",
  projectId: "movies-pwa-6c86f",
  storageBucket: "movies-pwa-6c86f.appspot.com",
  messagingSenderId: "1043122732040",
  appId: "1:1043122732040:web:d8f6ef724a09bc989765bd"
}

let firebaseApp = firebase.initializeApp(firebaseConfig)
let db = firebaseApp.firestore()

db.enablePersistence()
.catch(err => {
  if(err.code == 'failed-precondition'){
    console.log('persistance failed')
  }
  else if(err.code == 'unimplemented'){
    console.log('persistance unvailable')
  }
})
export { db }
