import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import MessageList from './MessageList'
import { TextInput } from './TextInput';
import { Button } from './Button'
import { db } from '../utils/firebase'
import * as moment from 'moment'

const Room = ({ rooms, activeUser }) => {
  let { roomId } = useParams()
  const room = rooms.find(item => item.key === roomId)
  let [newMessage, setNewMessage] = useState('') 

  const handleChange = (event) => {
    setNewMessage(event.target.value)
  }

const sendMessage = (event) => {
    event.preventDefault()
    if(!activeUser) return alert('Please sign in to send a message')
    db.ref(`rooms/${roomId}/messages/`).push({
            value: newMessage,
            sentBy: activeUser,
            sentAt: moment().format()
    })
    setNewMessage('')
  }

  return (
    
      <div className="chat-container">
        {room ? 
          <React.Fragment>
            <div className="chat-header">
              <span>{room.name}</span> 
              <div>Created by: {room.createdBy}</div>
            </div>
            <div className="chat-body">
              <div className="messages">
                <MessageList messagesObj={room.messages} />
              </div>
            </div>
            <div className="chat-footer">
              <form onSubmit={sendMessage}>
                  <TextInput 
                  className="input"
                  placeholder="Enter your message"
                  onChange={handleChange}
                  value={newMessage}
                  />
                  <Button>
                      Send
                  </Button>
              </form>
            </div>
          </React.Fragment>
        : ''}
      </div>
  )
}

export default Room