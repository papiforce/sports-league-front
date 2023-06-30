import { useEffect } from "react";
import styled from "styled-components";

import Navbar from "components/molecules/Navbar";
// import Footer from "components/molecules/Footer";

const Container = styled.main`
  ${({ theme: { screens } }) => `
    max-width: ${screens.maxDesktop}px;
  `}
  margin: 0 auto;
  width: 100%;
  min-height: 100vh;
  padding-top: 86px;
`;

const Layout = ({
  title = "Ligue Sportive d'Auvergne",
  description = "Site permettant la location de matériels, équipements et tenues de football",
  withFooter = true,
  children,
}) => {
  useEffect(() => {
    document.title = title;
    document.getElementsByTagName("META")[3].content = description;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Navbar />
      <Container>{children}</Container>
      {/* {withFooter && <Footer />} */}
    </>
  );
};

export default Layout;
