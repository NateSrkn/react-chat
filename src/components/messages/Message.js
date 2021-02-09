import React, { createRef, useState } from "react";
import moment from "moment";
import { Avatar } from "../common/Avatar";
import styled, { css } from "styled-components";
import { FiEdit } from "react-icons/fi";
import { Input } from "../common/Input";
import { db } from "../../services/firebase";
const Container = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: flex-start;
    padding: 0.75em 1rem;
    gap: 0.5em;
    transition: ${theme.bgTransition}, height 0.2s ease;
    ${MessageDetails} {
      > * {
        transition: ${theme.transition("opacity", ".2s")};
        opacity: 0;
      }
    }

    &:hover,
    &:focus {
      transition: ${theme.bgTransition};
      background: ${theme.bg.secondary};

      ${MessageDetails} {
        z-index: 1;
        > * {
          visibility: visible;
          transition: ${theme.transition("opacity", ".2s")};
          opacity: 1;
        }
      }
    }
  `}
`;

const Group = styled.div`
  margin-left: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Username = styled.span`
  font-family: ${(props) => props.theme.fontFamily.mono};
  font-size: 10.75px;
  margin: 0 0 0.25em 0;
  display: flex;
`;

const Value = styled.p`
  font-size: 14px;
  word-break: break-word;
`;

const EditButton = styled.button`
  ${({ theme }) => css`
    visibility: hidden;
    opacity: 0;
    transition: ${theme.transition("opacity", ".2s")},
      ${theme.transition("visibility", ".2s")};
    cursor: pointer;
    background: none;
    border: none;
    color: ${theme.text.primary};
    outline: none;
    border-radius: 50px;
    margin-left: 0.5em;
  `}
`;

const MessageDetails = styled.span`
  z-index: -1;
  display: flex;
  align-items: center;
  font-family: ${(props) => props.theme.fontFamily.mono};
  font-size: 10.75px;
  margin: 0.25em 0 0 0;
`;

const defaultMessage = {
  value: "",
  sentBy: {
    name: "Unknown",
    avatar: null,
  },
  sentAt: moment().format(),
};

export const Message = ({ message = defaultMessage, roomKey, userId }) => {
  const [isActive, setIsActive] = useState(false);
  const [editedMessage, setEditedMessage] = useState("");
  const valueRef = createRef();

  const handleEditClick = () => {
    setIsActive(true);
    setEditedMessage(message.value);
  };

  const handleOnChange = (event) => {
    const { value } = event.target;
    setEditedMessage(value);
  };

  const handleCancelEdit = (event) => {
    event.preventDefault();
    if (event.relatedTarget?.localName !== "button") {
      setIsActive(false);
    }
  };

  const handleSubmitEdit = (event) => {
    event.preventDefault();
    db.ref(`messages/${roomKey}/${message.key}`).update({
      prevValue: message.value,
      value: editedMessage,
      isEdited: true,
    });
    setIsActive(false);
    setEditedMessage("");
  };

  return (
    <Container>
      <Avatar src={message.sentBy.avatar} />
      <Group>
        <Username>{message.sentBy.name}</Username>
        <Value id={message.key} ref={valueRef}>
          {message.value}
        </Value>
        {isActive && (
          <form onSubmit={handleSubmitEdit}>
            <Input
              value={editedMessage}
              style={{ margin: "10px 0" }}
              autoFocus
              withButton={true}
              onChange={handleOnChange}
              onBlur={handleCancelEdit}
            />
          </form>
        )}
        <MessageDetails>
          <time dateTime={message.sentAt}>
            <span>Sent {moment(message.sentAt).fromNow()}</span>
          </time>
          {message.isEdited && (
            <span style={{ marginLeft: ".5em" }}> - Edited</span>
          )}
          {userId === message.sentBy.uid && (
            <EditButton>
              <FiEdit onClick={handleEditClick} />
            </EditButton>
          )}
        </MessageDetails>
      </Group>
    </Container>
  );
};
