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
  postUser(newUser) {
    return apiClient.post("/users", newUser);
  },
  getUsers() {
    return apiClient.get("/users");
  },
  getUser(id) {
    return apiClient.get("/users", id);
  },
  updateUser(user) {
    return apiClient.put("/users", user);
  }
};