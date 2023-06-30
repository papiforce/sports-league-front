import { useState } from "react";
import styled from "styled-components";

import { slugify } from "utils/slug";

import Text from "components/atoms/Texts/Text";

const Container = styled.div`
  ${({ theme: { colors } }) => `
    background: ${colors.greyDark};
  `}
  width: max-content;
  display: flex;
  align-items: center;
  gap: 2px;
  padding: 6px;
  border-radius: 24px;
`;

const ItemWrapper = styled.div`
  cursor: pointer;
`;

const Item = styled(Text)`
  ${({ theme: { colors }, isActive }) => `
    background: ${isActive ? colors.purple : colors.transparent};
  `}
  padding: 6px 16px;
  border-radius: 24px;
`;

const TabSelector = ({ items, activeItem, onClick, style }) => {
  const [activeOne, setActiveOne] = useState(activeItem || items[0]);

  return (
    <Container style={style}>
      {items.map((item, idx) => {
        const isActive = activeOne === item || activeOne === slugify(item);

        return (
          <ItemWrapper
            key={idx}
            onClick={() => {
              setActiveOne(item);
              if (onClick) onClick(item);
            }}
          >
            <Item fontSize="font16" fontWeight={400} isActive={isActive}>
              {item}
            </Item>
          </ItemWrapper>
        );
      })}
    </Container>
  );
};

export default TabSelector;
