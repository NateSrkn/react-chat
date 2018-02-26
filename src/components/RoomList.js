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
    
    handleSubmit(e){
        e.preventDefault();
        if(!this.state.newRoomName) {return}
        this.roomsRef.push({
            name : this.state.newRoomName
        })
        this.setState({
            newRoomName: e.target.value,
            newRoomName: ''
        })
    }

    render () {
        return (
            <section className="room">
              <form onSubmit={e => this.handleSubmit(e)}>
                <input 
                    id="new-room-input" 
                    type="text"
                    value={this.state.newRoomName}
                    onChange={(e) => this.handleChange(e)}
                    ></input>
                <button className="ion-plus-round">New Room</button>
            </form>
            {this.state.rooms.map((room, index) => 
                <li key={index}>{room.name}</li>
            )}
        </section>
        )
    }
}

export default RoomList