import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Spinner, Navbar, Nav, Dropdown, Accordion, Image } from 'react-bootstrap';
import { WiDaySunny, WiRain, WiCloudy, WiSnow, WiThunderstorm } from 'react-icons/wi';
import { FaNewspaper, FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

const styles = `
  body {
    background: linear-gradient(135deg, #87CEEB, #E0F6FF);
    min-height: 100vh;
    font-family: 'Arial', sans-serif;
  }

  .section {
    padding: 80px 0;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 15px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    margin: 40px 0;
  }

  .hero {
    background: url('https://images.unsplash.com/photo-1534088568595-a066f410bcda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80') no-repeat center center;
    background-size: cover;
    color: white;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
  }

  .hero-content {
    background-color: rgba(0, 0, 0, 0.5);
    padding: 40px;
    border-radius: 15px;
  }

  .weather-card {
    transition: transform 0.3s ease;
  }

  .weather-card:hover {
    transform: translateY(-5px);
  }

  .footer {
    background-color: #343a40;
    color: white;
    padding: 40px 0;
  }
`;

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

const Article = ({ title, content, index }) => (
  <Accordion.Item eventKey={index.toString()}>
    <Accordion.Header>
      <FaNewspaper className="me-2" />
      {title}
    </Accordion.Header>
    <Accordion.Body>{content}</Accordion.Body>
  </Accordion.Item>
);

export default function Home() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);

  const API_KEY = '94151e87af7a449bb94110050241809';
  const API_URL = `https://api.weatherapi.com/v1/current.json`;

  const fetchWeather = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}?key=${API_KEY}&q=${city}`);
      if (!response.ok) {
        throw new Error('Kota tidak ditemukan');
      }
      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const articles = [
    { title: "Cara Menghadapi Cuaca Ekstrem", content: "Cuaca ekstrem dapat muncul tiba-tiba. Berikut tips menghadapinya: 1. Selalu pantau prakiraan cuaca. 2. Siapkan tas darurat. 3. Kenali tempat berlindung terdekat. 4. Pastikan alat komunikasi selalu terisi daya." },
    { title: "Pengaruh Cuaca pada Kesehatan", content: "Perubahan cuaca dapat mempengaruhi kesehatan kita. Beberapa efeknya meliputi: 1. Perubahan tekanan udara dapat memicu sakit kepala. 2. Cuaca dingin meningkatkan risiko flu. 3. Panas ekstrem dapat menyebabkan dehidrasi. 4. Kelembaban tinggi mempengaruhi penyakit pernapasan." },
    { title: "Ramalan Cuaca: Seberapa Akurat?", content: "Teknologi ramalan cuaca terus berkembang. Saat ini, prakiraan cuaca jangka pendek (1-3 hari) memiliki akurasi sekitar 90%. Prakiraan jangka menengah (4-7 hari) akurasinya sekitar 80%. Untuk jangka panjang, akurasi menurun hingga 50% atau kurang." },
  ];

  return (
    <>
      <style>{styles}</style>
      <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
        <Container>
          <Navbar.Brand href="#home">
            <WiDaySunny size={30} className="d-inline-block align-top me-2" />
            WeatherApp
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#about">About</Nav.Link>
              <Nav.Link href="#forecast">Forecast</Nav.Link>
              <Nav.Link href="#articles">Articles</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <section className="hero py-5" id="home">
        <Container>
          <Row className="align-items-center">
            <Col md={6} className="hero-content">
              <h1 className="display-4 mb-4">Welcome to WeatherApp</h1>
              <p className="lead mb-4">
                Get accurate and up-to-date weather information for any city around the world. 
                Stay informed about temperature, humidity, wind speed, and more!
              </p>
              <Button variant="light" size="lg" href="#forecast">
                Check Weather Now
              </Button>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="section" id="about">
        <Container>
          <Row>
            <Col md={12} className="text-center">
              <h2 className="display-4 mb-4">About WeatherApp</h2>
              <p className="lead">
                WeatherApp is your go-to source for real-time weather information. 
                We provide accurate forecasts, detailed weather data, and informative articles 
                to help you stay prepared for any weather condition.
              </p>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col md={4}>
              <Card className="h-100 weather-card">
                <Card.Body>
                  <Card.Title>Real-time Data</Card.Title>
                  <Card.Text>
                    Our app fetches the latest weather data to provide you with up-to-the-minute information.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="h-100 weather-card">
                <Card.Body>
                  <Card.Title>Global Coverage</Card.Title>
                  <Card.Text>
                    Get weather information for cities all around the world, no matter where you are.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="h-100 weather-card">
                <Card.Body>
                  <Card.Title>Informative Articles</Card.Title>
                  <Card.Text>
                    Stay informed with our curated articles about weather phenomena and safety tips.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="section" id="forecast">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6}>
              <Card className="shadow-lg border-0 rounded-lg weather-card">
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
      </section>

      <section className="section" id="articles">
        <Container>
          <Row>
            <Col>
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
                <Card className="mb-4">
                  <Card.Body>
                    <Card.Title>{articles[selectedArticle].title}</Card.Title>
                    <Card.Text>{articles[selectedArticle].content}</Card.Text>
                  </Card.Body>
                </Card>
              )}
              <Accordion>
                {articles.map((article, index) => (
                  <Article key={index} title={article.title} content={article.content} index={index} />
                ))}
              </Accordion>
            </Col>
          </Row>
        </Container>
      </section>

      <footer className="footer mt-5">
        <Container>
          <Row>
            <Col md={4}>
              <h5>WeatherApp</h5>
              <p>Your trusted source for accurate weather forecasts and information.</p>
            </Col>
            <Col md={4}>
              <h5>Quick Links</h5>
              <ul className="list-unstyled">
                <li><a href="#home" className="text-light">Home</a></li>
                <li><a href="#about" className="text-light">About</a></li>
                <li><a href="#forecast" className="text-light">Forecast</a></li>
                <li><a href="#articles" className="text-light">Articles</a></li>
              </ul>
            </Col>
            <Col md={4}>
              <h5>Connect With Us</h5>
              <div>
                <a href="#" className="text-light me-3"><FaGithub size={24} /></a>
                <a href="#" className="text-light me-3"><FaTwitter size={24} /></a>
                <a href="#" className="text-light"><FaLinkedin size={24} /></a>
              </div>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col className="text-center">
              <p>&copy; 2024 WeatherApp. All rights reserved.</p>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
}