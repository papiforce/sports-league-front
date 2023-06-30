import { useEffect, useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";

import { AuthContext } from "contexts/AuthContext";
import { createOrder } from "api/ordersQueries";
import { getItems, updateItem, deleteItem } from "api/itemsQueries";
import { getUsers, updateProfile, removeUsers } from "api/userQueries";
import { slugify } from "utils/slug";
import useWindowSize from "utils/useWindowSize";
import useDebounce from "utils/useDebounce";

import Layout from "./Layouts/Layout";

import ProfileInfos from "components/organisms/ProfileInfos";
import TabSelector from "components/molecules/TabSelector";
import Text from "components/atoms/Texts/Text";
import CartDisplayer from "components/organisms/CartDisplayer";
import ItemsDisplayer from "components/organisms/ItemsDisplayer";
import ItemForm from "components/organisms/Forms/ItemForm";
import UsersDisplayer from "components/organisms/UsersDisplayer";
import Input from "components/atoms/Input";
import Button from "components/atoms/Buttons/Button";

const Container = styled.div`
  ${({ theme: { screens } }) => `
    max-width: ${screens.desktop}px;
  `}
  display: flex;
  flex-wrap: wrap;
  gap: 32px 48px;
  width: 100%;
  margin: 40px auto 112px;
  padding: 0 16px;

  @media (max-width: 1280px) {
    justify-content: center;
  }
`;

const EmptyText = styled(Text)`
  ${({ theme: { colors } }) => `
    background: ${colors.greyDark};
  `}
  padding: 16px;
  border-radius: 8px;
`;

const ProfilePage = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const { userId } = useParams();
  const { isMobile } = useWindowSize();
  const navigate = useNavigate();

  const queryParameters = new URLSearchParams(window.location.search);
  const tab = queryParameters.get("tab");

  const [user, setUser] = useState(null);
  const [order, setOrder] = useState(
    auth && auth.user
      ? JSON.parse(localStorage.getItem(`cart-${auth.user._id}`))
      : null
  );
  const [cart, setCart] = useState(
    auth && auth.user
      ? JSON.parse(localStorage.getItem(`cart-${auth.user._id}`))?.itemsIds
      : null
  );
  const [items, setItems] = useState(null);
  const [users, setUsers] = useState(null);
  const [usersToDelete, setUsersToDelete] = useState([]);
  const [searchUser, setSearchUser] = useState("");

  const debouncedSearch = useDebounce(searchUser, 500);

  const TabsItems = [
    "Panier",
    "Commandes",
    ...(auth && auth.user && auth.user.roles.includes("ADMIN")
      ? ["Articles", "Utilisateurs"]
      : []),
  ];

  const handleTabClick = (tab) => {
    getAllItems();
    getAllUsers();

    navigate(`/profil/${userId}?tab=${slugify(tab)}`);
  };

  const generateOrder = async () => {
    try {
      await createOrder({
        userId: auth.user._id,
        itemsIds: order.itemsIds.map((item) => ({
          itemId: item.itemId,
          quantity: item.quantity,
          price: item.price * item.quantity * order.duration,
        })),
        duration: order.duration,
        address: order.address,
      });

      setCart([]);
      setOrder([]);
      localStorage.removeItem(`cart-${auth.user._id}`);
    } catch (err) {
      console.error(err);
    }
  };

  const getAllItems = async () => {
    try {
      const data = await getItems();

      setItems(data);
    } catch (err) {
      console.error(err);
    }
  };

  const changeItem = async (id, form) => {
    try {
      await updateItem(id, { ...form, pictures: form.pictures.split(", ") });

      getAllItems();
    } catch (err) {
      console.error(err);
    }
  };

  const removeItem = async (id) => {
    try {
      await deleteItem(id);

      getAllItems();
    } catch (err) {
      console.error(err);
    }
  };

  const getAllUsers = async () => {
    try {
      const data = await getUsers();

      setUsers(data);
    } catch (err) {
      console.error(err);
    }
  };

  const selectUser = (id) => {
    if (usersToDelete) {
      const isSelected = usersToDelete.find((userId) => userId === id);

      if (isSelected) {
        return setUsersToDelete(
          usersToDelete.filter((userId) => userId !== id)
        );
      }

      return setUsersToDelete([...usersToDelete, id]);
    }

    return setUsersToDelete([...usersToDelete, id]);
  };

  const changeUser = async (id, form) => {
    try {
      const updatedUser = await updateProfile(id, form);

      if (id === auth.user._id) {
        setAuth({ ...auth, user: updatedUser });
      }

      getAllUsers();
    } catch (err) {
      console.error(err);
    }
  };

  const foundUser = async () => {
    try {
      const data = await getUsers(`?search=${searchUser}`);

      setUsers(data);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteUsers = async (ids) => {
    try {
      await removeUsers([ids]);

      getAllUsers();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (debouncedSearch !== "") {
      foundUser();
    } else {
      getAllUsers();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  useEffect(() => {
    getAllItems();
    getAllUsers();
  }, []);

  useEffect(() => {
    if (auth && auth.user && userId === auth.user._id) {
      return setUser(auth.user);
    }

    if (auth && auth.user && userId !== auth.user._id) {
      return navigate(`/profil/${auth.user._id}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth, userId]);

  if (!user) {
    return (
      <Text fontSize="font24" textAlign="center">
        Chargement...
      </Text>
    );
  }

  const tabDisplayer = () => {
    switch (tab) {
      case "commandes":
        return (
          <EmptyText fontSize="font16" textAlign="center">
            Vous avez aucune commande
          </EmptyText>
        );
      case "articles":
        return (
          <>
            {!items || items.length === 0 ? (
              <EmptyText fontSize="font16" textAlign="center">
                Il n'y a aucun article
              </EmptyText>
            ) : (
              <>
                <ItemForm onAdd={getAllItems} />
                <ItemsDisplayer
                  items={items}
                  onUpdate={changeItem}
                  onDelete={removeItem}
                />
              </>
            )}
          </>
        );
      case "utilisateurs":
        return (
          <>
            {!users ? (
              <EmptyText fontSize="font16" textAlign="center">
                Il n'y a aucun utilisateur
              </EmptyText>
            ) : (
              <>
                <Input
                  label="Rechercher un utilisateur"
                  value={searchUser}
                  onChange={(e) => setSearchUser(e.value)}
                  style={{ margin: "0 auto 40px" }}
                />

                {users.length > 0 ? (
                  <UsersDisplayer
                    users={users}
                    onSelect={selectUser}
                    onUpdate={changeUser}
                    onDelete={deleteUsers}
                  />
                ) : (
                  <EmptyText fontSize="font16" textAlign="center">
                    Il n'y a aucun utilisateur correspondant
                  </EmptyText>
                )}

                {usersToDelete.length > 0 && (
                  <Button
                    color="red"
                    width="50%"
                    onClick={() => {
                      deleteUsers(usersToDelete);
                      setUsersToDelete([]);
                    }}
                    style={{ padding: 12, margin: "32px auto 0" }}
                  >
                    Supprimer
                  </Button>
                )}
              </>
            )}
          </>
        );
      default:
        return (
          <>
            {!cart || cart.length === 0 ? (
              <EmptyText fontSize="font16" textAlign="center">
                Vous avez aucun article dans votre panier
              </EmptyText>
            ) : (
              <CartDisplayer
                order={order}
                cart={cart}
                onItemValueChange={(val, item, idx) => {
                  if (val === 0) {
                    const cartUpdated = cart.filter(
                      (subItem) => subItem.itemId !== item._id
                    );

                    setCart(cartUpdated.length === 0 ? [] : cartUpdated);
                    setOrder({ ...order, itemsIds: cartUpdated });

                    return localStorage.setItem(
                      `cart-${auth.user._id}`,
                      JSON.stringify({ ...order, itemsIds: cartUpdated })
                    );
                  }

                  cart[idx].quantity = val;

                  Object.assign(cart[idx], {
                    quantity: val,
                  });

                  const cartUpdated = cart;
                  setCart(cartUpdated);
                  setOrder({ ...order, itemsIds: cartUpdated });

                  localStorage.setItem(
                    `cart-${auth.user._id}`,
                    JSON.stringify({ ...order, itemsIds: cartUpdated })
                  );
                }}
                onCounterChange={(val) => {
                  const newOrder = { ...order, duration: val };
                  setOrder({ ...order, duration: val });

                  localStorage.setItem(
                    `cart-${auth.user._id}`,
                    JSON.stringify(newOrder)
                  );
                }}
                onPay={generateOrder}
              />
            )}
          </>
        );
    }
  };

  console.log(usersToDelete);

  return (
    <Layout
      title={`Profil de ${user.firstname} ${user.lastname} | Ligue Sportive d'Auvergne`}
    >
      {!user ? (
        <Text fontSize="font24" textAlign="center">
          Chargement...
        </Text>
      ) : (
        <Container>
          <ProfileInfos user={user} />

          <div style={{ width: "100%", maxWidth: 800 }}>
            <TabSelector
              items={TabsItems}
              activeItem={tab}
              onClick={handleTabClick}
              style={{
                margin: isMobile ? "0 auto 16px" : "0 0 24px",
              }}
            />

            {tabDisplayer(tab)}
          </div>
        </Container>
      )}
    </Layout>
  );
};

export default ProfilePage;
