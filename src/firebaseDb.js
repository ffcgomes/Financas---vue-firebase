import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAQB6YnDQzzLirGjeRi0CLfT9vQT1LspWo",
    authDomain: "vuejs-firestore-djam-crud.firebaseapp.com",
    databaseURL: "https://vuejs-firestore-djam-crud.firebaseio.com",
    projectId: "vuejs-firestore-djam-crud",
    storageBucket: "vuejs-firestore-djam-crud.appspot.com",
    messagingSenderId: "916768963356",
    appId: "1:916768963356:web:20b155391ebc3f2a58d8d9"
}

const firebaseApp = firebase.initializeApp(firebaseConfig);

export const db = firebaseApp.firestore();