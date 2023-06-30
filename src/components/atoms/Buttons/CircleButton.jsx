import styled from "styled-components";

const ButtonStyled = styled.button`
  ${({ theme: { colors }, color, hoverColor }) => `
    background: ${color ? colors[color] : "transparent"};

    &:hover {
      background: ${hoverColor ? colors[hoverColor] : colors.white};
    }

    &:active {
      transform: scale(0.93);
    }
  `}
  border-radius: 50%;
  font-family: "Poppins", sans-serif;
  font-size: 24px;
  width: 32px;
  height: 32px;
  padding: 24px;
  border: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 100ms cubic-bezier(0.64, 0.04, 0.35, 1);
  transform: scale(1);
  cursor: pointer;
  color: white !important;

  &:focus {
    outline: none;
  }
`;

const CircleButton = ({
  children,
  style,
  color,
  hoverColor,
  onClick,
  ...props
}) => {
  return (
    <ButtonStyled
      color={color}
      hoverColor={hoverColor}
      style={style}
      type="button"
      onClick={onClick}
      {...props}
    >
      {children}
    </ButtonStyled>
  );
};

export default CircleButton;
