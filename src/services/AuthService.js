import axios from "axios";

export default class AuthService {
  static async createUser(payload) {
    return axios.post("http://146.190.226.226:8000/api/core/users", payload);
  }
  static async authUser(payload) {
   return axios.get("http://146.190.226.226:8000/api/core/users", {
     headers: {
     "Authorization": payload
     }
   });
 }
}
