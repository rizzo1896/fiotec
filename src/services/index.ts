import { IProjeto } from "../pages/highlightedProjects";

export const api = "http://localhost:3000";

export class ServicesApi {
  static async getProjects() {
    const response = await fetch(api + "/projetos");
    return response.json() as Promise<IProjeto[]>;
  }

  static async getProjectById(id: string) {
    const response = await fetch(`${api}/projetos/${id}`);
    return response.json() as Promise<IProjeto>;
  }
}
