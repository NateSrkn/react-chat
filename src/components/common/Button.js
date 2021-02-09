import styled, { css } from "styled-components";

const Container = styled.button`
  cursor: pointer;
  ${(props) =>
    props.withStyles
      ? css`
          display: flex;
          justify-content: center;
          width: ${props.fullSize ? "100%" : "auto"};
          border: none;
          outline: none;
          background: ${props.theme.button.background};
          color: ${props.theme.button.color};
          padding: ${props.theme.button.padding};
          font-family: ${props.theme.button.fontFamily};
          border-radius: ${props.theme.button.borderRadius};
          transition: all 0.2s ease;

          &:hover {
            transform: scale(1.1);
            transition: all 0.2s ease;
          }

          &:disabled {
            background: red;
          }
        `
      : css`
          background: none;
          border: none;
          outline: none;
          color: ${props.theme.text.primary};
          font-family: ${props.theme.fontFamily.sans};
          font-size: 16px;
          text-align: left;
        `}
`;

export const Button = ({
  children,
  handleClick = () => null,
  withStyles = true,
  ...other
}) => {
  const onClick = (event) => {
    event.preventDefault();
    handleClick();
  };
  return (
    <Container
      onClick={(event) => onClick(event)}
      withStyles={withStyles}
      {...other}
    >
      {children}
    </Container>
  );
};
