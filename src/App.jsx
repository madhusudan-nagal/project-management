import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import MainLayout from "./layouts/mainLayout";
import DashboardPage from "./Pages/DashboardPage";
import ProjectPage from "./Pages/ProjectPage";
import TasksPage from "./Pages/TasksPage";

export default function App() {

  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="projects" element={<ProjectPage />} />
          <Route path="tasks" element={<TasksPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  ); 
} 
