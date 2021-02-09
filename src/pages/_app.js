import "../styles/globals.css";
import { useEffect, useState } from "react";
import { Layout } from "../components/layouts/Layout";
import { ThemeProvider } from "styled-components";
import { darkTheme, GlobalStyles } from "../services/theme";
import { useAuth, currentUserContext } from "../hooks/useAuth";
import { useRooms, roomsContext } from "../hooks/useRooms";
import { useActiveRoom, activeRoomContext } from "../hooks/useActiveRoom";

function MyApp({ Component, pageProps }) {
  const [isMounted, setIsMounted] = useState(false);
  const { currentUser, isLoading } = useAuth();
  const rooms = useRooms();
  const activeRoom = useActiveRoom(rooms);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <roomsContext.Provider value={rooms}>
      <activeRoomContext.Provider value={activeRoom}>
        <currentUserContext.Provider value={{ currentUser, isLoading }}>
          <ThemeProvider theme={darkTheme}>
            <GlobalStyles />
            {isMounted && (
              <Layout>
                <Component {...pageProps} />
              </Layout>
            )}
          </ThemeProvider>
        </currentUserContext.Provider>
      </activeRoomContext.Provider>
    </roomsContext.Provider>
  );
}

export default MyApp;
