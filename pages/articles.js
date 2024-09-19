import React, { useState } from 'react';
import { Container, Row, Col, Card, Dropdown, Accordion } from 'react-bootstrap';
import { FaNewspaper } from 'react-icons/fa';
import Layout from '../components/Layout';

const Article = ({ title, content, index }) => (
  <Accordion.Item eventKey={index.toString()}>
    <Accordion.Header>
      <FaNewspaper className="me-2" />
      {title}
    </Accordion.Header>
    <Accordion.Body>{content}</Accordion.Body>
  </Accordion.Item>
);

export default function Articles() {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const articles = [
    { title: "How to Deal with Extreme Weather", content: "Extreme weather can occur suddenly. Here are tips to deal with it: 1. Always monitor weather forecasts. 2. Prepare an emergency bag. 3. Know the nearest shelter. 4. Make sure communication devices are always charged." },
    { title: "Weather Effects on Health", content: "Weather changes can affect our health. Some effects include: 1. Changes in air pressure can trigger headaches. 2. Cold weather increases the risk of flu. 3. Extreme heat can cause dehydration. 4. High humidity affects respiratory diseases." },
    { title: "Weather Forecast: How Accurate?", content: "Weather forecasting technology continues to evolve. Currently, short-term forecasts (1-3 days) have about 90% accuracy. Medium-term forecasts (4-7 days) are about 80% accurate. For long-term, accuracy decreases to 50% or less." },
  ];

  return (
    <Layout>
      <Container className="mb-5">
        <Row>
          <Col>
            <Card className="shadow-lg border-0 rounded-lg" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
              <Card.Body>
                <h2 className="text-center mb-4">Weather Articles</h2>
                <Dropdown className="mb-3">
                  <Dropdown.Toggle variant="primary" id="dropdown-articles">
                    Select an Article
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {articles.map((article, index) => (
                      <Dropdown.Item key={index} onClick={() => setSelectedArticle(index)}>
                        {article.title}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
                {selectedArticle !== null && (
                  <Card>
                    <Card.Body>
                      <Card.Title>{articles[selectedArticle].title}</Card.Title>
                      <Card.Text>{articles[selectedArticle].content}</Card.Text>
                    </Card.Body>
                  </Card>
                )}
                <Accordion className="mt-4">
                  {articles.map((article, index) => (
                    <Article key={index} title={article.title} content={article.content} index={index} />
                  ))}
                </Accordion>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}
