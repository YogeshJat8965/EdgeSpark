import React from 'react';

/**
 * An "About" section component with a two-column layout.
 * All styles are inline for easy integration.
 * The image is a placeholder, which you can replace with your own asset.
 */
const AboutSection = () => {

  // --- Inline CSS Styles ---
  const styles = {
    container: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      padding: '80px 40px',
      backgroundColor: '#ffffff', // White background
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      color: '#212529', // A dark color for text
      boxSizing: 'border-box',
    },
    contentWrapper: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '60px',
      maxWidth: '1200px',
      width: '100%',
      flexWrap: 'wrap', // Allows columns to stack on smaller screens
    },
    textContainer: {
      flex: 1,
      minWidth: '300px', // Ensures text container doesn't get too squished
      textAlign: 'left',
    },
    imageContainer: {
      flex: 1.2,
      minWidth: '350px', // Ensures image container doesn't get too squished
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    heading: {
      fontSize: 'clamp(1.75rem, 4.5vw, 2.5rem)',
      fontWeight: '700',
      lineHeight: 1.3,
      marginBottom: '32px',
      color: '#1a202c',
      maxWidth: '600px',
    },
    paragraph: {
      fontSize: '16px',
      lineHeight: 1.7,
      marginBottom: '20px',
      maxWidth: '500px', // Keeps text lines from getting too long
      color: '#495057',
    },
    image: {
      width: '100%',
      height: 'auto',
      borderRadius: '12px',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
      objectFit: 'cover',
    },
  };

  const mediaQueryStyle = `
    @media (max-width: 768px) {
      .about-content-wrapper {
        flex-direction: column-reverse !important;
        gap: 40px !important;
        padding: 0 20px !important;
      }
      .about-text-container,
      .about-image-container {
        minWidth: 100% !important;
        width: 100% !important;
      }
      .about-text-container {
        text-align: center !important;
      }
      .about-heading {
        max-width: 100% !important;
      }
      .about-paragraph {
        max-width: 100% !important;
      }
    }
    @media (max-width: 480px) {
      .about-container {
        padding: 60px 20px !important;
      }
    }
  `;

  // --- Rendered Component ---
  return (
    <div style={styles.container} className="about-container">
      <style>{mediaQueryStyle}</style>
      <div style={styles.contentWrapper} className="about-content-wrapper">
        <div style={styles.textContainer} className="about-text-container">
          <h2 style={styles.heading} className="about-heading">
            EdgeSpark IT Ventures:<br />
            Building What's Next
          </h2>
          <p style={styles.paragraph} className="about-paragraph">
            EdgeSpark is a future-forward venture studio powering
            businesses at the intersection of AI,<b>Technology</b> , <b>Media</b> , and
            <b>Education</b>.
          </p>
          <p style={styles.paragraph} className="about-paragraph">
            We don't just keep up with innovation, we lead it. Through
            our specialized verticals, we deliver <b>Intelligent</b>, <b>Scalable</b>, and
            <b> Sustainable Solutions</b> that drive real-world impact.
          </p>
          <p style={styles.paragraph} className="about-paragraph">
            <b> From automation to upskilling, we help
            enterprises evolve faster, smarter, and stronger.</b>
          </p>
        </div>
        <div style={styles.imageContainer} className="about-image-container">
          <img
            src={require('../images/Mask Group 1.png')}
            alt="Business Meeting Office"
            style={styles.image}
          />
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
