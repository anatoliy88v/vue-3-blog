import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyC9yThG9GMgHqMvRVMaieFk1U7DFBAmNw8",
  authDomain: "vue-app-54d0b.firebaseapp.com",
  projectId: "vue-app-54d0b",
  storageBucket: "vue-app-54d0b.appspot.com",
  messagingSenderId: "676181413414",
  appId: "1:676181413414:web:2e2f41ded03149087420e7"
};

firebase.initializeApp(firebaseConfig)

const projectFirestore = firebase.firestore()
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectFirestore, timestamp }