import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App'
import firebase from 'firebase';
const config = {
    apiKey: "AIzaSyBZam93AT_8zj8yCrTlGFAZm4ORD0PIVYU",
    authDomain: "clobin-91825.firebaseapp.com",
    databaseURL: "https://clobin-91825.firebaseio.com",
    storageBucket: "clobin-91825.appspot.com",
    messagingSenderId: "288918706586"
};
firebase.initializeApp(config);
ReactDOM.render(<App/>, document.getElementById("placeholder"));
