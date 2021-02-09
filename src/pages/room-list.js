import React, { useState } from "react";
import {
  useRoomsList,
  removeRoom,
  addRoom,
  validRoomNameTest,
} from "../hooks/useRooms";
import {
  RoomList,
  List,
  ListItem,
  AddRoomButton,
} from "../components/layouts/Sidebar";
import { Subheader } from "../components/styled/Headers";
import Link from "next/link";
import { useCurrentUser } from "../hooks/useAuth";
import { DropdownItem } from "../components/common/Dropdown";
import { Menu, Transition } from "@headlessui/react";
import { FiDelete, FiMoreVertical } from "react-icons/fi";
import { Input } from "../components/common/Input";
import moment from "moment";
export default function roomList() {
  const [inputList, setInputList] = useState({
    roomName: "",
    editedRoomName: "",
  });
  const [errorList, setErrorList] = useState({
    roomName: false,
    editedRoomName: false,
  });
  const rooms = useRoomsList();
  const { currentUser } = useCurrentUser();
  const isAuth = currentUser ? true : false;
  const handleDeleteRoom = (key, auth) => {
    removeRoom(key, auth);
  };

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
  return (
    <div className="min-w-full flex flex-col min-h-full justify-between">
      <div className="min-h-full">
        <RoomList>
          <Subheader style={{ marginLeft: "1rem" }}>Rooms</Subheader>
          {rooms.length > 0 && (
            <List>
              {rooms.map((room) => (
                <ListItem key={room.key}>
                  <Link
                    href={{
                      pathname: `/room/[id]`,
                      query: { id: room.name, key: room.key },
                    }}
                  >
                    <div>{room.name} </div>
                  </Link>
                  {currentUser?.uid === room.createdBy.uid && (
                    <div className="relative inline-block text-left">
                      <Menu>
                        {({ open }) => (
                          <>
                            <span className="rounded-md shadow-sm">
                              <Menu.Button>
                                <FiMoreVertical />
                              </Menu.Button>
                            </span>

                            <Transition
                              show={open}
                              enter="transition ease-out duration-100"
                              enterFrom="transform opacity-0 scale-95"
                              enterTo="transform opacity-100 scale-100"
                              leave="transition ease-in duration-75"
                              leaveFrom="transform opacity-100 scale-100"
                              leaveTo="transform opacity-0 scale-95"
                            >
                              <Menu.Items
                                static
                                className={`absolute right-0 w-56 mt-2 origin-top-right bg-gray-700 border border-gray-700 divide-y divide-gray-100 rounded-md shadow-lg outline-none`}
                              >
                                <div className="py-1">
                                  <DropdownItem
                                    onClick={() =>
                                      handleDeleteRoom(room.key, isAuth)
                                    }
                                  >
                                    Delete
                                    <FiDelete title="Delete Room" />
                                  </DropdownItem>
                                </div>
                              </Menu.Items>
                            </Transition>
                          </>
                        )}
                      </Menu>
                    </div>
                  )}
                </ListItem>
              ))}
            </List>
          )}
        </RoomList>
      </div>
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
    </div>
  );
}
