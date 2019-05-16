import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as Firebase from 'firebase';
import * as serviceWorker from './serviceWorker';

const firebaseConfig = {
  apiKey: "AIzaSyBQkTGtK8jwAqQfYwPfEZN78X4LEAcvbRk",
  authDomain: "app-eshop-1a657.firebaseapp.com",
  databaseURL: "https://app-eshop-1a657.firebaseio.com",
  projectId: "app-eshop-1a657",
  storageBucket: "app-eshop-1a657.appspot.com",
  messagingSenderId: "899882061307",
  appId: "1:899882061307:web:be612175836e919c"
};
Firebase.initializeApp(firebaseConfig);
const db = Firebase.database();

ReactDOM.render(<App db={db} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
