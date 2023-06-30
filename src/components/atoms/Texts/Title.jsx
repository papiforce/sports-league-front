import styled from "styled-components";
import Theme from "core/Theme";

const Template = styled.h1`
  ${({ fontFamily, fontSize, fontWeight, color, textAlign, isEllipsis }) => `
		font-family: ${fontFamily}, sans-serif;
		font-size: ${Theme.fontSize[fontSize]};
		font-weight: ${fontWeight};
		color: ${Theme.colors[color]};
		text-align: ${textAlign};
		line-height: calc(${Theme.fontSize[fontSize]} + 6px);
		white-space: ${isEllipsis ? "nowrap" : "normal"};
		overflow: ${isEllipsis ? "hidden" : "unset"};
		text-overflow: ${isEllipsis ? "ellipsis" : "unset"};
	`}
`;

const Title = ({
  number = 1,
  fontFamily = "Poppins",
  fontSize = "from20to14",
  fontWeight = 600,
  color = "white",
  textAlign = "left",
  isEllipsis = false,
  style,
  children,
  ...props
}) => {
  return (
    <Template
      as={`h${number}`}
      fontFamily={fontFamily}
      fontSize={fontSize}
      fontWeight={fontWeight}
      color={color}
      textAlign={textAlign}
      isEllipsis={isEllipsis}
      style={style}
      {...props}
    >
      {children}
    </Template>
  );
};

export default Title;
