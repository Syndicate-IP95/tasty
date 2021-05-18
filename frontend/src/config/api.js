import axios from "axios";
const backendUrl = "https://tasty-nadiya.herokuapp.com/";

const service = axios.create({
  baseURL: backendUrl,
});

export { service };
