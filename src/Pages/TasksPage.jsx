import Button from "../components/Button";
import SearchBar from "../components/SearchBar";
import Table from "../components/Table";
import Popup from "../components/Popup";
import {
  statusStyle,
  priorityStyle,
  STATUS,
  PRIORITY,
} from "../utils/badgeStyles";
import { getData, sendData } from "../utils/api";
import { useState, useEffect } from "react";

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState({ type: null, item: null });

  const open = (type, item = null) => setModal({ type, item }); // open(null) closes

  const loadData = () => {
    getData("tasks")
      .then(setTasks)
      .catch(() => alert("Could not load tasks. Is json-server running?"));
    getData("projects").then(setProjects);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSave = async (values) => {
    if (modal.type === "edit")
      await sendData(`tasks/${modal.item.id}`, "PATCH", values);
    else
      await sendData("tasks", "POST", {
        ...values,
        createdAt: new Date().toISOString(),
      });
    open(null);
    loadData();
  };

  const handleDelete = async () => {
    await sendData(`tasks/${modal.item.id}`, "DELETE");
    open(null);
    loadData();
  };

  const getProjectName = (id) =>
    projects.find((p) => String(p.id) === String(id))?.name || "Unknown";

  // inside the component because they use the loaded projects
  const taskFields = [
    { name: "title", label: "Task Title", required: true },
    {
      name: "projectId",
      label: "Project",
      type: "select",
      options: projects.map((p) => ({ value: p.id, label: p.name })),
      required: true,
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      options: STATUS,
      required: true,
    },
    { name: "dueDate", label: "Due Date", type: "date", required: true },
    { name: "assignee", label: "Assignee" },
    {
      name: "priority",
      label: "Priority",
      type: "select",
      options: PRIORITY,
      required: true,
    },
  ];

  const columns = [
    { key: "title", title: "Task" },
    {
      key: "projectId",
      title: "Project",
      render: (row) => getProjectName(row.projectId),
    },
    { key: "dueDate", title: "Due date" },
    {
      key: "status",
      title: "Status",
      className: statusStyle,
      filterOptions: STATUS,
    },
    {
      key: "priority",
      title: "Priority",
      className: priorityStyle,
      filterOptions: PRIORITY,
    },
  ];

  const filteredTasks = tasks.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div>
      <div className="flex flex-row gap-4 justify-between">
        <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} />
        <Button iconType="add" label="Add Task" onClick={() => open("add")} />
      </div>

      <Table
        data={filteredTasks}
        columns={columns}
        onEdit={(row) => open("edit", row)}
        onDelete={(row) => open("delete", row)}
      />

      <Popup
        key={modal.item?.id || modal.type || "closed"}
        mode={modal.type}
        item={modal.item}
        fields={taskFields}
        title="Task"
        onSave={handleSave}
        onDelete={handleDelete}
        onClose={() => open(null)}
      />
    </div>
  );
}
