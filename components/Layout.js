import React from 'react';
import Link from 'next/link';
import { Container, Navbar, Nav, NavDropdown, Row, Col, Form, Button } from 'react-bootstrap';
import { WiDaySunny, WiRain, WiSnow, WiThunderstorm } from 'react-icons/wi';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import styles from '../styles/globals.module.css';

const Layout = ({ children }) => {
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.cloud1}></div>
      <div className={styles.cloud2}></div>
      <Navbar
        bg={isScrolled ? "dark" : "transparent"}
        variant="dark"
        expand="lg"
        fixed="top"
        className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}
      >
        <Container>
          <Navbar.Brand as={Link} href="/" className={styles.brand}>
            <WiDaySunny className={styles.brandIcon} />
            WeatherApp
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} href="/" className={styles.navLink}>Home</Nav.Link>
              <NavDropdown title="Weather" id="basic-nav-dropdown" className={styles.navDropdown}>
                <NavDropdown.Item as={Link} href="/forecast" className={styles.dropdownItem}>
                  <WiRain className={styles.dropdownIcon} /> Forecast
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} href="/radar" className={styles.dropdownItem}>
                  <WiSnow className={styles.dropdownIcon} /> Radar
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} href="/alerts" className={styles.dropdownItem}>
                  <WiThunderstorm className={styles.dropdownIcon} /> Alerts
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link as={Link} href="/articles" className={styles.navLink}>Articles</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <main className={styles.main}>{children}</main>
      
      {/* Footer */}
      <footer className={styles.footer}>
        <Container>
          <Row>
            <Col md={4} className="mb-4 mb-md-0">
              <h5>About WeatherApp</h5>
              <p>We provide accurate and real-time weather information to help you plan your day and stay safe in any weather condition.</p>
            </Col>
            <Col md={4} className="mb-4 mb-md-0">
              <h5>Quick Links</h5>
              <ul className="list-unstyled">
                <li><Link href="/">Home</Link></li>
                <li><Link href="/forecast">Forecast</Link></li>
                <li><Link href="/about">About Us</Link></li>
                <li><Link href="/contact">Contact</Link></li>
              </ul>
            </Col>
            <Col md={4}>
              <h5>Connect With Us</h5>
              <div className={styles.socialIcons}>
                <a href="#" className={styles.socialIcon}><FaFacebookF /></a>
                <a href="#" className={styles.socialIcon}><FaTwitter /></a>
                <a href="#" className={styles.socialIcon}><FaInstagram /></a>
                <a href="#" className={styles.socialIcon}><FaLinkedinIn /></a>
              </div>
              <p className="mt-3">Subscribe to our newsletter for daily weather updates.</p>
              <Form>
                <Form.Group controlId="formBasicEmail">
                  <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-2">
                  Subscribe
                </Button>
              </Form>
            </Col>
          </Row>
          <hr />
          <p className="text-center mt-4 mb-0">&copy; 2023 WeatherApp. All rights reserved.</p>
        </Container>
      </footer>
    </div>
  );
};

export default Layout;