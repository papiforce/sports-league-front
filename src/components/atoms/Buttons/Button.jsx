import styled from "styled-components";

import Text from "../Texts/Text";

const Template = styled.button`
  ${({ theme: { colors }, color, width, isDisable, isClickable }) => {
    if (isDisable) {
      return `
        &:disabled {
          background: ${colors.greyMid};
          cursor: not-allowed;
        }
      `;
    }

    return `
      cursor: ${isClickable ? "pointer" : "default"};
      max-width: ${width};
      background: ${colors[color]};

      &::before {
        content: "";
        position: absolute;
        width: 110%;
        height: 200vh;
        z-index: -1;
        background: ${colors[color]};
        transition: all .4s;
      }

      &:hover::before {
        transform: rotate(180deg);
      }
    `;
  }}
  overflow: hidden;
  position: relative;
  width: 100%;
  font-family: "Poppins", sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 100ms cubic-bezier(0.64, 0.04, 0.35, 1);
  transform: scale(1);
  box-sizing: border-box;
  border: none;
  border-radius: 8px;

  &:focus {
    outline: none;
  }
`;

const Button = ({
  type = "button",
  fontSize = "font18",
  fontWeight = 400,
  width = "100%",
  color = "purple",
  children,
  isDisable = false,
  style,
  isLoading = false,
  onClick,
}) => {
  return (
    <Template
      type={type}
      width={width}
      color={color}
      disabled={isDisable}
      isDisable={isDisable}
      isClickable={onClick}
      onClick={() => {
        if (onClick) onClick();
      }}
      style={style}
    >
      <Text
        fontSize={fontSize}
        fontWeight={fontWeight}
        color={isDisable ? "greyLighter" : "white"}
        textAlign="center"
      >
        {isLoading ? "Chargement.." : children}
      </Text>
    </Template>
  );
};

export default Button;
