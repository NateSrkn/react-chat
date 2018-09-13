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
         this.roomsRef.on('child_removed', snapshot => {
            const room = snapshot.val();
            room.key = snapshot.key;
            this.setState({ rooms: this.state.rooms.filter( function(value) {
              return value.key !== room.key;
            }) })
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

    deleteRoom(e) {
        e.preventDefault();
        this.roomsRef.child(e.target.value).remove();
      }
      
    selectRoom(room) {
        this.props.setActiveRoom(room)
    }

    render () {
        return (
            <div className="list-contain">
                {
                    this.state.rooms.map((room, index) => 
                        <div key={index} className="room-choice">
                            <p className="room" value={room.name} onClick={(e) => this.selectRoom(room)}>{room.name}</p>
                            <button className="ion-android-close icon" value={room.key} onClick={(e) => this.deleteRoom(e)}></button>
                        </div>
                    )
                }
                <form className="create-room" onSubmit={(e) => this.addRoom(e)} autoComplete="off">
                    <input 
                        className="new-room-input round-input"
                        type="text"
                        maxLength="25"
                        value={this.state.newRoomName}
                        onChange={(e) => this.handleChange(e)}
                        placeholder="Create a room..."
                    />
                </form>
            </div>
   
        )
    }
}

export default RoomList