import React, { useState } from 'react';

/**
 * A section to display service offerings with a grid of cards.
 * All styles are inline and the component is self-contained.
 */
const OfferingsSection = () => {

  // --- Data for the 9 offering cards ---
  const offerings = [
    { title: <>AI & Business<br />Automation</>, imgSrc: require('../images/what we offer images/innovation.png') },
    { title: <>Custom GenAI &<br />Enterprise Copilots</>, imgSrc: require('../images/what we offer images/Group 24323.png') },
    { title: <>Sustainable AI &<br />Green Tech</>, imgSrc: require('../images/what we offer images/Group 24324.png') },
    { title: <>Future-Ready Skilling &<br />EdTech Solutions</>, imgSrc: require('../images/what we offer images/Group 24327.png') },
    { title: <>Digital Transformation &<br />IT Consulting</>, imgSrc: require('../images/what we offer images/Group 24326.png') },
    { title: <>Smart Governance &<br />GovTech Solutions</>, imgSrc: require('../images/what we offer images/Group 24325.png') },
    { title: <>CXO Media, Branding &<br />Thought Leadership</>, imgSrc: require('../images/Edgespark/Group 24330.png') },
    { title: <>Innovation Lab &<br />Prototyping</>, imgSrc: require('../images/what we offer images/Group 24329.png') },
    { title: <>CSR, Women Empowerment &<br />Social Innovation</>, imgSrc: require('../images/what we offer images/Group 24328.png') },
  ];

  // --- Inline CSS Styles ---
  const styles = {
    container: {
      width: '100%',
      padding: '80px 40px',
      backgroundColor: '#ffffff',
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      color: '#0a0f2c',
      boxSizing: 'border-box',
    },
    contentWrapper: {
      maxWidth: '1200px',
      margin: '0 auto',
    },
    heading: {
      fontSize: 'clamp(2.2rem, 5vw, 3rem)',
      fontWeight: '600',
      lineHeight: 1.2,
      marginBottom: '60px',
      textAlign: 'center', // Changed from 'left' to 'center'
    },
    cardGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
      gap: '30px',
    },
    card: {
      backgroundColor: '#f7f8fa',
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.08), 0 4px 12px rgba(0, 0, 0, 0.03)',
      transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
      cursor: 'pointer',
      border: '1px solid rgba(255, 255, 255, 0.2)',
    },
    cardHover: {
      transform: 'translateY(-12px) scale(1.02)',
      boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15), 0 12px 24px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(255, 255, 255, 0.3)',
      borderColor: 'rgba(59, 130, 246, 0.2)',
    },
    cardImage: {
      width: '100%',
      height: '200px',
      objectFit: 'cover',
      display: 'block',
    },
    cardContent: {
      padding: '24px',
      textAlign: 'center',
      minHeight: '80px', // Ensure consistent height for 2-line titles
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    cardTitle: {
      fontSize: '18px',
      fontWeight: '700',
      margin: 0,
      color: '#0a0f2c',
      lineHeight: '1.4',
    },
  };

  const mediaQueryStyle = `
    @media (max-width: 768px) {
      .offerings-container {
        padding: 60px 25px !important;
      }
      .offerings-card-grid {
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)) !important;
        gap: 20px !important;
      }
      .offerings-heading {
        font-size: 2rem !important;
        margin-bottom: 40px !important;
      }
    }
    @media (max-width: 480px) {
      .offerings-container {
        padding: 50px 20px !important;
      }
      .offerings-card-grid {
        grid-template-columns: 1fr !important;
      }
      .offerings-heading {
        font-size: 1.75rem !important;
      }
    }
  `;

  // --- Card Component ---
  const OfferingCard = ({ title, imgSrc }) => {
    const [isHovered, setIsHovered] = useState(false);
    const cardStyle = isHovered ? { ...styles.card, ...styles.cardHover } : styles.card;

    return (
      <div
        style={cardStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img src={imgSrc} alt={title} style={styles.cardImage} />
        <div style={styles.cardContent}>
          <h3 style={styles.cardTitle}>{title}</h3>
        </div>
      </div>
    );
  };

  // --- Rendered Component ---
  return (
    <div style={styles.container} id="offerings-section" className="offerings-container">
      <style>{mediaQueryStyle}</style>
      <div style={styles.contentWrapper}>
        <h2 style={styles.heading} className="offerings-heading">What we Offer : Tailored for Business Growth</h2>
        <div style={styles.cardGrid} className="offerings-card-grid">
          {offerings.map((offer, index) => (
            <OfferingCard key={index} title={offer.title} imgSrc={offer.imgSrc} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OfferingsSection;
