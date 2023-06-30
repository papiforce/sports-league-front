import { Link } from "react-router-dom";
import styled from "styled-components";

import OutsideClick from "utils/OutsideClick";

import Text from "../Texts/Text";

const Container = styled.div`
  position: relative;
`;

const DropdownList = styled.div`
  ${({ position }) => {
    if (position === "top-left") {
      return `
        bottom: 120%;
        left: 0;
      `;
    }

    if (position === "bottom-left") {
      return `
        top: 120%;
        left: 0;
      `;
    }

    return `
      top: 120%;
      right: 0;
    `;
  }}
  background: ${({ theme: { colors } }) => colors.greyDark};
  position: absolute;
  padding: 6px;
  min-height: max-content;
  min-width: max-content;
  max-width: 300px;
  border-radius: 8px;
  z-index: 1;
  -webkit-box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.3);
`;

const DropdownItem = styled.div`
  ${({ theme: { colors }, isRed }) => `
		&:hover {
			background: ${isRed ? colors.red : colors.greyLight};
		} 
	`}
  display: flex;
  align-items: center;
  padding: 12px 8px;
  border-radius: 4px;
  cursor: pointer;
`;

const DropdownLink = styled(Link)`
  ${({ theme: { colors }, isred }) => `
    &:hover {
      background: ${isred ? colors.red : colors.greyLight};
    } 
  `}
  display: flex;
  align-items: center;
  padding: 12px 8px;
  border-radius: 4px;
  cursor: pointer;
`;

const Separator = styled.div`
  background: ${({ theme: { colors } }) => colors.white30};
  height: 1px;
  width: calc(100% - 16px);
  margin: 6px auto;
`;

const ButtonWithDropdown = ({
  children,
  items,
  isOpen,
  position = "bottom-right",
  style,
  handleOnClick,
}) => {
  return (
    <OutsideClick
      action={() => {
        if (handleOnClick) handleOnClick(false);
      }}
      style={style}
    >
      <Container
        onClick={() => {
          if (handleOnClick) handleOnClick(!isOpen);
        }}
      >
        {children}

        {isOpen && (
          <DropdownList position={position}>
            {items &&
              items.map((item, idx) => {
                if (item.isLink) {
                  return (
                    <div key={idx}>
                      <DropdownLink to={item.slot} isred={item.isRed}>
                        <Text fontSize="font16" fontWeight={400}>
                          {item.label}
                        </Text>
                      </DropdownLink>
                      {item.hasSeparator && <Separator />}
                    </div>
                  );
                }

                return (
                  <div key={idx}>
                    <DropdownItem
                      onClick={() => {
                        if (item.action) item.action();
                      }}
                      isRed={item.isRed}
                    >
                      <Text fontSize="font16" fontWeight={400}>
                        {item.label}
                      </Text>
                    </DropdownItem>
                    {item.hasSeparator && <Separator />}
                  </div>
                );
              })}
          </DropdownList>
        )}
      </Container>
    </OutsideClick>
  );
};

export default ButtonWithDropdown;
