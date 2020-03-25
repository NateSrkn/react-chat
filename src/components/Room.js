import React, { useState, useContext, useEffect } from 'react'
import { FirebaseContext } from '../utils/firebase'
import 'firebase/firestore'
import { useParams } from 'react-router-dom'
import MessageList from './MessageList'

const Room = ({ activeUser }) => {
  let { roomId } = useParams()
  const firebase = useContext(FirebaseContext)
  const roomsRef = firebase.firestore().collection('rooms')
  let [room, setRoom] = useState([])

  useEffect(() => {
    roomsRef.doc(roomId).onSnapshot(snapshot => {
      setRoom(snapshot.data())
    })
  })

  return (
    <div className="column is-12">
      {room ? 
      <div className="">
        <p className="subtitle has-text-white is-paddingless is-marginless">
          {room.name}
        </p> 
        <p className="subtitle is-6 has-text-white">Created by: {room.createdBy}</p>
        <MessageList roomId={roomId} activeUser={activeUser} messages={room.messages} />
      </div>
      : ''}
    </div>
  )
}

export default Room