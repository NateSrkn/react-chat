import React from 'react';
import * as moment from 'moment'

const MessageList = ({ messagesObj }) => {
    const messages = messagesObj ? Object.values(messagesObj) : null
    
    const List = () => {
        return (
            <React.Fragment>
                {messages.map((message, index) => (
                    <div className="message" key={index}>
                        <div className="message-sender">
                            {message.sentBy}:
                        </div>
                        <div className="message-body">
                            {message.value}
                        </div>
                        <div className="message-sent-at">
                            {moment(message.sentAt).fromNow()}
                        </div>
                    </div>
                ))}
            </React.Fragment>
        )
    }
    return (
        <React.Fragment>
            {messages ? <List /> : 'Start a conversation'}
        </React.Fragment>
    )
}

export default MessageList