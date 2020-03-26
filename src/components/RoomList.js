import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { Button } from './Button'
import { TextInput } from './TextInput';
import { db } from '../utils/firebase'
import Authenticate from './Authenticate.js'
import * as moment from 'moment'

const RoomList = ({ rooms, activeRoom, setActiveRoom, activeUser, setActiveUser }) => {
    const [newRoomName, setNewRoomName] = useState('')

    const addRoom = (event) => {
        event.preventDefault()
        if(!newRoomName || !activeUser) return
        db.ref('rooms').push({
            name: newRoomName,
            createdBy: activeUser,
            createdAt: moment().format()
        })
        setNewRoomName('')
    }

    const removeRoom = (roomId) => {
        const response = window.confirm('Are you sure you want to delete this room?')
        if (response) db.ref(`rooms/${roomId}`).remove()
    }

    const handleChange = (event) => {
        event.preventDefault()
        setNewRoomName(event.target.value)
    }

    const List = () => {
        return(
            rooms.map(room => (
                <li key={room.key} className="list-container">
                    <Link to={`/room/${room.key}`} style={{width: '100%'}}>
                        <div className="room-name" onClick={() => setActiveRoom(room)}>
                            {room.name}
                        </div>
                    </Link>
                    {activeRoom.key === room.key || !activeUser ? null : 
                        <Button className="button" onClick={() => removeRoom(room.key)} style={{flex: 0, fontSize: 14}}>
                            <i className="far fa-trash-alt"></i>
                        </Button>
                    }
                </li>
            ))
        )
    }

    return (
        <div className="sidebar">
            <div className="label">
                Rooms
            </div>
            <ul className="room-list">
                {rooms ? <List /> : 'Loading' }
            </ul>
            <div className="sidebar-actions">
                {activeUser ?        
                <form onSubmit={addRoom}>
                    <TextInput 
                    className="input"
                    placeholder="Enter a room name"
                    maxLength="15"
                    onChange={handleChange}
                    value={newRoomName}
                        />
                    <Button>
                        Add Room
                    </Button>
                </form> 
                : null}
                <Authenticate setActiveUser={setActiveUser} activeUser={activeUser} />
            </div>
        </div>
    )
}

export default RoomList