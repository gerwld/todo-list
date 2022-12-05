import axios from "axios";

export default class AuthService {
 static async createUser(payload) {
  return axios.post("/api/core/users", payload);
 }
 static async authUser(payload) {
  return axios.post("/api/core/auth/basic/token", payload);
 }
 static async getCurrentUser(payload) {
  return axios.get("/api/core/users/current", {
    headers: { Authorization: `Bearer ${payload}` }
  });
 }
}
