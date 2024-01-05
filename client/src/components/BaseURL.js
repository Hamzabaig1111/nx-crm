import axios from "axios";

const instance = axios.create({
  baseURL: "https://crm-lms-sever.vercel.app/api",
  withCredentials: true,
});

export default instance;
