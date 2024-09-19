import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Spinner } from 'react-bootstrap';
import { WiDaySunny, WiRain, WiCloudy, WiSnow, WiThunderstorm } from 'react-icons/wi';
import Layout from '../components/Layout';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../styles/globals.module.css';

const WeatherIcon = ({ condition }) => {
  switch (condition.toLowerCase()) {
    case 'sunny':
      return <WiDaySunny size={50} />;
    case 'rain':
      return <WiRain size={50} />;
    case 'cloudy':
      return <WiCloudy size={50} />;
    case 'snow':
      return <WiSnow size={50} />;
    case 'thunder':
      return <WiThunderstorm size={50} />;
    default:
      return <WiDaySunny size={50} />;
  }
};

const getTemperatureMessage = (temp) => {
  if (temp < 0) return "Sangat dingin! Pastikan Anda berpakaian hangat.";
  if (temp < 10) return "Cuaca dingin. Sebaiknya pakai jaket.";
  if (temp < 20) return "Cuaca sejuk. Nyaman untuk beraktivitas di luar.";
  if (temp < 30) return "Cuaca hangat. Jangan lupa minum cukup air.";
  return "Cuaca panas! Hindari terlalu lama di bawah sinar matahari.";
};

export default function Home() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = '94151e87af7a449bb94110050241809';
  const API_URL = `https://api.weatherapi.com/v1/current.json`;

  const fetchWeather = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}?key=${API_KEY}&q=${city}`);
      if (!response.ok) {
        throw new Error('City not found');
      }
      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      {/* Hero Banner */}
      <div className={styles.heroBanner}>
        <Container>
          <h1>Stay Ahead of the Weather</h1>
          <p>Get real-time updates and accurate forecasts for any location.</p>
          <Button variant="light" size="lg" onClick={() => document.querySelector('input').focus()}>
            Check Weather Now
          </Button>
        </Container>
      </div>

      {/* Existing weather search and display */}
      <Container className="mb-5">
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card className="shadow-lg border-0 rounded-lg" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
              <Card.Body className="p-5">
                <h2 className="text-center mb-4 text-primary">Weather Forecast</h2>
                <Form onSubmit={fetchWeather}>
                  <Form.Group className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="Enter city name"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      required
                      className="form-control-lg"
                    />
                  </Form.Group>
                  <Button variant="primary" type="submit" className="w-100 py-2" disabled={loading}>
                    {loading ? <Spinner animation="border" size="sm" /> : 'Get Weather'}
                  </Button>
                </Form>

                {error && <p className="text-danger mt-3 text-center">{error}</p>}

                {weather && (
                  <Card className="mt-4 border-0 bg-primary text-white">
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <h2 className="mb-0">{weather.location.name}</h2>
                          <p className="text-white-50">{weather.location.country}</p>
                        </div>
                        <WeatherIcon condition={weather.current.condition.text} />
                      </div>
                      <div className="mt-4">
                        <h1 className="display-3 mb-0">{weather.current.temp_c}°C</h1>
                        <p className="lead">{weather.current.condition.text}</p>
                        <p>{getTemperatureMessage(weather.current.temp_c)}</p>
                      </div>
                      <Row className="mt-4 text-center">
                        <Col>
                          <p className="mb-0">Humidity</p>
                          <h4>{weather.current.humidity}%</h4>
                        </Col>
                        <Col>
                          <p className="mb-0">Wind</p>
                          <h4>{weather.current.wind_kph} km/h</h4>
                        </Col>
                        <Col>
                          <p className="mb-0">Feels Like</p>
                          <h4>{weather.current.feelslike_c}°C</h4>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}