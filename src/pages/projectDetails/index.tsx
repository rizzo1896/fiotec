import { useParams } from "react-router-dom";
import { Title } from "../../components/title";
import { useEffect, useState } from "react";
import { IProjeto } from "../highlightedProjects";
import { Container, Row, Stack } from "react-bootstrap";
import { useProjectsHook } from "../../contexts/projects";

export const ProjectDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [projectSelected, setProjectSelected] = useState<IProjeto | null>(null);
  const { isLoading, getById } = useProjectsHook();

  useEffect(() => {
    if (!id) return;
    getById(id).then((data) => setProjectSelected(data));
  }, [id]);

  return (
    <>
      <Title title="Projetos em Destaque" />

      <Container as={Row} fluid className="mt-4 ps-0">
        {isLoading ? (
          <p>Carregando...</p>
        ) : (
          <Stack className="ps-0">
            <h5
              className="mb-4"
              style={{
                fontWeight: 700,
              }}
            >
              {projectSelected?.title}
            </h5>
            <img
              src={projectSelected?.image}
              alt={projectSelected?.title}
              style={{
                objectFit: "cover",
                width: "100%",
                height: "400px",
                aspectRatio: "16/9",
              }}
            />

            {projectSelected?.description &&
            projectSelected?.description?.split(".")?.length > 0 ? (
              projectSelected?.description?.split(".").map((item, key) => {
                if (item.length > 1)
                  return (
                    <p
                      key={key}
                      style={{
                        marginTop: 10,
                        textAlign: "justify",
                        lineHeight: 2,
                      }}
                    >
                      {item + "."}
                    </p>
                  );
              })
            ) : (
              <p
                style={{
                  marginTop: 20,
                  textAlign: "justify",
                }}
              >
                {projectSelected?.description}
              </p>
            )}
          </Stack>
        )}
      </Container>
    </>
  );
};
