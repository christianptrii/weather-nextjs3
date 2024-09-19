import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Layout from '../components/Layout';

export default function Forecast() {
  return (
    <Layout>
      <Container className="mb-5">
        <Row>
          <Col>
            <Card className="shadow-lg border-0 rounded-lg" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
              <Card.Body>
                <h2 className="text-center mb-4">5-Day Forecast</h2>
                <p className="text-center">This feature is coming soon!</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}