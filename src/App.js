import React, { Component } from 'react';
import './styles/App.css';
import './styles/RoomList.css';
import './styles/UserLogin.css';
import './styles/MessageList.css';
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
      activeRoom: "",
      activeUser: "Guest"
    }
  }

  setActiveRoom(room) {
    let roomToggle = document.getElementById("hidden")
    this.setState({activeRoom: room})
    if(this.state.activeRoom) { return }
    roomToggle.id = "show"
  }

   setUser(user) {
    if(user) {
      this.setState({activeUser: user.displayName})
    } else {
      this.setState({activeUser: "Guest"})
    }
  } 

  render() {
    return (
      <div className="App">
      <h1 id="logo">Bloc Chat</h1>
      <ul id="room-names">
        <RoomList
          activeRoom={this.state.activeRoom}
          setActiveRoom={(room) => this.setActiveRoom(room)}
        />
      </ul>
        <div id="hidden" className="message-box">
        <h2 id="active-room" >{(this.state.activeRoom && this.state.activeRoom.name) || "Welcome"}</h2>
          <MessageList 
            activeRoom={this.state.activeRoom} 
            activeUser={this.state.activeUser} 
          />
        <UserLogin 
          setUser={(user) => this.setUser(user)}  
          activeUser={this.state.activeUser}    
        />
      </div>
      </div>
    );
  }
}

export default App;
