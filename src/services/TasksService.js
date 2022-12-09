import axios from "axios";

export default class TasksService {
 static async createTask(payload) {
  return axios.post("/api/core/tasks", payload);
 }
 static async getTasks() {
  return axios.get("/api/core/tasks");
 }
 static async updateTask(payload) {
  return axios.put(`/api/core/tasks/${payload.id}`, payload);
 }
 static async deleteTask(id) {
  return axios.delete(`/api/core/tasks/${id}`);
 }
}