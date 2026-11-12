import seed from "../../db.json"; // starting data (sirf pehli baar use hota hai)

// localStorage
const read = (name) =>
  JSON.parse(localStorage.getItem(name)) || seed[name] || [];

const write = (name, list) => localStorage.setItem(name, JSON.stringify(list));

// READ: newest record sabse upar
export const getData = async (path) =>
  [...read(path)].sort((a, b) =>
    (b.createdAt || "").localeCompare(a.createdAt || ""),
  );

// CREATE / UPDATE / DELETE
export const sendData = async (path, method, body) => {
  const [name, id] = path.split("/"); // "projects/5" → ["projects", "5"]
  const list = read(name);

  if (method === "POST")
    write(name, [...list, { ...body, id: Date.now().toString() }]);
  if (method === "PATCH")
    write(
      name,
      list.map((i) => (String(i.id) === id ? { ...i, ...body } : i)),
    );
  if (method === "DELETE")
    write(
      name,
      list.filter((i) => String(i.id) !== id),
    );
};
