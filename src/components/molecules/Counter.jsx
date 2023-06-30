import { useEffect, useState } from "react";
import styled from "styled-components";

import CircleButton from "components/atoms/Buttons/CircleButton";
import Text from "components/atoms/Texts/Text";

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  width: max-content;
`;

const Counter = ({ value, minValue, maxValue, onValueChange, style }) => {
  const [val, setVal] = useState(value ?? 0);

  useEffect(() => {
    setVal(value);
  }, [value]);

  return (
    <Container style={style}>
      <CircleButton
        color="white"
        onClick={() => {
          if (minValue && val > minValue) {
            setVal((value) => value - 1);
            return onValueChange(value - 1);
          }

          if (!minValue && val > 0) {
            setVal((value) => value - 1);
            onValueChange(value - 1);
          }
        }}
      >
        <Text fontSize="font24" fontWeight={500} color="black">
          -
        </Text>
      </CircleButton>

      <Text fontSize="font24">{val}</Text>

      <CircleButton
        color="white"
        onClick={() => {
          if (maxValue && val < maxValue) {
            setVal((value) => value + 1);
            return onValueChange(value + 1);
          }

          if (!maxValue) {
            setVal((value) => value + 1);
            onValueChange(value + 1);
          }
        }}
      >
        <Text fontSize="font24" fontWeight={500} color="black">
          +
        </Text>
      </CircleButton>
    </Container>
  );
};

export default Counter;
