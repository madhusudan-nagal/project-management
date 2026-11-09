import Button from "../components/Button";
import SearchBar from "../components/SearchBar";
import Table from "../components/Table";
import data from "../db.json";
import { useState } from "react";

export default function ProjectPage() {
  const [search, setSearch] = useState("");

  const filteredPorject = data.projects.filter((project) =>
    project.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <main>
      <div className="flex flex-row gap-4 justify-between">
        <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} />
        <div className="flex flex-row gap-2">
          <Button iconType="add" label="Add Project" />

          <Button iconType="edit" label="Edit Project" />

          <Button iconType="delete" label="Delete" />
        </div>
      </div>
      <div className="mt-4"></div>
      <Table
        data={filteredPorject}
        columns={[
          { key: "name", title: "Project" },
          { key: "description", title: "Description" },

          {
            key: "status",
            title: "Status",
            className: (value) =>
              value === "Completed"
                ? "inline-block px-3 py-1 rounded-full text-[#65ae95] bg-[#e7f8f2]"
                : value === "In Progress"
                  ? "inline-block px-3 py-1 rounded-full text-yellow-700 bg-[#ffc163]"
                  : "inline-block px-3 py-1 rounded-full text-blue-700 bg-blue-100",
          },
          { key: "dueDate", title: "Due date" },
          {
            key: "priority",
            title: "Priority",
            className: (value) =>
              value === "High"
                ? "inline-block px-3 py-1 rounded-full text-[#c04f4e] bg-[#feecea]"
                : value === "Medium"
                  ? "inline-block px-3 py-1 rounded-full text-[#e2ac52] bg-[#fef4e8]"
                  : "inline-block px-3 py-1 rounded-full text-gray-700 bg-gray-100",
          },
        ]}
      />
    </main>
  );
}
