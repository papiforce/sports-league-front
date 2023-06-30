import { axiosInstance } from "./axiosInstance";

export const createItem = async (form) => {
  try {
    const { data } = await axiosInstance({
      method: "POST",
      url: "/items",
      withCredentials: true,
      data: form,
    });

    return data;
  } catch (err) {
    return err;
  }
};

export const getItems = async (filters) => {
  try {
    const { data } = await axiosInstance({
      method: "GET",
      url: `/items${filters ?? ""}`,
      withCredentials: true,
    });

    return data;
  } catch (err) {
    return err;
  }
};

export const updateItem = async (id, form) => {
  try {
    const { data } = await axiosInstance({
      method: "PUT",
      url: `/items/${id}`,
      withCredentials: true,
      data: form,
    });

    return data;
  } catch (err) {
    return err;
  }
};

export const deleteItem = async (id) => {
  try {
    const { data } = await axiosInstance({
      method: "DELETE",
      url: `/items/${id}`,
      withCredentials: true,
    });

    return data;
  } catch (err) {
    return err;
  }
};
