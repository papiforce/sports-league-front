import { axiosInstance } from "./axiosInstance";

export const register = async (form) => {
  try {
    const { data } = await axiosInstance({
      method: "POST",
      url: "/auth/signup",
      withCredentials: true,
      data: form,
    });

    return data;
  } catch (error) {
    return error;
  }
};

export const login = async (form) => {
  try {
    const { data } = await axiosInstance({
      method: "POST",
      url: "/auth/signin",
      withCredentials: true,
      data: form,
    });

    return data;
  } catch (error) {
    return error;
  }
};

export const initUser = async () => {
  try {
    const { data } = await axiosInstance({
      method: "GET",
      url: "/auth/current",
      withCredentials: true,
    });

    return data;
  } catch (error) {
    return error.response.data;
  }
};
