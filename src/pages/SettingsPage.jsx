import { useEffect, useContext, useState } from "react";
import styled from "styled-components";

import { AuthContext } from "contexts/AuthContext";

import Layout from "./Layouts/Layout";

import ProfileInfos from "components/organisms/ProfileInfos";
import Text from "components/atoms/Texts/Text";
import SettingsForm from "components/organisms/Forms/SettingsForm";

const Container = styled.div`
  ${({ theme: { screens } }) => `
    max-width: ${screens.desktop}px;
  `}
  display: flex;
  flex-wrap: wrap;
  gap: 32px 48px;
  width: 100%;
  margin: 40px auto 112px;
  padding: 0 16px;

  @media (max-width: 1280px) {
    justify-content: center;
  }
`;

const SettingsPage = () => {
  const { auth } = useContext(AuthContext);

  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(auth.user);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  if (!user)
    return (
      <Text fontSize="font24" textAlign="center">
        Chargement...
      </Text>
    );

  return (
    <Layout
      title="Paramètres | Ligue Sportive d'Auvergne"
      description="Cette page permet de paramétrer votre compte."
      withFooter={false}
    >
      <Container>
        <ProfileInfos user={user} />

        <div style={{ width: "100%", maxWidth: 600 }}>
          <SettingsForm />
        </div>
      </Container>
    </Layout>
  );
};

export default SettingsPage;
