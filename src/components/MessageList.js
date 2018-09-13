import React, {Component} from 'react';
import * as firebase from 'firebase';

class MessageList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            newMessageInput: ''
        };
        this.roomsRef = firebase.database().ref('messages');
    }

    componentDidMount() {
        this.roomsRef.on('child_added', snapshot => {
            const message = snapshot.val();
            message.key = snapshot.key;
            this.setState({ messages : this.state.messages.concat ( message )})
        });
    }

    handleChange(e) {
        this.setState({ newMessageInput: e.target.value })
    }

    createMessage(e) {
        e.preventDefault();
        if (!this.state.newMessageInput || this.props.activeRoom === null) {return alert("Theres no active room!")};
        this.roomsRef.push({
            content: this.state.newMessageInput,
            roomId: this.props.activeRoom.key,
            username: this.props.activeUser || "Guest",
            sentAt: firebase.database.ServerValue.TIMESTAMP
        })
        this.setState({newMessageInput: ''})
    }



    render() {
        return (
            <div className="active-room">
                <div className="messages">
                    {
                        this.props.activeRoom && this.state.messages
                        .filter(message => message.roomId === this.props.activeRoom.key)
                        .map((message, index) => (
                            <div className="message" key={message.key}>
                                <h5>
                                    {message.username}
                                </h5>
                                <p>
                                    {message.content}
                                </p>
                            </div>
                        ))
                    }
                </div>
                <form className="message-form" onSubmit={(e) => this.createMessage(e)} autoComplete="off">
                    <input 
                        className="message-input round-input"
                        type="text"
                        placeholder="Enter your message..."
                        value={this.state.newMessageInput}
                        onChange={(e) => this.handleChange(e)}
                    />
                    <input className="send-button" type="submit" value="Send" />
                </form>
            </div>
        )
    }
    
}

export default MessageList