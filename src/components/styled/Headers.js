import styled from "styled-components";

export const Subheader = styled.h4`
  font-family: ${(props) => props.theme.headers.fontFamily};
  font-weight: ${(props) => props.theme.headers.subheader.fontWeight};
  font-size: ${(props) => props.theme.headers.subheader.fontSize};
  text-transform: uppercase;
`;
