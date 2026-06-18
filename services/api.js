import axios from "axios";

// BASE URL (backend)
const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

// LOGIN API
export const loginUser = (data) => {
  return API.post("/login", data);
};