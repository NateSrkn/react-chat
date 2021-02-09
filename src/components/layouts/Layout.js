import { Fragment } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import styled from "styled-components";

const GridContainer = styled.div`
  display: grid;
  grid: [stack] 1fr / min-content [stack] 1fr;
  min-block-size: 100vh;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    & > aside,
    & > main {
      grid-area: stack;
    }
  }
`;

export const Layout = ({ children }) => {
  return (
    <Fragment>
      <GridContainer>
        <Sidebar />
        <main>
          <Header />
          <div className="content">{children}</div>
        </main>
      </GridContainer>
    </Fragment>
  );
};
