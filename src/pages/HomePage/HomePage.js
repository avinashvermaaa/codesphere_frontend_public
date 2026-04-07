import React, { useState, useEffect, lazy } from 'react';
import { useNavigate } from 'react-router-dom';
import { languageIcons, defaultIcon } from '../../context/languageIconsConfig';
import { languages } from '../../context/languagesConfig';
import './HomePage.css';
import Navbar from '../../components/Navbar/Navbar';
import LazySection from '../../components/LazySection/LazySection';

const Stats = lazy(() => import('../../components/Stats/Stats'));
const Mq = lazy(() => import('../../components/Mq/Mq'));
const Footer = lazy(() => import('../../components/footer/Footer'));

const BACKEND_URL = process.env.REACT_APP_API_URL;

function HomePage() {
  const navigate = useNavigate();
  useEffect(() => {
    const logVisit = async () => {
      try {
        await fetch(`${BACKEND_URL}/logs`, { method: 'GET' });
      } catch (error) {
        console.error('Logging failed:', error);
      }
    };

    logVisit();
  }, []);

  const [selectedCategory, setSelectedCategory] = useState('Working');
  const [searchQuery, setSearchQuery] = useState('');

  const openCompiler = (language) => {
    const languagePath = language.toLowerCase();
    navigate(`/compiler/${languagePath}`);
  };

  const filteredLanguages = searchQuery
    ? languages
        .flatMap((category) => category.items)
        .filter((lang) => lang.toLowerCase().includes(searchQuery.toLowerCase()))
    : languages.find((cat) => cat.category === selectedCategory)?.items || [];
  return (
    <div className="homepage-container" id="home">
      <Navbar />
      <header className="header">
        <h1>
          <span className="saffron">An</span> <span className="saffron">AI</span>{' '}
          <span className="saffron">Integrated</span> <span className="white">IDE</span>{' '}
          <span className="green">for Faster Development.</span>
        </h1>
        <div className="banner">
          <h1 className="banner-text">
            <span className="gradient">Code, Compile & Debug With AI.</span>
          </h1>
        </div>

        <input
          id="compiler"
          type="text"
          className="search-bar"
          placeholder="Search by Language/DB/Template etc."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </header>

      <div className="category-buttons">
        {languages.map((category, index) => (
          <button
            key={index}
            className={`category-button ${selectedCategory === category.category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category.category)}
          >
            {category.category}
          </button>
        ))}
      </div>

      <div className="category-box">
        {filteredLanguages.map((item, idx) => (
          <button key={idx} className="language-item" onClick={() => openCompiler(item)}>
            {item} {languageIcons[item] || defaultIcon}
          </button>
        ))}
      </div>

      <LazySection height="300px">
        <Stats />
      </LazySection>

      <LazySection height="200px">
        <Mq id="collection" />
      </LazySection>

      <LazySection height="150px">
        <Footer id="connect" />
      </LazySection>
    </div>
  );
}

export default HomePage;
