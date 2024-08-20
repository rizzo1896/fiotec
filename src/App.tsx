import { RouterProvider } from "react-router-dom";
import { router } from "./router/Router";
import { ProjectsProvider } from "./contexts/projects";

function App() {
  return (
    <>
      <ProjectsProvider>
        <RouterProvider router={router} />
      </ProjectsProvider>
    </>
  );
}

export default App;
