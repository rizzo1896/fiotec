import { Col, Container, Row } from "react-bootstrap";
import { Title } from "../../components/title";
import { InfoCard } from "../../components/InfoCard";
import { useEffect, useState } from "react";
import { ServicesApi } from "../../services";

export interface IProjeto {
  id: number;
  title: string;
  description: string;
  category: string;
  categoryId: number;
  image: string;
}

export const HighlightedProjects = () => {
  const [projetos, setProjetos] = useState<IProjeto[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    ServicesApi.getProjects()
      .then((data) => {
        setProjetos(data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Title
        title="Projetos em Destaque"
        results={{
          current: 6,
          total: 6,
        }}
      />

      <Container fluid className="mt-5 ps-0">
        {loading ? (
          <p>Carregando...</p>
        ) : (
          <Row>
            {projetos?.map((projeto) => (
              <Col key={projeto.id} sm={12} md={6} lg={4} className="mb-5">
                <InfoCard
                  key={projeto.id}
                  title={projeto.title}
                  description={projeto.description}
                  image={projeto.image}
                  data={projeto}
                />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </>
  );
};
