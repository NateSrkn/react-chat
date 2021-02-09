import React from "react";
import styled, { css } from "styled-components";
import { useActiveRoomContext } from "../../hooks/useActiveRoom";
import { useCurrentUser, useSignOut, useSignIn } from "../../hooks/useAuth";
import { Avatar } from "../common/Avatar";
import { Menu, Transition } from "@headlessui/react";
import { FiUser } from "react-icons/fi";
import { DropdownItem } from "../common/Dropdown";
import Link from "next/link";
const Container = styled.header`
  grid-column: 2;
  background: ${(props) => props.theme.bg.primary};
  transition: ${(props) => props.theme.bgTransition};
  border-bottom: 0.5px solid ${(props) => props.theme.border.primary};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding: 15px;
  min-height: 85px;
`;

const RoomName = styled.h2`
  ${({ theme }) => css`
    font-family: ${theme.headers.fontFamily};
    font-weight: ${theme.headers.fontWeight};
    font-size: ${theme.fontSize("14px", "4vh + 20%", "28px")};
  `}
`;

export const Header = () => {
  const activeRoom = useActiveRoomContext();
  const { currentUser } = useCurrentUser();
  return (
    <Container>
      {activeRoom && (
        <RoomName>
          {activeRoom.name}
          <div style={{ fontSize: 12 }}>
            Created By: {activeRoom.createdBy.name}
          </div>
        </RoomName>
      )}
      <div className="relative inline-block text-left ml-auto">
        <Menu>
          {({ open }) => (
            <React.Fragment>
              <span className="rounded-md shadow-sm">
                <Menu.Button
                  className={`p-0 m-0 bg-transparent focus:outline-none overflow-hidden rounded-md ${
                    currentUser ? "next-image-wrap" : "text-3xl bg-gray-700 p-2"
                  }`}
                >
                  {currentUser ? (
                    <Avatar
                      src={currentUser.photoURL}
                      height={35}
                      width={35}
                      className="avatar-img"
                    />
                  ) : (
                    <FiUser />
                  )}
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
                  className={`absolute right-0 w-56 mt-2 origin-top-right bg-gray-700 border border-gray-700 divide-y divide-gray-100 rounded-md shadow-lg outline-none z-50`}
                >
                  <div className="px-4 py-3">
                    <p className="text-sm font-medium leading-5">
                      {currentUser ? currentUser.displayName : "Welcome"}
                    </p>
                    <p className="text-sm  leading-5 truncate">
                      {currentUser && currentUser.email}
                    </p>
                  </div>

                  <Link href="/">
                    <DropdownItem>Home</DropdownItem>
                  </Link>
                  <Link href="/room-list">
                    <DropdownItem>Rooms</DropdownItem>
                  </Link>
                  {currentUser ? (
                    <DropdownItem onClick={useSignOut}>Sign Out</DropdownItem>
                  ) : (
                    <DropdownItem onClick={useSignIn}>Sign In</DropdownItem>
                  )}
                </Menu.Items>
              </Transition>
            </React.Fragment>
          )}
        </Menu>
      </div>
    </Container>
  );
};
