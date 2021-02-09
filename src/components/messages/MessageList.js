import { createRef, useEffect } from "react";
import styled from "styled-components";
import { Message } from "./Message";

const MessageContainer = styled.div`
  overflow-y: scroll;
`;

const List = styled.ul``;
export const MessageList = ({ messages, activeRoom, currentUser }) => {
  const messageEndRef = createRef();
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messageEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <MessageContainer>
      <List>
        {messages &&
          messages.map((message, index) => (
            <li key={index}>
              <Message
                message={message}
                userId={currentUser?.uid}
                roomKey={activeRoom?.key}
              />
            </li>
          ))}
        <span
          style={{ float: "left", clear: "both", visibility: "hidden" }}
          ref={messageEndRef}
        >
          Message End
        </span>
      </List>
    </MessageContainer>
  );
};
