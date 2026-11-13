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
import { getData, sendData } from "../utils/api";
import { useState, useEffect } from "react";




const columns = [
  { key: "name", title: "Project", width: "20%" },
  { key: "description", title: "Description", width: "30%" },
  { key: "dueDate", title: "Due date", width: "15%" },
  { key: "status", title: "Status", width: "15%", className: statusStyle, filterOptions: STATUS },
  { key: "priority", title: "Priority", width: "12%", className: priorityStyle, filterOptions: PRIORITY },
];


export default function ProjectPage() {
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editProject, setEditProject] = useState(null);
  const [deleteProject, setDeleteProject] = useState(null); // project being deleted

  // READ
  const loadProjects = () => {
    getData("projects").then(setProjects);
    console.log("teesting");  
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

  return (
    <div>
      <div className="flex flex-row gap-4 justify-between">
        <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} />
        <Button iconType="add" label="Add Project" onClick={openAdd} />
      </div>

      <Table
        data={filteredProjects}
        columns={columns}
        onEdit={openEdit}
        onDelete={setDeleteProject}
      />

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
