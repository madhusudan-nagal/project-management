export const STATUS = ["Planned", "In Progress", "Completed"];
export const PRIORITY = ["Low", "Medium", "High"];

const badge = "inline-block px-3 py-1 rounded-full ";

export const statusStyle = (value) =>
  badge +
  ({
    Completed: "text-[#65ae95] bg-[#e7f8f2]",
    "In Progress": "text-yellow-700 bg-[#ffc163]",
  }[value] || "text-blue-700 bg-blue-100");

export const priorityStyle = (value) =>
  badge +
  ({
    High: "text-[#c04f4e] bg-[#feecea]",
    Medium: "text-[#e2ac52] bg-[#fef4e8]",
  }[value] || "text-gray-700 bg-gray-100");
