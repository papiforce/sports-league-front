import { useState } from "react";
import styled from "styled-components";

import Text from "components/atoms/Texts/Text";

const Container = styled.div``;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 24px;
`;

const Tag = styled(Text)`
  ${({ theme: { colors }, isSelected }) => `
    background: ${isSelected ? colors.purple : colors.transparent};
  `}
  border-radius: 3.75rem;
  padding: 6px 16px;
  cursor: pointer;
  user-select: none;
`;

const TagChoice = ({ label, choices, value, onChange, style }) => {
  const [selected, setSelected] = useState(value ?? choices[2]);

  return (
    <Container style={style}>
      {label && (
        <Text
          fontSize="font14"
          fontWeight={400}
          style={{ marginLeft: 24, marginBottom: 8 }}
        >
          {label}
        </Text>
      )}
      <Wrapper>
        {choices.map((choice, idx) => (
          <Tag
            key={idx}
            fontSize="font16"
            fontWeight={400}
            isSelected={selected === choice}
            onClick={() => {
              setSelected(choice);
              onChange(choice);
            }}
          >
            {choice}
          </Tag>
        ))}
      </Wrapper>
    </Container>
  );
};

export default TagChoice;
