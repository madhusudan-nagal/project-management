const API = "http://localhost:3001";

// GET a list, newest records first
export const getData = (path) =>
  fetch(`${API}/${path}`)
    .then((res) => res.json())
    .then((list) => list.sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || "")));

// POST / PATCH / DELETE
export const sendData = (path, method, body) =>
  fetch(`${API}/${path}`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body && JSON.stringify(body),
  });