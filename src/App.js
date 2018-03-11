import React, { Component } from 'react';
import './App.css';
import RoomList from './components/RoomList.js'
import MessageList from './components/MessageList.js'
import UserLogin from './components/UserLogin.js'
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
  constructor(props) {
    super(props);
    this.state = {
      activeRoom: null,
      activeUser: "Guest"
    }
  }

  setActiveRoom(room) {
      this.setState({activeRoom: room})
  }

   setUser(user) {
      if(!user) {this.setState({activeUser: "Guest"})} 
      else {
        this.setState({activeUser: user.displayName})
      }
  } 

  render() {
    return (
      <div className="App">
  
      <ul id="room-names">
        <RoomList
          activeRoom={this.state.activeRoom}
          setActiveRoom={(room) => this.setActiveRoom(room)}
        />
        <h2 id="active-room">{ this.state.activeRoom && this.state.activeRoom.name}</h2>
        <MessageList 
          activeRoom={this.state.activeRoom} 
          activeUser={this.state.activeUser} 
        />
      </ul>
      <UserLogin 
        setUser={(user) => this.setUser(user)}  
        activeUser={this.state.activeUser}    
      />
      </div>
    );
  }
}

export default App;
