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

const Poster = styled.img`
  max-width: 100px;
  width: 100%;
`;

const Wrapper = styled.div`
  gap: 8px;
  display: flex;
  align-items: center;
  gap: 16px;
  cursor: pointer;
`;

const Chevron = styled.img`
  ${({ isOpen }) => `
    transform: ${isOpen ? "rotate(-90deg)" : "rotate(0deg)"};
  `}
  margin-left: auto;
  margin-right: 24px;
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

const AdminItemBarret = ({
  pictures,
  name,
  price,
  description,
  sex,
  category,
  quantity,
  onUpdate,
  onDelete,
  style,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({
    name: name ?? "",
    price: price ?? 1,
    quantity: quantity ?? 0,
    description: description ?? "",
    sex: sex ?? "MIXED",
    category: category ?? "CLOTHE",
    pictures: pictures.join(", ") ?? "",
  });

  const isDisable =
    name === form.name &&
    price === form.price &&
    quantity === form.quantity &&
    description === form.description &&
    sex === form.sex &&
    category === form.category &&
    pictures.join(", ") === form.pictures;

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

  return (
    <Container style={style}>
      <Wrapper onClick={() => setIsOpen((isOpen) => !isOpen)}>
        <Poster src={pictures[0]} alt={name} />

        <div>
          <Text fontSize="font16" fontWeight={400} style={{ marginBottom: 8 }}>
            {name}
          </Text>
          <Text fontSize="font16" fontWeight={400}>
            Stock: {quantity}
          </Text>
        </div>

        <Chevron src={ChevronLeft} alt="chevron" isOpen={isOpen} />
      </Wrapper>

      <FormContainer isOpen={isOpen}>
        <FormWrapper>
          <Input
            name="name"
            label="Nom de l'article"
            value={form.name}
            placeholder={name}
            onChange={handleChange}
          />

          <Input
            name="price"
            label="Prix de l'article (en euros)"
            value={form.price}
            placeholder={price}
            onChange={handleChange}
            style={{ margin: "24px 0" }}
          />

          <Input
            name="quantity"
            label="Stock"
            value={form.quantity}
            placeholder={quantity}
            onChange={handleChange}
          />

          <TagChoice
            label="Type d'article"
            choices={["Vêtement", "Chaussures", "Accessoire"]}
            value={getCategory(form.category)}
            onChange={(value) => {
              setForm({ ...form, category: getReversedCategory(value) });
            }}
            style={{ margin: "24px 0" }}
          />

          <TagChoice
            label="Cible"
            choices={["Homme", "Femme", "Mixte"]}
            value={getSex(form.sex)}
            onChange={(value) =>
              setForm({ ...form, sex: getReversedSex(value) })
            }
          />

          <TextArea
            name="pictures"
            label="Liens des photos"
            value={form.pictures}
            placeholder={pictures.join(", ")}
            maxLength={500}
            onChange={handleChange}
            style={{ margin: "24px 0" }}
          />

          <TextArea
            name="description"
            label="Description de l'article"
            value={form.description}
            placeholder={description}
            maxLength={500}
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

export default AdminItemBarret;
