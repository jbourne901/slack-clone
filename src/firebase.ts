import firebase from "firebase";


const firebaseConfig = {
    apiKey: "AIzaSyCLaO769IkO1uHHACeQpmYj7yMM216OK_g",
    authDomain: "slack-clone-306609.firebaseapp.com",
    databaseURL: "https://slack-clone-306609-default-rtdb.firebaseio.com",
    projectId: "slack-clone-306609",
    storageBucket: "slack-clone-306609.appspot.com",
    messagingSenderId: "685340026332",
    appId: "1:685340026332:web:6ce3ef268258556ec41b19"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export const db = firebaseApp.firestore();
export const auth = firebaseApp.auth();
export const provider = new firebase.auth.GoogleAuthProvider();
