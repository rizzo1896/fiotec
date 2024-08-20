import { Row, Stack } from "react-bootstrap";
import { Title } from "../../components/title";
import { useEffect, useState } from "react";
import { IProjeto } from "../highlightedProjects";
import { useProjectsHook } from "../../contexts/projects";

export const Favorites = () => {
  const { isLoading, projects } = useProjectsHook();
  const [projetos, setProjetos] = useState<IProjeto[] | null>(null);

  useEffect(() => {
    const savedFavorites = localStorage.getItem("favorite");
    const favoritesArray = savedFavorites ? JSON.parse(savedFavorites) : [];

    const favorites = projects?.filter((projeto: IProjeto) =>
      favoritesArray.includes(projeto.id)
    );

    setProjetos(favorites || []);
  }, []);

  return (
    <>
      <Row className="mx-5">
        <Title title="Favoritos" />
      </Row>

      {isLoading ? (
        <p>Carregando...</p>
      ) : (
        projetos?.map((el) => (
          <Stack
            direction="horizontal"
            style={{
              gap: "2rem",
              margin: "2rem",
              alignItems: "flex-start",
              width: "90vw",
            }}
          >
            <div
              style={{
                maxWidth: "240px",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "flex-start",
              }}
            >
              <img
                src={el.image}
                alt={el.title}
                style={{
                  objectFit: "cover",
                  height: "120px",
                  aspectRatio: "16/9",
                }}
              />
            </div>

            <div style={{}}>
              <h5
                className="mb-2"
                style={{
                  fontWeight: 700,
                }}
              >
                {el.title}
              </h5>

              <p>{el.description}</p>
            </div>
          </Stack>
        ))
      )}
    </>
  );
};
