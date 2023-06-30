import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Cookies from "js-cookie";

import { AuthContext } from "contexts/AuthContext";

import BurgerMenu from "assets/icons/burger-menu.svg";
import CloseIcon from "assets/icons/close.svg";
import useWindowSize from "utils/useWindowSize";

import Link from "components/atoms/Texts/Link";
import Text from "components/atoms/Texts/Text";
import ButtonWithDropdown from "components/atoms/Buttons/ButtonWithDropdown";

const Container = styled.nav`
  width: 100%;
  position: fixed;
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
  z-index: 999;
`;

const Wrapper = styled.div`
  ${({ theme: { screens } }) => `
		max-width: ${screens.maxDesktop}px;
	`}
  position: relative;
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px 24px;
`;

const CustomLinkText = styled(Text)`
  ${({ theme: { colors }, isActive }) => `
		color: ${isActive ? colors.purple : colors.white} !important;

    &:hover {
      color: ${colors.purple} !important;
    }

		${
      isActive &&
      `::after {
        content: "";
        position: absolute;
        bottom: -8px;
        left: -73%;
        transform: translate(50%, 50%);
        width: 120%;
        border: 1px solid ${colors.purple};
      }`
    }
	`}
  position: relative;
`;

const RightItemsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
  position: absolute;
  right: 24px;
`;

const BurgerMenuIcon = styled.img`
  margin-left: auto;
  width: clamp(1.5rem, 5vw, 2rem);
`;

const CustomText = styled(Text)`
  ${({ theme: { colors } }) => `
    background: ${colors.purple};
  `}
  padding: 8px 16px;
  border-radius: 8px;
`;

const MobileMenuContainer = styled.div`
  ${({ isOpen }) => `
    left: ${isOpen ? 0 : "100%"};
  `}
  transition: left .5s;
  position: absolute;
  background: black;
  width: 100vw;
  height: calc(100vh - clamp(5.438rem, 13vw + 1rem, 8.438rem));
  top: clamp(5.438rem, 13vw + 1rem, 8.438rem);
  padding: 0 16px;
`;

const MobileMenuWrapper = styled.div`
  width: 100%;
  margin: 40px 0px;
  gap: 32px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const AvatarWrapper = styled.div`
  ${({ theme: { colors }, isOpen }) => `
    background: ${isOpen ? colors.greyLight : colors.transparent};
    border: 3px solid ${colors.purple};

    &:hover {
      background: ${colors.greyLight};
    }
  `}
  height: 56px;
  width: 56px;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;
`;

const Navbar = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const { width } = useWindowSize();
  const navigate = useNavigate();

  const isBiggerThan910 = width >= 910;

  const [isOpen, setIsOpen] = useState(false);

  // const unloggedLeftItems = [{ label: "Catalogue", href: "/catalogue" }];

  const loggedItems = [
    auth &&
      auth.user && {
        label: "Profil",
        slot: `/profil/${auth.user._id}`,
        isLink: true,
      },
    {
      label: "Paramètres",
      slot: "/parametres",
      isLink: true,
      hasSeparator: true,
    },
    {
      label: "Se déconnecter",
      isRed: true,
      isLink: false,
      action: () => {
        Cookies.remove("lsa-token");
        setAuth({ isAuthenticated: false, user: null });

        return navigate("/");
      },
    },
  ];

  return (
    <Container>
      <Wrapper>
        <Link href="/">
          <Text fontSize="font32" fontWeight={200}>
            LSA
          </Text>
        </Link>

        {isBiggerThan910 ? (
          <RightItemsWrapper>
            {!auth.isAuthenticated ? (
              <Link href="/connexion">
                <CustomText fontSize="font18">Connexion</CustomText>
              </Link>
            ) : (
              <ButtonWithDropdown
                isOpen={isOpen}
                items={loggedItems}
                handleOnClick={(value) => setIsOpen(value)}
              >
                <AvatarWrapper
                  isOpen={isOpen}
                  onClick={() => setIsOpen((isOpen) => !isOpen)}
                >
                  {auth && auth.user && (
                    <Text fontSize="from24to14" fontWeight={400}>
                      {auth.user.firstname[0].toUpperCase()}
                      {auth.user.lastname[0].toUpperCase()}
                    </Text>
                  )}
                </AvatarWrapper>
              </ButtonWithDropdown>
            )}
          </RightItemsWrapper>
        ) : (
          <BurgerMenuIcon
            src={isOpen ? CloseIcon : BurgerMenu}
            alt="burger menu"
            onClick={() => {
              setIsOpen((isOpen) => !isOpen);
              document.getElementById("htmlId").style.overflowY = !isOpen
                ? "hidden"
                : "auto";
            }}
            loading="lazy"
          />
        )}

        {!isBiggerThan910 && (
          <MobileMenuContainer isOpen={isOpen}>
            <MobileMenuWrapper>
              {!auth.isAuthenticated ? (
                <>
                  <Link href="/inscription">
                    <Text fontSize="font18" fontWeight={400}>
                      Inscription
                    </Text>
                  </Link>
                  <Link href="/connexion">
                    <Text fontSize="font18" fontWeight={400}>
                      Connexion
                    </Text>
                  </Link>
                </>
              ) : (
                loggedItems.map((item, idx) => {
                  if (item.isLink) {
                    return (
                      <Link key={`mobile_bottom_item_${idx}`} href={item.slot}>
                        <CustomLinkText
                          fontSize="font18"
                          fontWeight={400}
                          isActive={window.location.href.includes(
                            item.label
                              .toLowerCase()
                              .normalize("NFD")
                              .replace(/[\u0300-\u036f]/g, "")
                          )}
                        >
                          {item.label}
                        </CustomLinkText>
                      </Link>
                    );
                  }

                  return (
                    <div
                      key={`mobile_bottom_item_${idx}`}
                      onClick={item.action}
                    >
                      <Text fontSize="font18" fontWeight={400}>
                        {item.label}
                      </Text>
                    </div>
                  );
                })
              )}
            </MobileMenuWrapper>
          </MobileMenuContainer>
        )}
      </Wrapper>
    </Container>
  );
};

export default Navbar;
