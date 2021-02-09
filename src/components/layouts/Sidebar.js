import React, { useState } from "react";
import { Input } from "../common/Input";
import { useCurrentUser } from "../../hooks/useAuth";

import {
  useRoomsList,
  addRoom,
  removeRoom,
  validRoomNameTest,
} from "../../hooks/useRooms";
import styled, { css } from "styled-components";
import Link from "next/link";
import moment from "moment";
import { Subheader } from "../styled/Headers";
import { useRouter } from "next/router";
import { FiDelete } from "react-icons/fi";
import { useActiveRoomContext } from "../../hooks/useActiveRoom";
export const Wrapper = styled.aside`
  ${({ theme }) => css`
    width: 250px;
    display: flex;
    flex-direction: column;
    background: ${theme.bg.primary};
    transition: ${theme.bgTransition};
    border-right: 0.5px solid ${theme.border.primary};
    @media screen and (max-width: ${(props) =>
        props.theme.breakpoints.mobile}) {
      transform: translateX(-250px);
    }
  `}
`;

const Content = styled.div`
  height: 100%;
`;

export const List = styled.ul`
  display: "flex";
  flex-direction: column;
  list-style: none;
  padding: 0;
`;

export const ListItem = styled.li`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    transition: ${theme.bgTransition};
    padding: 1rem;
    ${theme.font.sans};
    &:hover {
      transition: ${theme.bgTransition};
      background-color: ${theme.colors.green}50;

      ${RoomActions} {
        opacity: 1;
        transition: ${theme.transition("opacity", "0.2s")};
      }
    }
  `}
`;

export const AddRoomButton = styled.button`
  ${({ theme }) => css`
    font-family: ${theme.fontFamily.mono};
    width: 100%;
    color: ${theme.text.primary};
    font-size: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-top: 0.5px solid ${theme.border.primary};
  `}
`;

export const RoomList = styled.div`
  margin-top: 10px;
`;

export const RoomActions = styled.span`
  ${({ theme }) => css`
    opacity: 0;
    transition: ${theme.transition("opacity", "0.2s")};
    button {
      cursor: pointer;
      background: none;
      border: none;
      outline: none;
      color: ${theme.text.primary};
      font-size: 16px;
    }
    button:not(:last-child) {
      margin: 0 0.5rem;
    }
  `}
`;

const Header = styled.h2`
  cursor: pointer;
  font-family: ${(props) => props.theme.headers.fontFamily};
  font-size: 5ch;
  padding: 15px;
`;

export const Sidebar = () => {
  const { currentUser } = useCurrentUser();
  const isAuth = currentUser ? true : false;
  const rooms = useRoomsList();
  const activeRoom = useActiveRoomContext();
  const [inputList, setInputList] = useState({
    roomName: "",
    editedRoomName: "",
  });
  const [errorList, setErrorList] = useState({
    roomName: false,
    editedRoomName: false,
  });

  const router = useRouter();

  const handleAddRoom = (event) => {
    event.preventDefault();
    if (inputList.roomName === "") return;
    addRoom(
      {
        name: inputList.roomName.trim(),
        createdBy: { uid: currentUser.uid, name: currentUser.displayName },
        createdAt: moment().format(),
      },
      isAuth
    );
    inputList["roomName"] = "";
    errorList["roomName"] = false;
  };

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setInputList({ [name]: value });
    setErrorList({
      [name]: value.trim() === "" ? false : validRoomNameTest(value),
    });
  };

  const handleDeleteRoom = (key, auth) => {
    if (activeRoom.key === key) {
      router.push("/");
    }
    removeRoom(key, auth);
  };

  return (
    <Wrapper id="sidenav">
      <Content>
        <Link href={"/"}>
          <Header>Chatr</Header>
        </Link>
        <RoomList>
          <Subheader style={{ marginLeft: "1rem" }}>Rooms</Subheader>
          {rooms.length > 0 && (
            <List>
              {rooms.map((room) => (
                <Link
                  href={{
                    pathname: `/room/[id]`,
                    query: { id: room.name, key: room.key },
                  }}
                  key={room.key}
                >
                  <ListItem>
                    <div>{room.name} </div>
                    {currentUser?.uid === room.createdBy.uid && (
                      <RoomActions>
                        <button
                          onClick={() => handleDeleteRoom(room.key, isAuth)}
                        >
                          <FiDelete title="Delete Room" />
                        </button>
                      </RoomActions>
                    )}
                  </ListItem>
                </Link>
              ))}
            </List>
          )}
        </RoomList>
      </Content>
      {currentUser && (
        <form onSubmit={handleAddRoom} style={{ width: "100%" }}>
          <div style={{ margin: ".75rem" }}>
            <Input
              name="roomName"
              value={inputList.roomName}
              maxLength="15"
              placeholder="Enter room name"
              onChange={handleChange}
            />
          </div>
          <AddRoomButton
            disabled={!errorList.roomName}
            className="p-4 bg-green-500 disabled:opacity-50"
          >
            Add Room
          </AddRoomButton>
        </form>
      )}
    </Wrapper>
  );
};
