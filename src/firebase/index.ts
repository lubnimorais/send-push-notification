import firebase from 'firebase-admin';
import path from 'path';
import fs from 'fs';

interface ICredentials {
  client_email: string;
  private_key: string;
  project_id: string;

}

const credentials = path.resolve(__dirname, 'firebase.json');
const readContent = fs.readFileSync(credentials)
const credentialJSON = JSON.parse(readContent.toString().replace(/(<([^>]+)>)/gi, '').replace(/\r?\n|\r/g, '')) as ICredentials;
// console.log("🚀 ~ file: index.ts ~ line 8 ~ credentialJSON", credentialJSON.private_key)

const apiFirebase = firebase.initializeApp({
  credential: firebase.credential.cert({
    clientEmail: credentialJSON.client_email,
    privateKey: credentialJSON.private_key,
    projectId: credentialJSON.project_id
  }),
})

export { apiFirebase };