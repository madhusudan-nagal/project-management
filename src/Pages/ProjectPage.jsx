import Button from "../components/Button";
import SearchBar from "../components/SearchBar";
import Table from "../components/Table";
import ProjectForm from "../components/ProjectForm";
import DeletePopup from "../components/DeletePopup";
import {
  statusStyle,
  priorityStyle,
  STATUS,
  PRIORITY,
} from "../utils/badgeStyles";
import { IoGridOutline, IoListOutline } from "react-icons/io5";
import DataCards from "../components/DataCard";
import { getData, sendData } from "../utils/api";
import { useState, useEffect } from "react";

const columns = [
  { key: "name", title: "Project", width: "20%" },
  { key: "description", title: "Description", width: "30%" },
  { key: "dueDate", title: "Due date", width: "15%" },
  {
    key: "status",
    title: "Status",
    width: "15%",
    className: statusStyle,
    filterOptions: STATUS,
  },
  {
    key: "priority",
    title: "Priority",
    width: "12%",
    className: priorityStyle,
    filterOptions: PRIORITY,
  },
];

export default function ProjectPage() {
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");
  const [view, setView] = useState("cards");

  const [showForm, setShowForm] = useState(false);
  const [editProject, setEditProject] = useState(null);
  const [deleteProject, setDeleteProject] = useState(null); // project being deleted

  // READ
  const loadProjects = () => {
    getData("projects").then(setProjects);
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const openAdd = () => {
    setEditProject(null);
    setShowForm(true);
  };

  const openEdit = (project) => {
    setEditProject(project);
    setShowForm(true);
  };

  // CREATE + UPDATE
  const handleSave = async (values) => {
    if (editProject) {
      await sendData(`projects/${editProject.id}`, "PATCH", values);
    } else {
      await sendData("projects", "POST", { ...values, progress: 0 });
    }
    setShowForm(false);
    loadProjects();
  };

  // DELETE
  const handleDelete = async () => {
    await sendData(`projects/${deleteProject.id}`, "DELETE");
    setDeleteProject(null);
    loadProjects();
  };

  const filteredProjects = projects.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );

  const switchBtn = (active) =>
    `flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm ${
      active ? "bg-gray-900 text-white" : "text-gray-600 hover:bg-gray-100"
    }`;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row gap-4 justify-between items-center">
        <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} />
        <div className="flex gap-2 items-center">
          <div className="flex gap-1 p-1 border border-gray-300 rounded-xl">
            <button
              type="button"
              onClick={() => setView("cards")}
              className={switchBtn(view === "cards")}
            >
              <IoGridOutline /> Cards
            </button>

            <button
              type="button"
              onClick={() => setView("table")}
              className={switchBtn(view === "table")}
            >
              <IoListOutline /> Table
            </button>
          </div>
          <Button iconType="add" label="Add Project" onClick={openAdd} />
        </div>
      </div>

      {view === "cards" ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <DataCards
              key={project.id}
              title={project.name}
              description={project.description}
              onEdit={() => openEdit(project)}
              onDelete={() => setDeleteProject(project)}
            >
              <div className="flex justify-between text-xs text-gray-500">
                <span>
                  {project.status} · {project.priority}
                </span>
                <span>Due {project.dueDate}</span>
              </div>
            </DataCards>
          ))}
        </div>
      ) : (
        <Table
          data={filteredProjects}
          columns={columns}
          onEdit={openEdit}
          onDelete={setDeleteProject}
        />
      )}

      {showForm && (
        <ProjectForm
          project={editProject}
          onSave={handleSave}
          onClose={() => setShowForm(false)}
        />
      )}

      {deleteProject && (
        <DeletePopup
          name={deleteProject.name}
          onConfirm={handleDelete}
          onClose={() => setDeleteProject(null)}
        />
      )}
    </div>
  );
}
