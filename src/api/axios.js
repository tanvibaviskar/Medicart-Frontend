import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080", // Spring Boot backend
});

// Add token from localStorage if available
const token = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user")).token
  : null;

if (token) {
  instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export default instance;
