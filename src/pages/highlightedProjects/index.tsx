import { Col, Container, Row } from "react-bootstrap";
import { Title } from "../../components/title";
import { InfoCard } from "../../components/InfoCard";
import { useProjectsHook } from "../../contexts/projects";
import { useLocation } from "react-router-dom";
import { useMemo } from "react";

export interface IProjeto {
  id: number;
  title: string;
  description: string;
  category: string;
  categoryId: number;
  image: string;
}

export const HighlightedProjects = () => {
  const { isLoading, projects } = useProjectsHook();
  const location = useLocation();

  const getQueryParams = (query: string) => {
    return new URLSearchParams(location.search).get(query);
  };
  const category = getQueryParams("category");

  const results = useMemo(() => {
    const current = projects?.filter((el) => {
      if (!category) return true;
      return el.categoryId === Number(category);
    }).length;

    return {
      current: current,
      total: projects?.length,
    };
  }, [category]);

  return (
    <>
      <Title
        title="Projetos em Destaque"
        results={{
          current: results.current || 0,
          total: results.total || 0,
        }}
      />

      <Container fluid className="mt-5 ps-0">
        {isLoading ? (
          <p>Carregando...</p>
        ) : (
          <Row>
            {projects
              ?.filter((el) => {
                if (!category) return true;
                return el.categoryId === Number(category);
              })
              ?.map((project) => (
                <Col key={project.id} sm={12} md={6} lg={4} className="mb-5">
                  <InfoCard
                    key={project.id}
                    title={project.title}
                    description={project.description}
                    image={project.image}
                    data={project}
                  />
                </Col>
              ))}
          </Row>
        )}
      </Container>
    </>
  );
};
