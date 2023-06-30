import styled from "styled-components";

import Title from "components/atoms/Texts/Title";
import Text from "components/atoms/Texts/Text";

const Container = styled.div`
  max-width: 400px;
  width: 100%;

  @media (min-width: 1280px) {
    min-height: 400px;
  }
`;

const Wrapper = styled.div`
  ${({ theme: { colors } }) => `
    background: ${colors.greyDark};
  `}
  min-height: 400px;
  width: 100%;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
`;

const AvatarWrapper = styled.div`
  ${({ theme: { colors }, isOpen }) => `
    background: ${isOpen ? colors.greyLight : colors.transparent};
    border: 3px solid ${colors.purple};
  `}
  height: 64px;
  width: 64px;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
`;

const RoleTag = styled(Text)`
  ${({ theme: { colors } }) => `
    background: ${colors.green};
  `}
  border-radius: 4px;
  padding: 4px 8px;
  user-select: none;
`;

const ProfileInfos = ({ user }) => {
  const getRoles = (role) => {
    switch (role) {
      case "ADMIN":
        return "Administrateur";
      case "FOUNDER":
        return "Fondateur";
      default:
        return "Membre";
    }
  };

  return (
    <Container>
      <Wrapper>
        <AvatarWrapper>
          <Text fontSize="font28" fontWeight={400}>
            {user.firstname[0].toUpperCase()}
            {user.lastname[0].toUpperCase()}
          </Text>
        </AvatarWrapper>
        <Title fontSize="from34to24" fontWeight={400}>
          {user.firstname} {user.lastname}
        </Title>
        <RoleTag fontSize="font14" fontWeight={400}>
          {getRoles(user.roles[user.roles.length - 1])}
        </RoleTag>
      </Wrapper>
    </Container>
  );
};

export default ProfileInfos;
