import { axiosInstance } from "./axiosInstance";

export const createOrder = async (form) => {
  try {
    const { data } = await axiosInstance({
      method: "POST",
      url: "/orders/",
      withCredentials: true,
      data: form,
    });

    return data;
  } catch (err) {
    return err;
  }
};
