import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { AuthContext } from "contexts/AuthContext";
import { getItems } from "api/itemsQueries";

import Layout from "./Layouts/Layout";

import Text from "components/atoms/Texts/Text";
import ItemGallery from "components/molecules/ItemGallery";
import Title from "components/atoms/Texts/Title";
import Counter from "components/molecules/Counter";
import Button from "components/atoms/Buttons/Button";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  width: max-content;
  margin: 24px auto 0;
`;

const Wrapper = styled.div`
  max-width: 600px;
  width: 100%;
`;

const ItemPage = () => {
  const { id } = useParams();
  const { auth } = useContext(AuthContext);

  const [item, setItem] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [buttonText, setButtonText] = useState("Ajouter au panier");

  const target = (sex) => {
    switch (sex) {
      case "MALE":
        return "Homme";
      case "FEMALE":
        return "Femme";
      default:
        return "Mixte";
    }
  };

  const getItem = async () => {
    const data = await getItems(`?id=${id}`);

    setItem(data[0]);
  };

  const addToCart = async () => {
    if (buttonText === "Ajouté !") return;

    const cart = localStorage.getItem(`cart-${auth.user._id}`);

    setButtonText("Ajouté !");

    if (cart) {
      const parseCart = JSON.parse(cart);
      const { itemsIds } = parseCart;

      const itemInCart = itemsIds.find(
        (subItem) => subItem.itemId === item._id
      );

      if (itemInCart) {
        itemInCart.quantity += quantity;
        itemsIds[itemsIds.indexOf(itemInCart)] = itemInCart;

        const updatedCart = { ...parseCart, itemsIds };

        setQuantity(0);

        return localStorage.setItem(
          `cart-${auth.user._id}`,
          JSON.stringify(updatedCart)
        );
      }

      itemsIds.push({
        itemId: item._id,
        item: item,
        quantity,
        price: item.price,
      });

      const updatedCart = { ...parseCart, itemsIds };

      setQuantity(0);

      return localStorage.setItem(
        `cart-${auth.user._id}`,
        JSON.stringify(updatedCart)
      );
    }

    setQuantity(0);

    return localStorage.setItem(
      `cart-${auth.user._id}`,
      JSON.stringify({
        userId: auth.user._id,
        itemsIds: [
          { itemId: item._id, item: item, quantity, price: item.price },
        ],
        address: auth.user.address ?? "",
        duration: 1,
      })
    );
  };

  useEffect(() => {
    getItem();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setButtonText("Ajouter au panier");
    }, 2000);
    return () => clearTimeout(timer);
  }, [buttonText]);

  if (!item)
    return (
      <>
        <Text fontSize="font24" textAlign="center">
          Chargement...
        </Text>
      </>
    );

  return (
    <Layout title={`${item.name} | Ligue Sportive d'Auvergne`}>
      <Container>
        <ItemGallery pictures={item.pictures} />

        <Wrapper>
          <Title fontSize="from40to24" fontWeight={400}>
            {item.name}
          </Title>
          <Text fontFamily="Space Grotesk" style={{ margin: "24px 0" }}>
            {item.description}
          </Text>
          <Text fontFamily="Space Grotesk">Cible : {target(item.sex)}</Text>
          <Text fontFamily="Space Grotesk" style={{ margin: "24px 0 40px" }}>
            Prix à la location : {item.price}€ / jour
          </Text>

          {auth.isAuthenticated && (
            <>
              {item.quantity > 0 && (
                <Counter
                  value={quantity}
                  maxValue={item.quantity}
                  onValueChange={(val) => setQuantity(val)}
                  style={{ margin: "0 auto 24px" }}
                />
              )}

              <Button
                color="gradientPurpleGreen"
                onClick={item.quantity === 0 ? () => {} : addToCart}
                isDisable={item.quantity === 0 || quantity === 0}
                style={{ padding: 12 }}
              >
                {item.quantity === 0 ? "Rupture de stock" : buttonText}
              </Button>
            </>
          )}
        </Wrapper>
      </Container>
    </Layout>
  );
};

export default ItemPage;
