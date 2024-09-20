import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Modal } from 'react-bootstrap';
import { FaNewspaper, FaSearch } from 'react-icons/fa';
import Layout from '../components/Layout';
import styles from '../styles/Articles.module.css';

const ArticleCard = ({ title, content, image, onReadMore }) => (
  <Card className={styles.articleCard}>
    <Card.Img variant="top" src={image} />
    <Card.Body>
      <Card.Title>{title}</Card.Title>
      <Card.Text>{content.substring(0, 100)}...</Card.Text>
      <Button variant="primary" onClick={onReadMore}>Read More</Button>
    </Card.Body>
  </Card>
);

export default function Articles() {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);

  const articles = [
    { 
      title: "How to Deal with Extreme Weather", 
      content: "Extreme weather can occur suddenly. Here are tips to deal with it: 1. Always monitor weather forecasts. 2. Prepare an emergency bag. 3. Know the nearest shelter. 4. Make sure communication devices are always charged.", 
      image: "https://images.unsplash.com/photo-1527482797697-8795b05a13fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
    },
    { 
      title: "Weather Effects on Health", 
      content: "Weather changes can affect our health. Some effects include: 1. Changes in air pressure can trigger headaches. 2. Cold weather increases the risk of flu. 3. Extreme heat can cause dehydration. 4. High humidity affects respiratory diseases.", 
      image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80" 
    },
    { 
      title: "Weather Forecast: How Accurate?", 
      content: "Weather forecasting technology continues to evolve. Currently, short-term forecasts (1-3 days) have about 90% accuracy. Medium-term forecasts (4-7 days) are about 80% accurate. For long-term, accuracy decreases to 50% or less.", 
      image: "https://images.unsplash.com/photo-1590552515252-3a5a1bce7bed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80" 
    },
    { 
      title: "Climate Change and Weather Patterns", 
      content: "Climate change is altering weather patterns globally. This article explores the long-term effects of climate change on weather and what it means for our future.", 
      image: "https://images.unsplash.com/photo-1569060368746-4b99609d49d8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
    },
    { 
      title: "Understanding Weather Radar", 
      content: "Weather radar is a crucial tool for meteorologists. Learn how it works and how to interpret radar images to better understand weather forecasts.", 
      image: "https://images.unsplash.com/photo-1556016069-0a64d35719db?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
    },
    { 
      title: "Preparing for Severe Storms", 
      content: "Severe storms can be dangerous. This guide provides essential steps to prepare your home and family for severe weather events.", 
      image: "https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80" 
    },
    { 
      title: "The Science of Cloud Formation", 
      content: "Clouds play a vital role in weather. Discover the fascinating process of cloud formation and how different types of clouds indicate various weather conditions.", 
      image: "https://images.unsplash.com/photo-1534088568595-a066f410bcda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1551&q=80" 
    },
    { 
      title: "Weather and Agriculture", 
      content: "Weather has a significant impact on agriculture. Learn how farmers use weather forecasts to make crucial decisions about planting, harvesting, and crop management.", 
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80" 
    },
  ];

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleReadMore = (article) => {
    setSelectedArticle(article);
    setShowModal(true);
  };

  return (
    <Layout>
      <Container className={`${styles.articlesContainer} mb-5`}>
        <h1 className="text-center mb-4">Weather Articles</h1>
        <div className={styles.searchBar}>
          <FaSearch />
          <input
            type="text"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Row>
          {filteredArticles.map((article, index) => (
            <Col key={index} md={6} lg={4} className="mb-4">
              <ArticleCard {...article} onReadMore={() => handleReadMore(article)} />
            </Col>
          ))}
        </Row>
      </Container>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{selectedArticle?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedArticle && (
            <>
              <img src={selectedArticle.image} alt={selectedArticle.title} className={styles.modalImage} />
              <p>{selectedArticle.content}</p>
            </>
          )}
        </Modal.Body>
      </Modal>
    </Layout>
  );
}