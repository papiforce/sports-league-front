import { useState } from "react";
import styled from "styled-components";

import ChevronLeft from "assets/icons/chevron-left.svg";

import Text from "components/atoms/Texts/Text";
import Input from "components/atoms/Input";
import TextArea from "components/atoms/TextArea";
import TagChoice from "./TagChoice";
import Button from "components/atoms/Buttons/Button";

const Container = styled.div`
  ${({ theme: { colors } }) => `
    background: ${colors.greyDark};
  `}
  overflow: hidden;
  border-radius: 0px 8px 8px 0px;
`;

const Poster = styled.div`
  ${({ theme: { colors }, isAdmin }) => `
    background: ${isAdmin ? colors.purple : colors.greyLight};
  `}
  max-width: 100px;
  height: 100px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  gap: 8px;
  display: flex;
  align-items: center;
  gap: 16px;
  cursor: pointer;
`;

const RightWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
  margin: 0 24px 0 auto;
`;

const Chevron = styled.img`
  ${({ isOpen }) => `
    transform: ${isOpen ? "rotate(-90deg)" : "rotate(0deg)"};
  `}
  transition: transform 0.3s;
  width: 24px;
`;

const FormContainer = styled.div`
  ${({ isOpen }) => `
    max-height: ${isOpen ? "1500px" : "0px"};
  `}
  height: 100%;
  transition: max-height 0.3s;
`;

const FormWrapper = styled.div`
  border-radius: 24px;
  padding: 24px;
`;

const AdminUserBarret = ({
  firstname,
  lastname,
  email,
  roles,
  address,
  onSelect,
  onUpdate,
  onDelete,
  style,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [form, setForm] = useState({
    firstname: firstname ?? "",
    lastname: lastname ?? "",
    email: email ?? "",
    address: address ?? "",
    roles: roles ?? "",
  });

  const isDisable =
    firstname === form.firstname &&
    lastname === form.lastname &&
    email === form.email &&
    address === form.address &&
    roles.toString() === form.roles.toString();

  const getRole = (role) => {
    switch (role) {
      case "ADMIN":
        return "Administrateur";
      default:
        return "Membre";
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.name]: e.value });
  };

  return (
    <Container style={style}>
      <Wrapper onClick={() => setIsOpen((isOpen) => !isOpen)}>
        <Poster isAdmin={roles.includes("ADMIN")}>
          <Text fontSize="font32" fontWeight={400}>
            {firstname[0].toUpperCase()}
            {lastname[0].toUpperCase()}
          </Text>
        </Poster>
        <div>
          <Text fontSize="font16" fontWeight={400} style={{ marginBottom: 8 }}>
            {firstname} {lastname}
          </Text>
          <Text fontSize="font16" fontWeight={400}>
            {email}
          </Text>
        </div>

        <RightWrapper onClick={(e) => e.stopPropagation()}>
          <Button
            color="white30"
            onClick={() => {
              setIsSelected((isSelected) => !isSelected);

              onSelect();
            }}
            style={{ padding: 8 }}
          >
            {isSelected ? "Déselectionner" : "Selectionner"}
          </Button>

          <Chevron src={ChevronLeft} alt="chevron" isOpen={isOpen} />
        </RightWrapper>
      </Wrapper>

      <FormContainer isOpen={isOpen}>
        <FormWrapper>
          <Input
            name="firstname"
            label="Prénom"
            value={form.firstname}
            placeholder={firstname}
            onChange={handleChange}
          />

          <Input
            name="lastname"
            label="Nom de famille"
            value={form.lastname}
            placeholder={lastname}
            onChange={handleChange}
            style={{ margin: "24px 0" }}
          />

          <Input
            name="email"
            label="Email"
            value={form.email}
            placeholder={email}
            onChange={handleChange}
          />

          <TagChoice
            label="Rôle"
            choices={["Membre", "Administrateur"]}
            value={getRole(form.roles[roles.length - 1])}
            onChange={(value) =>
              setForm({
                ...form,
                roles:
                  value === "Administrateur" ? ["MEMBER", "ADMIN"] : ["MEMBER"],
              })
            }
            style={{ margin: "24px 0" }}
          />

          <TextArea
            name="address"
            label="Adresse de livraison"
            value={form.address}
            placeholder={address}
            maxLength={280}
            onChange={handleChange}
          />

          <Button
            color="gradientPurpleGreen"
            isDisable={isDisable}
            onClick={() => onUpdate(form)}
            style={{ padding: 12, margin: "40px 0 24px" }}
          >
            Modifier
          </Button>

          <Button color="red" onClick={onDelete} style={{ padding: 12 }}>
            Supprimer
          </Button>
        </FormWrapper>
      </FormContainer>
    </Container>
  );
};

export default AdminUserBarret;
