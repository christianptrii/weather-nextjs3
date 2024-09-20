import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Spinner } from 'react-bootstrap';
import { WiDaySunny, WiRain, WiCloudy, WiSnow, WiThunderstorm } from 'react-icons/wi';
import Layout from '../components/Layout';
import styles from '../styles/Forecast.module.css';

const API_KEY = '94151e87af7a449bb94110050241809';
const API_URL = `https://api.weatherapi.com/v1/forecast.json`;

const WeatherIcon = ({ condition }) => {
  switch (condition.toLowerCase()) {
    case 'sunny':
    case 'clear':
      return <WiDaySunny />;
    case 'rain':
    case 'light rain':
    case 'moderate rain':
      return <WiRain />;
    case 'cloudy':
    case 'partly cloudy':
      return <WiCloudy />;
    case 'snow':
      return <WiSnow />;
    case 'thunder':
    case 'thunderstorm':
      return <WiThunderstorm />;
    default:
      return <WiDaySunny />;
  }
};

const DayForecast = ({ date, day }) => (
  <Card className={styles.dayCard}>
    <Card.Body>
      <h5>{new Date(date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</h5>
      <WeatherIcon condition={day.condition.text} />
      <p>{day.condition.text}</p>
      <p>Max: {day.maxtemp_c}°C</p>
      <p>Min: {day.mintemp_c}°C</p>
    </Card.Body>
  </Card>
);

export default function Forecast() {
  const [city, setCity] = useState('');
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchForecast = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}?key=${API_KEY}&q=${city}&days=5`);
      if (!response.ok) {
        throw new Error('City not found');
      }
      const data = await response.json();
      setForecast(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className={styles.forecastContainer}>
        <Container>
          <h1 className="text-center mb-4">5-Day Weather Forecast</h1>
          <Row className="justify-content-center mb-4">
            <Col md={6}>
              <Form onSubmit={fetchForecast}>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Enter city name"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100" disabled={loading}>
                  {loading ? <Spinner animation="border" size="sm" /> : 'Get Forecast'}
                </Button>
              </Form>
            </Col>
          </Row>

          {error && <p className="text-danger text-center">{error}</p>}

          {forecast && (
            <div className={styles.cardContainer}>
              {forecast.forecast.forecastday.map((day, index) => (
                <DayForecast key={index} date={day.date} day={day.day} />
              ))}
            </div>
          )}
        </Container>
      </div>
    </Layout>
  );
}