import { axiosInstance } from "./axiosInstance";

export const getUsers = async (filters) => {
  try {
    const { data } = await axiosInstance({
      method: "GET",
      url: `/users${filters ?? ""}`,
      withCredentials: true,
    });

    return data;
  } catch (err) {
    return err;
  }
};

export const updateProfile = async (id, userData) => {
  try {
    const { data } = await axiosInstance({
      method: "PUT",
      url: `/users/update/${id}`,
      withCredentials: true,
      data: userData,
    });

    return data;
  } catch (err) {
    return err;
  }
};

export const removeUsers = async (ids) => {
  try {
    const { data } = await axiosInstance({
      method: "DELETE",
      url: "/users",
      withCredentials: true,
      data: { ids: ids },
    });

    return data;
  } catch (err) {
    return err;
  }
};
