import firebase from 'firebase-admin';
import path from 'path';

const credentials = path.resolve(__dirname, 'firebase.json');

const apiFirebase = firebase.initializeApp({
  credential: firebase.credential.cert(credentials),
})

export { apiFirebase };