import styled from "styled-components";
const Wrapper = styled.div`
  height: ${(props) => (props.height ? `${props.height}px` : "50px")};
  width: ${(props) => (props.width ? `${props.width}px` : "50px")};
  min-width: ${(props) => (props.width ? `${props.width}px` : "50px")};
  border-radius: 50px;
  overflow: hidden;
  img {
    height: 100%;
    width: 100%;
  }
`;

export const Avatar = ({ src, ...other }) => {
  return (
    <Wrapper {...other}>
      <img src={src} />
    </Wrapper>
  );
};
