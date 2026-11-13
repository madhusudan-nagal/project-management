import Button from "../components/Button";
import SearchBar from "../components/SearchBar";
import Table from "../components/Table";
import TaskForm from "../components/TaskForm";
import DeletePopup from "../components/DeletePopup";
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

  const [showForm, setShowForm] = useState(false);
  const [editTask, setEditTask] = useState(null); 
  const [deleteTask, setDeleteTask] = useState(null); 

  // READ
  const loadData = () => {
    getData("tasks").then(setTasks);
    getData("projects").then(setProjects);
  };

  useEffect(() => {
    loadData();
  }, []);

  // open the form for adding
  const openAdd = () => {
    setEditTask(null);
    setShowForm(true);
  };

  // open the form for editing
  const openEdit = (task) => {
    setEditTask(task);
    setShowForm(true);
  };

  // CREATE + UPDATE
  const handleSave = async (values) => {
    if (editTask) {
      await sendData(`tasks/${editTask.id}`, "PATCH", values);
    } else {
      await sendData("tasks", "POST", values);
    }
    setShowForm(false);
    loadData();
  };

  // DELETE
  const handleDelete = async () => {
    await sendData(`tasks/${deleteTask.id}`, "DELETE");
    setDeleteTask(null);
    loadData();
  };

  const getProjectName = (id) =>
    projects.find((p) => String(p.id) === String(id))?.name || "Unknown";

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
        <Button iconType="add" label="Add Task" onClick={openAdd} />
      </div>

      <Table
        data={filteredTasks}
        columns={columns}
        onEdit={openEdit}
        onDelete={setDeleteTask}
      />

      {showForm && (
        <TaskForm
          task={editTask}
          projects={projects}
          onSave={handleSave}
          onClose={() => setShowForm(false)}
        />
      )}

      {deleteTask && (
        <DeletePopup
          name={deleteTask.title}
          onConfirm={handleDelete}
          onClose={() => setDeleteTask(null)}
        />
      )}
    </div>
  );
}
