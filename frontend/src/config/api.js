import axios from "axios";
const backendUrl = "http://localhost:5001";

const service = axios.create({
  baseURL: backendUrl,
});

export { service };
