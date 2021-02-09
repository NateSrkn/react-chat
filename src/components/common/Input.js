import styled, { css } from "styled-components";

const Wrapper = styled.div`
  ${({ withButton, theme }) =>
    withButton &&
    css`
      position: relative;
      display: flex;
      button {
        outline-offset: 2px;
        background: none;
        padding: 0.4em;
        color: ${theme.text.primary};
        border: none;
      }
    `}
`;
const Container = styled.input`
  ${({ theme }) => css`
    border-radius: ${theme.button.borderRadius};
    box-shadow: ${theme.boxShadow.base};
    background: ${theme.bg.secondary};
    padding: 7.5px;
    width: 100%;
    color: ${theme.text.primary};
    border: 0.5px solid ${theme.text.primary};
    &::placeholder {
      font-family: ${theme.fontFamily.mono};
    }
  `}
`;

export const Input = ({
  name,
  onSubmit = (event) => {
    event.preventDefault();
  },
  withButton = false,
  buttonText = "Submit",
  ...other
}) => {
  return (
    <Wrapper withButton={withButton}>
      <Container name={name} {...other} className="text-xs" />
      {withButton && <button type="submit">{buttonText}</button>}
    </Wrapper>
  );
};
