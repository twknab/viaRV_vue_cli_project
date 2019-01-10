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
    return apiClient.post("/users", user);
  },
  putUser(id, user) {
    return apiClient.put(`/users/${id}`, user);
  },
  getUsers() {
    return apiClient.get("/users");
  },
  getUserByEmail(email) {
    return apiClient.get(`/users?email=${email}`);
  }
};
