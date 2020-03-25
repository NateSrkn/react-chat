import React, { useState, useContext, useEffect } from 'react';
import { FirebaseContext } from '../utils/firebase'
import { Link } from 'react-router-dom'
import 'firebase/firestore'

const RoomList = ({ activeRoom, activeUser, setActiveRoom }) => {
    const firebase = useContext(FirebaseContext)
    const roomsRef = firebase.firestore().collection('rooms')
    const [rooms, setRooms] = useState(null)
    const [newRoomName, setNewRoomName] = useState('')

    useEffect(() => {
        roomsRef.onSnapshot(snapshot => {
            let data = []
            snapshot.forEach(doc => {
                data.push({ id: doc.id, ...doc.data()})
            })
            setRooms(data)
        })
    }, [])

    const addRoom = (event) => {
        event.preventDefault()
        if(!newRoomName || !activeUser) return
        roomsRef.add({
            name: newRoomName,
            createdBy: activeUser
        })
        setNewRoomName('')
    }

    const removeRoom = (roomId) => {
        const response = window.confirm('Are you sure you want to delete this room?')
        if(response) roomsRef.doc(roomId).delete()
    }

    const handleChange = (event) => {
        event.preventDefault()
        setNewRoomName(event.target.value)
    }

    const List = () => {
        return(
            rooms.map(room => (
                <li onClick={() => setActiveRoom(room)} key={room.id}>
                    <Link to={`/room/${room.id}`}>
                        {room.name}
                    </Link>
                    <button disabled={activeRoom.id == room.id ? true : false} className="button" onClick={() => removeRoom(room.id)}>
                        Delete
                    </button>
                </li>
            ))
        )
    }

    return (
        <section className="section">
            <aside className="menu">
                <p className="menu-label is-pulled-left">
                    Rooms
                    <i class="fas fa-plus is-pulled-right"></i>
                </p>
                <ul className="menu-list">
                    {rooms ? <List /> : 'Loading' }
                </ul>
                <form onSubmit={addRoom} style={{paddingTop: '20px'}}>
                    <div className="field has-addons">
                        <div className="control">
                            <input 
                            className="input"
                            placeholder="Enter a room name"
                            onChange={handleChange}
                            value={newRoomName}
                            type="text" />
                        </div>
                        <div className="control">
                            <button className="button is-primary">
                                Add Room
                            </button>
                        </div>
                    </div>
                </form>
            </aside>
        </section>
    )
}

export default RoomList