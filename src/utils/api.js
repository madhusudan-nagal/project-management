
// Get a list from localStorage 
function read(name) {
  const saved = localStorage.getItem(name);
  if (saved) return JSON.parse(saved);
 return [];
}

// Save a list into localStorage
function write(name, list) {
  localStorage.setItem(name, JSON.stringify(list));
}

//READ
export async function getData(name) {
  return read(name);
}

// CREATE, UPDATE, DELETE


export async function sendData(path, method, body) {
  const [name, id] = path.split("/"); 
  let list = read(name);

  if (method === "POST") {
    const newItem = { ...body, id: crypto.randomUUID() };
    list = [newItem, ...list]; 
  }

  if (method === "PATCH") {
    list = list.map((item) => (String(item.id) === id ? { ...item, ...body } : item));
  }

  if (method === "DELETE") {
    list = list.filter((item) => String(item.id) !== id);
  }

  write(name, list);
}