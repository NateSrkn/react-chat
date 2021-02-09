import React from "react";
import { useActiveRoomContext } from "../../hooks/useActiveRoom";
import { Input } from "../../components/common/Input";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { db } from "../../services/firebase";
import { useCurrentUser } from "../../hooks/useAuth";
import moment from "moment";
import { MessageList } from "../../components/messages/MessageList";
import Head from "next/head";
import { FiSend } from "react-icons/fi";
const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 100%;
`;

const RoomView = () => {
  const activeRoom = useActiveRoomContext();
  const { currentUser } = useCurrentUser();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    getMessages();

    return () => {
      if (activeRoom) {
        db.ref(`messages/${activeRoom.key}`).off();
      }
    };
  }, [activeRoom]);

  const [inputList, setInputList] = useState({ newMessage: "" });

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setInputList({ [name]: value });
  };

  const getMessages = () => {
    if (activeRoom) {
      db.ref(`messages/${activeRoom.key}`).on("value", (snapshot) => {
        const tempMessages = [];
        snapshot.forEach((snap) => {
          tempMessages.push({ key: snap.key, ...snap.val() });
        });
        setMessages(tempMessages);
      });
    }
  };

  const handleSendMessage = (event) => {
    event.preventDefault();
    if (inputList.newMessage !== "") {
      db.ref(`messages/${activeRoom.key}`).push({
        value: inputList.newMessage,
        sentBy: {
          name: currentUser.displayName,
          avatar: currentUser.photoURL,
          uid: currentUser.uid,
        },
        sentAt: moment().format(),
      });
      setInputList({ newMessage: "" });
    }
  };

  return (
    <Container>
      <Head>
        <title>{activeRoom?.name}</title>
      </Head>
      <MessageList
        messages={messages}
        activeRoom={activeRoom}
        currentUser={currentUser}
      />
      {activeRoom && (
        <form onSubmit={handleSendMessage} style={{ margin: "0 1rem" }}>
          <Input
            name="newMessage"
            placeholder={
              !currentUser
                ? `Please sign in to send a message`
                : `Message ${activeRoom?.name}`
            }
            value={inputList.newMessage}
            withButton={true}
            buttonText={<FiSend style={{ fontSize: 18 }} />}
            required
            disabled={!currentUser}
            onChange={handleChange}
          />
        </form>
      )}
    </Container>
  );
};

export default RoomView;
