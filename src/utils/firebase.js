import * as firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyD39XBeRAzGF9XBLEcSIHNBGUrLoumVPDM",
    authDomain: "brunchsters-9ee70.firebaseapp.com",
    databaseURL: "https://brunchsters-9ee70.firebaseio.com",
    storageBucket: "",
    messagingSenderId: "125034704902"
  });

module.exports = firebaseApp

// And then elsewhere in your application you simply:
// import Firebase from '/your/module/location'
// var brunches = Firebase.database().ref("brunches/");
