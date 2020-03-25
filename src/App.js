import React, { useEffect, useState } from 'react';
import './styles/App.css';
import './styles/RoomList.css';
import './styles/UserLogin.css';
import './styles/MessageList.css';
import Room from './components/Room'
import RoomList from './components/RoomList.js'
import MessageList from './components/MessageList.js'
import UserLogin from './components/UserLogin.js'
import { Switch, Route } from 'react-router-dom';
import './styles/main.scss'

const App = () => {
  const [activeRoom, setActiveRoom] = useState('')
  const [activeUser, setActiveUser] = useState('Nathan Sorkin')

  return(
    <div className="App">
      <div className="columns">
        <div className="column is-2 has-background-light">
            <RoomList activeUser={activeUser} activeRoom={activeRoom} setActiveRoom={setActiveRoom} />
        </div>
        <div className="column is-10 has-background-dark hero is-fullheight">
          <section className="section">
          <div className="columns">
            <Switch>
              <Route exact path="/">
                <h3 className="subtitle has-text-white">
                  {/* {activeRoom ? <Room activeRoom={activeRoom} /> : 'Select a room to get started'} */}
                </h3>
              </Route>
              <Route path="/room/:roomId">
                <Room activeUser={activeUser} />
              </Route>
            </Switch>           
          </div>
          </section>
        </div>
      </div>
    </div>
  )
}

// class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       activeRoom: "",
//       activeUser: "Guest"
//     }
//   }

//   setActiveRoom(room) {
//     let roomToggle = document.getElementById("hidden")
//     this.setState({activeRoom: room})
//     if(this.state.activeRoom) { return }
//     roomToggle.id = "show"
//   }

//    setUser(user) {
//     if(user) {
//       this.setState({activeUser: user.displayName})
//     } else {
//       this.setState({activeUser: "Guest"})
//     }
//   } 

//   render() {
//     return (
//       <div className="App">
//       <h1 id="logo">Bloc Chat</h1>
//       <ul id="room-names">
//         <RoomList
//           activeRoom={this.state.activeRoom}
//           setActiveRoom={(room) => this.setActiveRoom(room)}
//         />
//       </ul>
//         <div id="hidden" className="message-box">
//         <h2 id="active-room" >{(this.state.activeRoom && this.state.activeRoom.name) || "Welcome"}</h2>
//           <MessageList 
//             activeRoom={this.state.activeRoom} 
//             activeUser={this.state.activeUser} 
//           />
//         <UserLogin 
//           setUser={(user) => this.setUser(user)}  
//           activeUser={this.state.activeUser}    
//         />
//       </div>
//       </div>
//     );
//   }
// }

export default App;
