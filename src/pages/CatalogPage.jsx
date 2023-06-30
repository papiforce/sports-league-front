import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { getItems } from "api/itemsQueries";
import useDebounce from "utils/useDebounce";

import Layout from "./Layouts/Layout";

import Text from "components/atoms/Texts/Text";
import Title from "components/atoms/Texts/Title";
import Input from "components/atoms/Input";
import ItemCard from "components/molecules/ItemCard";

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 116px;
`;

const CatalogPage = () => {
  const navigate = useNavigate();

  const [items, setItems] = useState(null);
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 500);

  const getAllItems = async () => {
    const data = await getItems();

    setItems(data);
  };

  const searchItem = async () => {
    const data = await getItems(`?search=${search}`);

    setItems(data);
  };

  useEffect(() => {
    if (debouncedSearch !== "") {
      searchItem();
    } else {
      getAllItems();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  useEffect(() => {
    getAllItems();
  }, []);

  return (
    <Layout title="Catalogue | Ligue Sportive d'Auvergne">
      {!items ? (
        <Text fontSize="font24" textAlign="center">
          Chargement...
        </Text>
      ) : (
        <>
          <Title
            fontSize="from56to32"
            fontWeight={300}
            textAlign="center"
            style={{ marginBottom: 56 }}
          >
            Catalogue
          </Title>

          <Input
            label="Le nom de votre article"
            value={search}
            onChange={(e) => setSearch(e.value)}
            width="500px"
            style={{ margin: "0 auto 56px" }}
          />

          <Wrapper>
            {items.length > 0 ? (
              items.map((item, idx) => (
                <ItemCard
                  key={idx}
                  name={item.name}
                  posterUrl={item.pictures[0]}
                  price={item.price}
                  onClick={() => navigate(`/catalogue/article/${item._id}`)}
                />
              ))
            ) : (
              <Text fontSize="font18" textAlign="center">
                Aucun article ne correspond à votre recherche
              </Text>
            )}
          </Wrapper>
        </>
      )}
    </Layout>
  );
};

export default CatalogPage;
