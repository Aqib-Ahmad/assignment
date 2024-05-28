import axios from 'axios';

const API_URL = 'https://fakestoreapi.com/products';

export const getProducts = () => axios.get(API_URL);
export const createProduct = (product: any) => axios.post(API_URL, product);
export const updateProduct = (id: number, product: any) => axios.put(`${API_URL}/${id}`, product);
export const deleteProduct = (id: number) => axios.delete(`${API_URL}/${id}`);
