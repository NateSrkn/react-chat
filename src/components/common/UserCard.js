import { Avatar } from "./Avatar";
import styled from "styled-components";
const Container = styled.div`
  display: inline-flex;
  padding: 1rem;
  background: ${(props) => props.theme.colors.white};
  color: ${(props) => props.theme.colors.black};
  border-radius: 5px;
  box-shadow: ${(props) => props.theme.boxShadow.base};
  font-family: ${(props) => props.theme.fontFamily.mono};
`;

const InfoWrapper = styled.div`
  padding: 0.5rem;

  > *:not(:first-child) {
    margin-top: 5px;
  }
`;

const DisplayName = styled.div`
  font-size: 14px;
  font-weight: bold;
`;

const Email = styled.div`
  font-size: 12px;
`;
export const UserCard = ({ user }) => {
  return (
    <Container>
      <Avatar src={user.photoURL} height={100} width={100} />
      <InfoWrapper>
        <DisplayName>{user.displayName}</DisplayName>
        <Email>{user.email}</Email>
      </InfoWrapper>
    </Container>
  );
};
