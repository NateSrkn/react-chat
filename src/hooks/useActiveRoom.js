import { useEffect, createContext, useContext, useState } from "react";
import { useRouter } from "next/router";

export const activeRoomContext = createContext(null);

export const useActiveRoomContext = () => {
  const activeRoom = useContext(activeRoomContext);
  return activeRoom;
};

export const useActiveRoom = (rooms) => {
  const [activeRoom, setActiveRoom] = useState(null);
  const router = useRouter();
  const pathname = router.pathname.split("/")[1];

  const { key } = router.query;
  useEffect(() => {
    if (pathname === "room" && rooms.length) {
      setActiveRoom(rooms.filter((room) => room.key === key)[0]);
    } else {
      setActiveRoom(null);
    }
  }, [key, rooms]);

  return activeRoom;
};
