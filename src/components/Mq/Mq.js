import React from 'react';
import './Mq.css';
import { MARQUEE_SECTIONS } from '../../configs/marqueeConfig';

const Mq = ({ id }) => {
  return (
    <div id={id}>
      {/* Banner Heading */}
      <div className="banner">
        <h2 className="banner-text">
          <span className="gradient">Choose from an extensive</span>{' '}
          <span className="gradient">library of languages</span>
        </h2>
      </div>

      {/* Dynamically render marquee sections */}
      {MARQUEE_SECTIONS.map((section) => (
        <div key={section.id} id={section.id}>
          <div className={section.wrapperId}>
            {/* First marquee copy */}
            <div className={section.direction}>
              {section.items.map((imgName, index) => (
                <img
                  key={`${imgName}-1-${index}`}
                  src={`./img/${section.imagePath}/${imgName}.png`}
                  alt={imgName}
                  className={section.logoClass}
                />
              ))}
            </div>
            {/* Second marquee copy (for continuous loop) */}
            <div className={section.direction}>
              {section.items.map((imgName, index) => (
                <img
                  key={`${imgName}-2-${index}`}
                  src={`./img/${section.imagePath}/${imgName}.png`}
                  alt={imgName}
                  className={section.logoClass}
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Mq;
