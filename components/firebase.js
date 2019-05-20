import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBuZAGNPq7TLdhsDzenvjVb-OzMqSAZ7VQ',
  authDomain: 'eventcrud.firebaseapp.com',
  databaseURL: 'https://eventcrud.firebaseio.com',
  projectId: 'eventcrud',
  storageBucket: 'eventcrud.appspot.com',
  messagingSenderId: '345997930040',
  appId: '1:345997930040:web:1c92e9f98fa59a1b'
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
