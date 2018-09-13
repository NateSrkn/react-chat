import React, { Component } from 'react';
import './App2.css';
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
      activeUser: "Guest",
      width: 0,
      height: 0
    }
  }

  componentDidMount() {
    this.toggleNav();
  }

  setActiveRoom(room) {
    this.setState({activeRoom: room})
  }

   setUser(user) {
    if(user) {
      this.setState({activeUser: user.displayName})
    } else {
      this.setState({activeUser: "Guest"})
    }
  }

  toggleNav() {
    var toggle = document.getElementById('toggle-nav')
    var sidenav = document.getElementById('sidenav')
    

    toggle.onclick = function() {
      sidenav.classList.toggle('show-nav')
      toggle.classList.toggle('active')
  
    }
  }

  render() {
    return (
      <div id="app">
        <div className="content-container">
          <UserLogin setUser={(user) => this.setUser(user)} activeUser={this.state.activeUser} />
          <div id="sidenav" className="room-list">
            <div id="toggle-nav">
              <span></span>
            </div>
            <RoomList activeRoom={this.state.activeUser} setActiveRoom={(room) => this.setActiveRoom(room)} />
          </div>
          <div className="message-contain">
            <h2 className="room-header">{(this.state.activeRoom && this.state.activeRoom.name) || "Welcome"}</h2>
            <MessageList activeRoom={this.state.activeRoom} activeUser={this.state.activeUser} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
