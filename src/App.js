import React, { useState, useEffect } from 'react';
import Room from './components/Room'
import RoomList from './components/RoomList.js'
import { Switch, Route } from 'react-router-dom';
import { auth } from './utils/firebase'
import './styles/main.scss'

import { db } from './utils/firebase'

const App = () => {
  const [rooms, setRooms] = useState([])
  const [activeRoom, setActiveRoom] = useState('')
  const [activeUser, setActiveUser] = useState('')

  useEffect(() => {
    db.ref('rooms').on('value', snapshot => {
        let rooms = []
        snapshot.forEach((snap) => {
            rooms.push({ key: snap.key, ...snap.val()})
        })
        setRooms(rooms)
    })
    auth.onAuthStateChanged((user => {
      if(user) {
        setActiveUser(user.displayName)
      } else {
        setActiveUser('')
      }
    }))
  }, [])

  return(  
    <div className="App">
      <div className="page-layout">
        <RoomList activeUser={activeUser} setActiveUser={setActiveUser} rooms={rooms} activeRoom={activeRoom} setActiveRoom={setActiveRoom} />
        <main className="main-container">
          <Switch>
            <Route exact path="/">
              <div style={{fontSize: 20, margin: 'auto 0'}}>
                Select a room to get started
              </div>
            </Route>
            <Route path="/room/:roomId">
              <Room rooms={rooms} activeUser={activeUser} />
            </Route>
          </Switch>
        </main>
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
