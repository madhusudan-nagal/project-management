import tasksData from "../data/tasks.json";
import { loadData } from "./storage";
import { mockRequest, createId, today } from "./mockAPI";
import { STORAGE_KEYS } from "../utils/constants";

export function getTasks() {
  return mockRequest(loadData(STORAGE_KEYS.tasks, tasksData));
}

export function createTask(data) {
  const task = { ...data, id: createId("T"), createdAt: today() };
  return mockRequest(task, { canFail: true });
}

export function updateTask(task) {
  return mockRequest(task, { canFail: true });
}

export function deleteTask(id) {
  return mockRequest(id, { canFail: true });
}
