// import axios from "axios";
// console.log("API URL:", import.meta.env.VITE_API_URL);

// const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/recettes";
// console.log("API URL utilisée:", API_URL);

// export const getRecettes = () => axios.get(API_URL);
// export const getRecetteById = (id) => axios.get(`${API_URL}/${id}`);
// export const createRecette = (data) => axios.post(API_URL, data);
// export const updateRecette = (id, data) => axios.put(`${API_URL}/${id}`, data);
// export const deleteRecette = (id) => axios.delete(`${API_URL}/${id}`);

import axios from "axios";

const API_URL = "http://localhost:5000/api/recettes";

export const getRecettes = () => axios.get(API_URL);
export const getRecetteById = (id) => axios.get(`${API_URL}/${id}`);
export const createRecette = (data) => axios.post(API_URL, data);
export const updateRecette = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deleteRecette = (id) => axios.delete(`${API_URL}/${id}`);

