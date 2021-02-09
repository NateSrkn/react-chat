import React from "react";
import Head from "next/head";
import { useCurrentUser } from "../hooks/useAuth";
import { Loading } from "../components/common/Loading";
import styled from "styled-components";
import { Button } from "../components/common/Button";

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  place-content: center;
`;

const CenteredWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Welcome = styled.h3`
  padding: 0.5em;
  font-size: 5ch;
  font-family: ${(props) => props.theme.headers.fontFamily};
`;
export default function Home() {
  const { currentUser, isLoading } = useCurrentUser();

  if (isLoading) return <Loading />;
  return (
    <Container>
      <Head>
        <title>Chatr</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <CenteredWrapper>
        {currentUser ? (
          <Welcome>Howdy there {currentUser.displayName}</Welcome>
        ) : (
          <CenteredWrapper>
            <Welcome>Howdy there.</Welcome>
            <Button>Sign in with Google</Button>
          </CenteredWrapper>
        )}
      </CenteredWrapper>
    </Container>
  );
}
