import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Cookies from "js-cookie";

import { login } from "api/authQueries";
import { AuthContext } from "contexts/AuthContext";

import Title from "components/atoms/Texts/Title";
import Input from "components/atoms/Input";
import Text from "components/atoms/Texts/Text";
import Link from "components/atoms/Texts/Link";
import Button from "components/atoms/Buttons/Button";

const Container = styled.form`
  ${({ theme: { colors } }) => `
    background: ${colors.greyDark};
  `}
  margin: 56px auto 0;
  max-width: 500px;
  border-radius: 16px;
  padding: 24px;

  @media (max-width: 532px) {
    margin: 56px 16px 0;
  }
`;

const CustomTextLink = styled(Text)`
  ${({ theme: { colors } }) => `
    :hover {
      color: ${colors.purple};
    }
  `}
  cursor: pointer;
  text-decoration: underline;
  max-width: max-content;
  margin: 32px auto 0;
`;

const LoginForm = () => {
  const { setAuth } = useContext(AuthContext);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    if (error !== "") {
      setError("");
    }

    setForm({ ...form, [e.name]: e.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = await login(form);

      if (!data) {
        Cookies.remove("lsa-token");
        return setAuth({ isAuthenticated: false, user: null });
      }

      Cookies.set("lsa-token", data.token, { expires: 31 });
      setAuth({ isAuthenticated: true, user: data.user });

      return navigate("/");
    } catch (err) {
      console.error(err);

      Cookies.remove("lsa-token");
      setAuth({ isAuthenticated: false, user: null });
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
        Connexion
      </Title>
      <Input
        name="email"
        label="Email"
        value={form.email}
        onChange={handleChange}
        isError={error}
        style={{ marginBottom: 24 }}
      />
      <Input
        name="password"
        label="Mot de passe"
        type="password"
        value={form.password}
        onChange={handleChange}
        isError={error}
        errorMessage={error}
        style={{ marginBottom: 24 }}
      />

      <Button type="submit" style={{ padding: 12, cursor: "pointer" }}>
        Se connecter
      </Button>

      <CustomTextLink fontSize="font14">
        <Link href="/inscription">
          Vous souhaitez vous inscrire? Cliquez ici !
        </Link>
      </CustomTextLink>
    </Container>
  );
};

export default LoginForm;
