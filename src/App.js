import React, { useState, useEffect } from 'react';
import Room from './components/Room'
import RoomList from './components/RoomList.js'
import { Switch, Route } from 'react-router-dom';
import { auth } from './utils/firebase'
import './styles/main.scss'

import { db } from './utils/firebase'
import Authenticate from './components/Authenticate';
import NavToggle from './components/NavToggle';

const App = () => {
  const [rooms, setRooms] = useState([])
  const [activeRoom, setActiveRoom] = useState('')
  const [activeUser, setActiveUser] = useState('')
  const [isOpen, setIsOpen] = useState(false)

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
        <RoomList 
          rooms={rooms} 
          activeUser={activeUser} 
          setActiveUser={setActiveUser} 
          activeRoom={activeRoom} 
          setActiveRoom={setActiveRoom} 
          isOpen={isOpen}
          setIsOpen={setIsOpen} 
          />
        <main className="main-container">
          <NavToggle isOpen={isOpen} setIsOpen={setIsOpen} />
          <Switch>
            <Route exact path="/">
              <div className="welcome-message">
                {activeUser ? `Hello ${activeUser}, select a room to chat` : <React.Fragment>Sign in to get started<Authenticate /></React.Fragment>}
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

export default App;
