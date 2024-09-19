import React from 'react';
import Link from 'next/link';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { WiDaySunny, WiRain, WiSnow, WiThunderstorm } from 'react-icons/wi';
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
    </div>
  );
};

export default Layout;