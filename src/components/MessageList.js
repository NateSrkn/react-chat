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
        if (!this.state.newMessageInput || this.props.activeRoom === null) {return};
        this.roomsRef.push({
            content: this.state.newMessageInput,
            roomId: this.props.activeRoom.key,
            username: "Nate",
            sentAt: firebase.database.ServerValue.TIMESTAMP
        });
        this.setState({newMessageInput: ''})
    }



    render() {
        return (
            <div className="message-list">
                <ul id="message-box">
                    {this.props.activeRoom && this.state.messages
                        .filter(message => message.roomId === this.props.activeRoom.key)
                        .map((message, index) => (
                            <li className="message" key={message.key}>
                            {message.username}: {message.content} {message.sentAt}
                            </li>
                        ))}
                </ul>
                <form id="message-form" onSubmit={(e) => this.createMessage(e)}>
                    <input 
                        id="message-input" 
                        type="text" 
                        value={this.state.newMessageInput}
                        onChange={(e) => this.handleChange(e)} />
                    <input id="send-button" type="submit" value="Send" />
                </form>
            </div>
        )
    }
    
}

export default MessageList