import axios from "axios";
const BASE_URL = "http://localhost:4000";

export const getProducts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/products`);
    return response.data;
  } catch (error) {
    console.log(error)
  }
};

export const createProduct = async (prdName, barcode, qty, price, cost) => {
  try {
    const response = await axios.post(`${BASE_URL}/products`, {
      name: prdName,
      barcode: barcode,
      qty: qty,
      price: price,
      cost: cost
    });
    return response.data;
  } catch (error) {
    return error.response.data.message;
  }
}

export const editProduct = async (id, name, barcode, qty, price, cost) => {
  try {
    const response = await axios.patch(`${BASE_URL}/products/${id}`, {
      name: name,
      barcode: barcode,
      qty: qty,
      price: price,
      cost: cost,
    });
    return response.data.message;
  } catch (error) {
    if (error.response) {
      return error.response.data.message;
    }
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/users/${id}`);
    return response.data.message;
  } catch (error) {
    if (error.response) {
      return error.response.data.message;
    }
  }
};
