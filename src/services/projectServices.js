import projectsData from "../data/projects.json";
import { loadData } from "./storage";
import { mockRequest, createId, today } from "./mockAPI";
import { STORAGE_KEYS } from "../utils/constants";

export function getProjects() {
  return mockRequest(loadData(STORAGE_KEYS.projects, projectsData));
}

export function createProject(data) {
  const project = { ...data, id: createId("P"), createdAt: today() };
  return mockRequest(project, { canFail: true });
}

export function updateProject(project) {
  return mockRequest(project, { canFail: true });
}

export function deleteProject(id) {
  return mockRequest(id, { canFail: true });
}