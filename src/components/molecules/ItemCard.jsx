import styled from "styled-components";

import Text from "components/atoms/Texts/Text";

const Container = styled.div`
  max-width: 300px;
  width: 100%;
  cursor: pointer;
  display: flex;
  flex-direction: column;
`;

const Poster = styled.img`
  border-radius: 8px 8px 0px 0px;
  width: 100%;
  max-height: 300px;
  object-fit: cover;
`;

const Wrapper = styled.div`
  ${({ theme: { colors } }) => `
    background: ${colors.greyLight};
  border-top: 4px solid ${colors.purple};
  `}
  padding: 12px;
  border-radius: 0px 0px 8px 8px;
`;

const ItemCard = ({ name, price, posterUrl, onClick }) => {
  return (
    <Container onClick={onClick}>
      <Poster src={posterUrl} alt={name} loading="lazy" />
      <Wrapper>
        <Text
          fontSize="font14"
          fontWeight={500}
          textAlign="center"
          style={{ marginBottom: 8 }}
        >
          {name}
        </Text>
        <Text fontSize="font14" fontWeight={500} textAlign="right">
          {price}€ / jour
        </Text>
      </Wrapper>
    </Container>
  );
};

export default ItemCard;
