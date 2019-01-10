import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});

export default {
  postUser(user) {
    return apiClient.post("/account/register", user);
  },
  putUser(id, user) {
    return apiClient.put(`/profile/${id}`, user);
  },
  getUserByEmail(email) {
    return apiClient.get(`/login/${email}`);
  }
};
