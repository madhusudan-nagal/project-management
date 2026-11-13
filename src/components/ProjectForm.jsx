import { useState } from "react";

const inputCss = "w-full px-3 py-2 text-sm border border-gray-300 rounded-xl";
// today's date as "YYYY-MM-DD", in the user's own time zone
const today = new Date().toLocaleDateString("en-CA");

export default function ProjectForm({ project, onSave, onClose }) {
  const [name, setName] = useState(project?.name || "");
  const [description, setDescription] = useState(project?.description || "");
  const [status, setStatus] = useState(project?.status || "Planned");
  const [dueDate, setDueDate] = useState(project?.dueDate || "");
  const [priority, setPriority] = useState(project?.priority || "Low");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ name, description, status, dueDate, priority });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-5 flex flex-col gap-3 bg-white rounded-2xl"
      >
        <h2 className="text-lg font-semibold">
          {project ? "Edit Project" : "Add Project"}
        </h2>

        <label className="text-xs font-semibold">Project Name</label>
        <input
          className={inputCss}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label className="text-xs font-semibold">Description</label>
        <input
          className={inputCss}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label className="text-xs font-semibold">Status</label>
        <select
          className={inputCss}
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option>Planned</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>

        <label className="text-xs font-semibold">Due Date</label>
        <input
          type="date"
          min={today}
          className={inputCss}
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />

        <label className="text-xs font-semibold">Priority</label>
        <select
          className={inputCss}
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <div className="flex justify-end gap-2 mt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1 text-xs border border-gray-300 rounded-xl"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-3 py-1 text-xs text-white bg-black rounded-xl"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
