import { useState, useContext } from "react";
import styled from "styled-components";

import { AuthContext } from "contexts/AuthContext";
import { updateProfile } from "api/userQueries";

import Input from "components/atoms/Input";
import Button from "components/atoms/Buttons/Button";
import TextArea from "components/atoms/TextArea";

const Container = styled.form`
  ${({ theme: { colors } }) => `
    background: ${colors.greyDark};
  `}
  padding: 24px;
  border-radius: 16px;
`;

const SettingsForm = () => {
  const { auth, setAuth } = useContext(AuthContext);

  const [form, setForm] = useState({
    firstname: auth && auth.user ? auth.user.firstname : "",
    lastname: auth && auth.user ? auth.user.lastname : "",
    email: auth && auth.user ? auth.user.email : "",
    address: auth && auth.user ? auth.user.address : "",
  });

  const handleChange = (target) => {
    setForm({ ...form, [target.name]: target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = await updateProfile(auth.user._id, form);

      setAuth({ ...auth, user: data });
    } catch (err) {
      console.error(err);
    }
  };

  const isDisableBtn =
    form.firstname === auth.user.firstname &&
    form.lastname === auth.user.lastname &&
    form.email === auth.user.email &&
    form.description === auth.user.description &&
    form.address === auth.user.address;

  return (
    <Container autoComplete="new-password" onSubmit={handleSubmit}>
      <Input
        name="firstname"
        label="Votre prénom"
        value={form.firstname}
        onChange={handleChange}
      />
      <Input
        name="lastname"
        label="Votre nom de famille"
        value={form.lastname}
        onChange={handleChange}
        style={{ marginTop: 16 }}
      />
      <Input
        name="email"
        label="Votre adresse mail"
        value={form.email}
        onChange={handleChange}
        style={{ margin: "16px 0 24px" }}
      />
      <TextArea
        name="address"
        label="Votre adresse de livraison"
        value={form.address}
        onChange={handleChange}
      />
      <Button
        type="submit"
        isDisable={isDisableBtn}
        style={{ marginTop: 32, padding: 12, cursor: "pointer" }}
      >
        Modifier
      </Button>
    </Container>
  );
};

export default SettingsForm;
