import React, {Component} from 'react';
import * as firebase from 'firebase';

class RoomList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rooms: [],
            newRoomName: ""
        }
        this.roomsRef = firebase.database().ref('rooms');
    }

    componentDidMount() {
        this.roomsRef.on('child_added', snapshot => {
            const room = snapshot.val();
            room.key = snapshot.key;
            this.setState({ rooms: this.state.rooms.concat( room )})
         });
    }

    handleChange(e) {
        this.setState({ newRoomName: e.target.value });
      }
    
    addRoom(e){
        e.preventDefault();
        if(!this.state.newRoomName) {return alert("Please enter a room name!")}
        this.roomsRef.push({
            name : this.state.newRoomName
        })
        this.setState({
            newRoomName: ''
        })
    }

    selectRoom(room) {
        this.props.setActiveRoom(room)
    }

    render () {
        return (
            <section className="room">
              <form onSubmit={e => this.addRoom(e)}>
                <input 
                    id="new-room-input" 
                    type="text"
                    value={this.state.newRoomName}
                    onChange={(e) => this.handleChange(e)}
                    placeholder="Create a room"
                    ></input>
                <button className="ion-plus-round"></button>
            </form>
            {this.state.rooms.map((room, index) => 
                <li key={index} className="room-choice">
                    <button value={room.name} onClick={(e) => this.selectRoom(room)}>{room.name}</button>
                </li>
            )}
        </section>
        )
    }
}

export default RoomList