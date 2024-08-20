import { createBrowserRouter } from "react-router-dom";
import { Dashboard } from "../core/dashboard";
import { HighlightedProjects } from "../pages/highlightedProjects";
import { ProjectDetails } from "../pages/projectDetails";
import { Favorites } from "../pages/favorites";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Dashboard />
      </>
    ),
    children: [
      {
        path: "/projetos-destaque",
        element: <HighlightedProjects />,
      },
      {
        element: <ProjectDetails />,
        path: "/projeto/:id",
      },
      {
        element: <Favorites />,
        path: "/favoritos",
      },
    ],
  },
]);
