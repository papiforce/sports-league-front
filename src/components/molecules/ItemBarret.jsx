import { useEffect, useState } from "react";
import styled from "styled-components";

import Text from "components/atoms/Texts/Text";
import Counter from "./Counter";

const Container = styled.div`
  ${({ theme: { colors } }) => `
    background: ${colors.greyDark};
  `}
  border-radius: 0px 8px 8px 0px;
  display: flex;
  align-items: center;
  gap: 16px;
`;

const Poster = styled.img`
  max-width: 100px;
  width: 100%;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px 0;
`;

const ItemBarret = ({
  picture,
  name,
  quantity,
  price,
  duration,
  onValueChange,
  style,
}) => {
  const [val, setVal] = useState(quantity ?? 0);

  useEffect(() => {
    setVal(quantity);
  }, [quantity]);

  return (
    <Container style={style}>
      <Poster src={picture} alt={name} />

      <Wrapper>
        <Text fontSize="font16" fontWeight={400}>
          {name}
        </Text>
        <Text fontSize="font16" fontWeight={400}>
          {price * val * duration}€ ({price}€ l'unité) pour{" "}
          {duration < 2 ? `${duration} jour` : `${duration} jours`} de location
        </Text>
      </Wrapper>

      <Counter
        value={val}
        onValueChange={(subVal) => {
          setVal(subVal);
          onValueChange(subVal);
        }}
        style={{ marginLeft: "auto", marginRight: 24 }}
      />
    </Container>
  );
};

export default ItemBarret;
