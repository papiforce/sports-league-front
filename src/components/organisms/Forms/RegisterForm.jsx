import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { register } from "api/authQueries";

import Title from "components/atoms/Texts/Title";
import Input from "components/atoms/Input";
import TextArea from "components/atoms/TextArea";
import Button from "components/atoms/Buttons/Button";

const Container = styled.form`
  ${({ theme: { colors } }) => `
    background: ${colors.greyDark};
  `}
  margin: 56px auto 116px;
  max-width: 500px;
  border-radius: 16px;
  padding: 24px;

  @media (max-width: 532px) {
    margin: 56px 16px 0;
  }
`;

const RegisterForm = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    address: "",
    roles: ["MEMBER"],
    password: "",
    confirmPassword: "",
  });

  const isDisable =
    (form.firstname === "" &&
      form.lastname === "" &&
      form.email === "" &&
      form.address === "" &&
      form.password === "" &&
      form.confirmPassword === "") ||
    (form.password !== "" &&
      form.confirmPassword !== "" &&
      form.password !== form.confirmPassword);

  const handleChange = (e) => {
    setForm({ ...form, [e.name]: e.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await register(form);

      return navigate("/connexion");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container autoComplete="new-password" onSubmit={handleSubmit}>
      <Title
        fontSize="from40to24"
        fontWeight={300}
        textAlign="center"
        style={{ marginBottom: 36 }}
      >
        Inscription
      </Title>

      <Input
        name="firstname"
        label="Prénom"
        value={form.firstname}
        onChange={handleChange}
      />

      <Input
        name="lastname"
        label="Nom de famille"
        value={form.lastname}
        onChange={handleChange}
        style={{ margin: "24px 0" }}
      />

      <Input
        name="email"
        label="Email"
        value={form.email}
        onChange={handleChange}
      />

      <TextArea
        name="address"
        label="Adresse de livraison"
        value={form.address}
        maxLength={280}
        onChange={handleChange}
        style={{ margin: "24px 0" }}
      />

      <Input
        name="password"
        type="password"
        label="Mot de passe"
        value={form.password}
        onChange={handleChange}
      />

      <Input
        name="confirmPassword"
        type="password"
        label="Confirmez votre mot de passe"
        value={form.confirmPassword}
        onChange={handleChange}
        style={{ marginTop: 24 }}
      />

      <Button
        type="submit"
        color="gradientPurpleGreen"
        isDisable={isDisable}
        // onClick={() => onUpdate(form)}
        style={{ padding: 12, margin: "40px 0 24px", cursor: "pointer" }}
      >
        S'inscrire
      </Button>
    </Container>
  );
};

export default RegisterForm;
