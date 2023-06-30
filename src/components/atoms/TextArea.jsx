import { useState } from "react";
import styled from "styled-components";

import Text from "./Texts/Text";

const Container = styled.div`
  ${({ width }) => `
		max-width: ${width};
	`}
  box-sizing: border-box;
  width: 100%;
  position: relative;
`;

const Template = styled.textarea`
  ${({
    theme: { colors },
    background,
    padding,
    height,
    isError,
    isFocus,
    isHover,
    hasIcon,
  }) => `
    height: ${height};
		padding: ${hasIcon ? "12px 24px 12px 64px" : padding};
		background: ${colors[background]};
		color: ${isError ? colors.red : colors.white};
		border: ${
      isError
        ? `2px solid ${colors.red}`
        : isFocus || isHover
        ? `2px solid ${colors.white30}`
        : "2px solid transparent"
    };

    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-webkit-autofill:active {
      caret-color: ${colors.white};
      -webkit-box-shadow: 0 0 0 30px ${colors.greyLight} inset !important;
      border: 2px solid ${isError ? colors.red : colors.greyLight} !important;
      -webkit-text-fill-color: ${
        isError ? colors.red : colors.white
      } !important;
    }
	`}
  font-family: "Poppins", sans-serif;
  font-size: 16px;
  font-weight: 400;
  width: 100%;
  box-sizing: border-box;
  border-radius: 16px;
  resize: none;

  &::placeholder {
    font-size: 18px;
  }

  &:disabled {
    opacity: 0.6;
    box-shadow: none;
    cursor: not-allowed;
  }

  &:focus {
    box-shadow: none;
    outline: none;
  }
`;

const CustomIndicator = styled(Text)`
  ${({ theme: { colors }, background }) => `
    background: ${colors[background]};
  `}
  position: absolute;
  bottom: 12px;
  right: 10px;
  padding: 6px 8px;
  border-radius: 4px;
`;

const TextArea = ({
  name,
  label,
  placeholder,
  background = "greyLight",
  indicatorBackground = "greyDark",
  width,
  height = "140px",
  padding = "12px 24px",
  maxLength = 180,
  onChange,
  value = "",
  isError = false,
  errorMessage,
  style,
}) => {
  const [isFocus, setIsFocus] = useState(false);
  const [isHover, setIsHover] = useState(false);

  return (
    <Container width={width} style={style}>
      {label && (
        <Text
          fontSize="font14"
          fontWeight={400}
          style={{ marginLeft: 24, marginBottom: 4 }}
        >
          {label}
        </Text>
      )}

      <Template
        name={name}
        placeholder={placeholder}
        background={background}
        padding={padding}
        height={height}
        isFocus={isFocus}
        isHover={isHover}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        value={value}
        maxLength={maxLength}
        onChange={(event) => {
          if (onChange) onChange(event.target);
        }}
      />

      <CustomIndicator fontSize="font14" background={indicatorBackground}>
        {value ? value.length : 0} / {maxLength}
      </CustomIndicator>

      {isError && errorMessage && (
        <Text
          fontSize="font12"
          fontWeight="weight400"
          color="red"
          style={{ marginTop: 4, marginLeft: 24 }}
        >
          {errorMessage}
        </Text>
      )}
    </Container>
  );
};

export default TextArea;
