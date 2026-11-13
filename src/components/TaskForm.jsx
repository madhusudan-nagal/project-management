import { useState } from "react";

const inputCss = "w-full px-3 py-2 text-sm border border-gray-300 rounded-xl";
const today = new Date().toLocaleDateString("en-CA");

export default function TaskForm({ task, projects, onSave, onClose }) {
  const [title, setTitle] = useState(task?.title || "");
  const [projectId, setProjectId] = useState(task?.projectId || "");
  const [status, setStatus] = useState(task?.status || "Planned");
  const [dueDate, setDueDate] = useState(task?.dueDate || "");
  const [assignee, setAssignee] = useState(task?.assignee || "");
  const [priority, setPriority] = useState(task?.priority || "Low");

  const handleSubmit = (e) => {
    e.preventDefault(); // stop the page from reloading
    onSave({ title, projectId, status, dueDate, assignee, priority });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-5 flex flex-col gap-3 bg-white rounded-2xl"
      >
        <h2 className="text-lg font-semibold">
          {task ? "Edit Task" : "Add Task"}
        </h2>

        <label className="text-xs font-semibold">Task Title</label>
        <input
          className={inputCss}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label className="text-xs font-semibold">Project</label>
        <select
          className={inputCss}
          value={projectId}
          onChange={(e) => setProjectId(e.target.value)}
          required
        >
          <option value="">Select project...</option>
          {projects.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>

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
          min = {today}
          className={inputCss}
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />

        <label className="text-xs font-semibold">Assignee</label>
        <input
          className={inputCss}
          value={assignee}
          onChange={(e) => setAssignee(e.target.value)}
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
