import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:9090",
  headers: {
    "Content-Type": "application/json",
  },
});

/* ============================
   REQUEST INTERCEPTOR
   ============================ */
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* ============================
   RESPONSE INTERCEPTOR
   ============================ */
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;

    // 🔐 JWT expired / invalid / forbidden
    if (status === 401 || status === 403) {
      localStorage.clear();

      // ❌ avoid infinite redirect loop
      if (!window.location.pathname.includes("/login")) {
        window.location.href = "/login";
      }
    }

    // 🌐 Network / server down case
    if (!error.response) {
      console.error("Network error or server not reachable");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
