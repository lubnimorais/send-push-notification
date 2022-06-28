import firebase from 'firebase-admin';
import path from 'path';

const credentials = path.resolve(__dirname, 'firebase.json');

const apiFirebase = firebase.initializeApp({
  credential: firebase.credential.cert(credentials),
})

// OTHER WAY
// import credentials from './macom-news-firebase.json';

// resolveJsonModule in tsconfig.json have be enabled
// import credendials from './macom-news-firebase.json';

// const apiFirebase = firebase.initializeApp({
//   credential: firebase.credential.cert({
//     projectId: credentials.project_id,
//     clientEmail: credentials.client_email,
//     privateKey: credentials.private_key,
//   }),
// })

export { apiFirebase };