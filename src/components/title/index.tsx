import { Col, Row } from "react-bootstrap";

interface TitleProps {
  title: string;
  results?: {
    current: number;
    total: number;
  };
}

export const Title = ({ title, results }: TitleProps) => {
  return (
    <>
      <Row>
        <Col sm={7} className="ps-0">
          <h5 style={{ fontWeight: 700 }}>{title}</h5>
        </Col>
        {results && (
          <Col sm={5} style={{ flex: 1 }}>
            <p
              style={{
                textAlign: "right",
              }}
            >
              {`Mostrando ${results.current} de ${results.total} resultados.`}
            </p>
          </Col>
        )}
      </Row>
    </>
  );
};
