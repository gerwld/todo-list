import axios from "axios";

export default class TasksService {
 static async createTask(payload) {
  return axios.post("/api/core/tasks", payload);
 }
 static async getTasks(payload) {
  return axios.get("/api/core/tasks", payload);
 }
 static async updateTask(payload) {
  return axios.put(`/api/core/tasks/${payload.id}`, payload);
 }
 static async deleteTask(payload) {
  return axios.delete(`/api/core/tasks/${payload.id}`);
 }
}