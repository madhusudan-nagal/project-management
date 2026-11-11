import Button from "../components/Button";
import SearchBar from "../components/SearchBar";
import Table from "../components/Table";
import Popup from "../components/Popup";
import { statusStyle, priorityStyle, STATUS, PRIORITY } from "../utils/badgeStyles";
import { getData, sendData } from "../utils/api";
import { useState, useEffect } from "react";

const projectFields = [
  { name: "name", label: "Project Name", required: true },
  { name: "description", label: "Description" },
  { name: "status", label: "Status", type: "select", options: STATUS, required: true },
  { name: "dueDate", label: "Due Date", type: "date", required: true },
  { name: "priority", label: "Priority", type: "select", options: PRIORITY, required: true },
];

const columns = [
  { key: "name", title: "Project" },
  { key: "description", title: "Description" },
  { key: "dueDate", title: "Due date" },
  { key: "status", title: "Status", className: statusStyle, filterOptions: STATUS },
  { key: "priority", title: "Priority", className: priorityStyle, filterOptions: PRIORITY },
];

export default function ProjectPage() {
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState({ type: null, item: null });

  const open = (type, item = null) => setModal({ type, item }); // open(null) closes

  const loadProjects = () =>
    getData("projects").then(setProjects).catch(() => alert("Could not load projects. Is json-server running?"));

  useEffect(() => {
    loadProjects();
  }, []);

  const handleSave = async (values) => {
    if (modal.type === "edit") await sendData(`projects/${modal.item.id}`, "PATCH", values);
    else await sendData("projects", "POST", { ...values, progress: 0, createdAt: new Date().toISOString() });
    open(null);
    loadProjects();
  };

  const handleDelete = async () => {
    await sendData(`projects/${modal.item.id}`, "DELETE");
    open(null);
    loadProjects();
  };

  const filteredProjects = projects.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <div className="flex flex-row gap-4 justify-between">
        <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} />
        <Button iconType="add" label="Add Project" onClick={() => open("add")} />
      </div>

      <Table
        data={filteredProjects}
        columns={columns}
        onEdit={(row) => open("edit", row)}
        onDelete={(row) => open("delete", row)}
      />

      <Popup
        key={modal.item?.id || modal.type || "closed"}
        mode={modal.type}
        item={modal.item}
        fields={projectFields}
        title="Project"
        onSave={handleSave}
        onDelete={handleDelete}
        onClose={() => open(null)}
      />
    </div>
  );
}