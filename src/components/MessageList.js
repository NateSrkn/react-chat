import React, { useState, useContext} from 'react';
import { FirebaseContext } from '../utils/firebase'
import 'firebase/firestore'

const MessageList = ({ roomId, messages, activeUser }) => {
    const firebase = useContext(FirebaseContext)
    const roomRef = firebase.firestore().collection('rooms').doc(roomId)
    let [newMessage, setNewMessage] = useState('') 
    const handleChange = (event) => {
        setNewMessage(event.target.value)
    }
    const sendMessage = (event) => {
        event.preventDefault()
        roomRef.update({
            messages: firebase.firestore.FieldValue.arrayUnion({
                value: newMessage,
                sentBy: activeUser
            })
        })
        setNewMessage('')
    }

    const List = ({messages}) => {
        return (
            <ul>
                {messages.map(message => (
                    <li style={{paddingTop: '10px'}}>
                        <div className="subtitle is-6 is-marginless has-text-weight-bold has-text-white">{message.sentBy}:</div>
                        <p className="has-text-white" style={{paddingLeft: '10px'}}>{message.value}</p>
                    </li>
                ))}
            </ul>
        )
    }
    return (
        <div>
            {messages ? <List messages={messages} /> : 'Start a conversation'}
            <form onSubmit={sendMessage} style={{paddingTop: '20px'}}>
                <div className="field has-addons">
                    <div className="control">
                        <input 
                        className="input"
                        placeholder="Enter your message"
                        onChange={handleChange}
                        value={newMessage}
                        type="text" />
                    </div>
                    <div className="control">
                        <button className="button is-primary">
                            Send
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}
 
// class MessageList extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             messages: [],
//             newMessageInput: ''
//         };
//         this.roomsRef = firebase.database().ref('messages');
//     }

//     componentDidMount() {
//         this.roomsRef.on('child_added', snapshot => {
//             const message = snapshot.val();
//             message.key = snapshot.key;
//             this.setState({ messages : this.state.messages.concat ( message )})
//         });
//     }

//     handleChange(e) {
//         this.setState({ newMessageInput: e.target.value })
//     }

//     createMessage(e) {
//         e.preventDefault();
//         if (!this.state.newMessageInput || this.props.activeRoom === null) {return alert("Theres no active room!")};
//         this.roomsRef.push({
//             content: this.state.newMessageInput,
//             roomId: this.props.activeRoom.key,
//             username: this.props.activeUser || "Guest",
//             sentAt: firebase.database.ServerValue.TIMESTAMP
//         })
//         this.setState({newMessageInput: ''})
//     }



//     render() {
//         return (
//             <div className="message-list">
//                 <ul id="message-box">
//                     {this.props.activeRoom && this.state.messages
//                         .filter(message => message.roomId === this.props.activeRoom.key)
//                         .map((message, index) => (
//                             <li className="message" key={message.key}>
//                             {message.username}: {message.content} {message.sentAt}
//                             </li>
//                         ))}
//                 </ul>
//                 <form id="message-form" onSubmit={(e) => this.createMessage(e)} autoComplete="off">
//                     <input 
//                         id="message-input" 
//                         type="text" 
//                         value={this.state.newMessageInput}
//                         onChange={(e) => this.handleChange(e)} />
//                     <input id="send-button" type="submit" value="Send" />
//                 </form>
//             </div>
//         )
//     }
    
// }

export default MessageList