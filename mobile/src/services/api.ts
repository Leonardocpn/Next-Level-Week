import axios from "axios";

const api = axios.create({
  baseURL: "https://aqueous-stream-38599.herokuapp.com",
});

export default api;
