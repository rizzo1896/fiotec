import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { ServicesApi } from "../../services";
import { IProjeto } from "../../pages/highlightedProjects";

interface ProjectsContextData {
  categories: { id: number; label: string }[] | undefined;
  projects: IProjeto[] | undefined;
  isLoading: boolean;
  getById: (id: string) => Promise<IProjeto | null>;
}

export const ProjectsContext = createContext<ProjectsContextData>({
  categories: [],
  projects: [],
  isLoading: false,
  getById: async () => null,
});

export const useProjectsHook = () => useContext(ProjectsContext);

export const ProjectsProvider = ({ children }: PropsWithChildren) => {
  const [categories, setCategories] =
    useState<{ id: number; label: string }[]>();
  const [projects, setProjects] = useState<IProjeto[]>();
  const [loading, setLoading] = useState(false);

  const getProjects = async () => {
    setLoading(true);
    const response = await ServicesApi.getProjects()
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.error(error);
        return [];
      })
      .finally(() => {
        setLoading(false);
      });

    return response;
  };

  const getProjectById = async (id: string) => {
    setLoading(true);
    const response = await ServicesApi.getProjectById(id)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.error(error);
        return null;
      })
      .finally(() => {
        setLoading(false);
      });

    return response;
  };

  useEffect(() => {
    getProjects().then((data) => {
      const categories = data.map((el) => ({
        id: el.categoryId,
        label: el.category,
      }));
      setCategories(categories);
      setProjects(data);
    });
  }, []);

  return (
    <ProjectsContext.Provider
      value={{
        categories,
        projects,
        isLoading: loading,
        getById: getProjectById,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};
