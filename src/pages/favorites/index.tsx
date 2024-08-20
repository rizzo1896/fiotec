import { Row, Stack } from "react-bootstrap";
import { Title } from "../../components/title";
import { useEffect, useState } from "react";
import { IProjeto } from "../highlightedProjects";
import { ServicesApi } from "../../services";

export const Favorites = () => {
  const [projetos, setProjetos] = useState<IProjeto[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    ServicesApi.getProjects()
      .then((data) => {
        const savedFavorites = localStorage.getItem("favorite");
        const favoritesArray = savedFavorites ? JSON.parse(savedFavorites) : [];

        const favorites = data.filter((projeto: IProjeto) =>
          favoritesArray.includes(projeto.id)
        );

        setProjetos(favorites);
        return favorites;
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Row className="mx-5">
        <Title title="Favoritos" />
      </Row>

      {loading ? (
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
