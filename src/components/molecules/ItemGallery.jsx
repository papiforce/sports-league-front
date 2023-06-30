import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  max-width: 600px;
`;

const MainPoster = styled.img`
  width: 100%;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 12px;
`;

const Poster = styled.img`
  ${({ theme: { colors }, isSelected }) => `
    border: 2px solid ${isSelected ? colors.purple : colors.transparent};
  `}
  width: 100%;
  max-width: 140px;
  max-height: 180px
  object-fit: cover;
  object-position: center;
  cursor: pointer;
`;

const ItemGallery = ({ pictures }) => {
  const [selectedPicture, setSelectedPicture] = useState(0);

  return (
    <Container>
      <MainPoster
        src={pictures[selectedPicture]}
        alt={`picture${selectedPicture}`}
        loading="lazy"
      />

      <Wrapper>
        {pictures.map((pic, idx) => (
          <Poster
            key={`picture${idx}`}
            src={pic}
            alt={`picture${idx}`}
            isSelected={idx === selectedPicture}
            onClick={() => setSelectedPicture(idx)}
          />
        ))}
      </Wrapper>
    </Container>
  );
};

export default ItemGallery;
