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
                {activeUser ? 'Select a room to chat' : 'Sign in to get started'}
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
