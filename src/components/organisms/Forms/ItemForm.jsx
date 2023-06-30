import { useState } from "react";
import styled from "styled-components";

import { createItem } from "api/itemsQueries";

import Input from "components/atoms/Input";
import TagChoice from "components/molecules/TagChoice";
import TextArea from "components/atoms/TextArea";
import Button from "components/atoms/Buttons/Button";

const Container = styled.form`
  ${({ theme: { colors } }) => `
    background: ${colors.greyDark};
  `}
  padding: 24px;
  border-radius: 16px;
  margin-bottom: 24px;
`;

const ItemForm = ({ onAdd }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    price: 1,
    quantity: 0,
    description: "",
    sex: "MIXED",
    category: "CLOTHE",
    pictures: "",
  });

  const isDisable =
    "" === form.name &&
    1 === form.price &&
    0 === form.quantity &&
    "" === form.description &&
    "MIXED" === form.sex &&
    "CLOTHE" === form.category &&
    "" === form.pictures;

  const handleChange = (e) => {
    setForm({ ...form, [e.name]: e.value });
  };

  const getCategory = (category) => {
    switch (category) {
      case "SHOE":
        return "Chaussures";
      case "ACCESSORY":
        return "Accessoire";
      default:
        return "Vêtement";
    }
  };

  const getReversedCategory = (category) => {
    switch (category) {
      case "Chaussures":
        return "SHOE";
      case "Accessoire":
        return "ACCESSORY";
      default:
        return "CLOTHE";
    }
  };

  const getSex = (sex) => {
    switch (sex) {
      case "MALE":
        return "Homme";
      case "FEMALE":
        return "Femme";
      default:
        return "Mixte";
    }
  };

  const getReversedSex = (sex) => {
    switch (sex) {
      case "Homme":
        return "MALE";
      case "Femme":
        return "FEMALE";
      default:
        return "MIXED";
    }
  };

  const addItem = async () => {
    try {
      await createItem({ ...form, pictures: form.pictures.split(", ") });

      setIsOpen(false);
      setForm({
        name: "",
        price: 1,
        quantity: 0,
        description: "",
        sex: "MIXED",
        category: "CLOTHE",
        pictures: "",
      });

      onAdd();
    } catch (err) {
      console.error(err);
    }
  };

  return isOpen ? (
    <Container>
      <Input
        name="name"
        label="Nom de l'article"
        value={form.name}
        onChange={handleChange}
      />

      <Input
        name="price"
        label="Prix de l'article (en euros)"
        value={form.price}
        onChange={handleChange}
        style={{ margin: "24px 0" }}
      />

      <Input
        name="quantity"
        label="Stock"
        value={form.quantity}
        onChange={handleChange}
      />

      <TagChoice
        label="Type d'article"
        choices={["Vêtement", "Chaussures", "Accessoire"]}
        value={getCategory(form.category)}
        onChange={(value) =>
          setForm({ ...form, category: getReversedCategory(value) })
        }
        style={{ margin: "24px 0" }}
      />

      <TagChoice
        label="Cible"
        choices={["Homme", "Femme", "Mixte"]}
        value={getSex(form.sex)}
        onChange={(value) => setForm({ ...form, sex: getReversedSex(value) })}
      />

      <TextArea
        name="pictures"
        label="Liens des photos"
        value={form.pictures}
        maxLength={500}
        onChange={handleChange}
        style={{ margin: "24px 0" }}
      />

      <TextArea
        name="description"
        label="Description de l'article"
        value={form.description}
        maxLength={500}
        onChange={handleChange}
      />

      <Button
        color="gradientPurpleGreen"
        isDisable={isDisable}
        onClick={addItem}
        style={{ padding: 12, margin: "40px auto 24px" }}
      >
        Ajouter
      </Button>

      <Button
        color="transparent"
        onClick={() => setIsOpen(false)}
        style={{ padding: 10, margin: "0 auto" }}
      >
        Annuler
      </Button>
    </Container>
  ) : (
    <Button
      width="50%"
      onClick={() => setIsOpen(true)}
      style={{ padding: 10, margin: "0 auto 24px" }}
    >
      Ajouter un article
    </Button>
  );
};

export default ItemForm;
