import { useEffect, createContext, useContext, useState } from "react";
import { db } from "../services/firebase";

export const roomsContext = createContext([]);

export const useRoomsList = () => {
  const rooms = useContext(roomsContext);
  return rooms;
};

export const useRooms = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    roomsRef.on("value", (snapshot) => {
      const tempRooms = [];
      snapshot.forEach((snap) => {
        tempRooms.push({ key: snap.key, ...snap.val() });
      });
      setRooms(tempRooms);
    });

    return () => {
      roomsRef.off();
    };
  }, []);

  return rooms;
};

export const addRoom = (room, isAuth = false) => {
  const isValidName = validRoomNameTest(room.name);
  if (isAuth || isValidName) {
    roomsRef.push(room);
  }
  if (!isValidName) {
    throw new Error("Invalid Name");
  }
};
export const removeRoom = (key, isAuth = false) => {
  if (isAuth) {
    db.ref(`rooms/${key}`).remove();
    db.ref(`messages/${key}`).remove();
  }
};

export const validRoomNameTest = (name) =>
  new RegExp(/^[a-zA-Z0-9 ]*$/).test(name);

export const roomsRef = db.ref("rooms");
