import axios from "axios";
<<<<<<< HEAD
const backendUrl = "https://tasty-nadiya.herokuapp.com/";
=======
const backendUrl = "http://127.0.0.1:5000";
>>>>>>> 56599fe4cebc99a02aaa87dd6c94f8baf0638a13

const service = axios.create({
  baseURL: backendUrl,
});

export { service };
