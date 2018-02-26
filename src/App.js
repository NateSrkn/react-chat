import React, { Component } from 'react';
import './App.css';
import RoomList from './components/RoomList.js'
import * as firebase from 'firebase';

 // Initialize Firebase
 var config = {
  apiKey: "AIzaSyAoXoqV7DhPcNHmx9BsgHxVzcTJIm3hJ7s",
  authDomain: "bloc-chat-react-d2c32.firebaseapp.com",
  databaseURL: "https://bloc-chat-react-d2c32.firebaseio.com",
  projectId: "bloc-chat-react-d2c32",
  storageBucket: "bloc-chat-react-d2c32.appspot.com",
  messagingSenderId: "892269329611"
};
firebase.initializeApp(config);

class App extends Component {

  render() {
    return (
      <div className="App">
      <ul id="room-names">
        <RoomList />
      </ul>
      </div>
    );
  }
}

export default App;
