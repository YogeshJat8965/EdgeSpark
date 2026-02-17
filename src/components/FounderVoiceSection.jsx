import React from 'react';

/**
 * A component to feature quotes from key people, like CEO or founder.
 * All styles are inline and the component is self-contained.
 * Displays all voices vertically without carousel functionality.
 */
const FounderVoiceSection = () => {

  // --- Content Data ---
  const voices = [
    {
      quote: "Our vision is to use technology as a force multiplier not just for business growth, but for building a smarter, more sustainable world. We believe in leveraging AI, automation, and digital intelligence to create inclusive ecosystems where innovation empowers people, industries, and the planet.",
      authorName: "Swati Gupta, CEO founder",
      authorTitle: "EdgeSpark Group of Companies",
      image: require('../images/Group 24321.png')
    },
    {
      quote: "At EdgeSpark, we don't just build solutions, we engineer the future. Our focus is on creating intelligent, sustainable, and human-centered innovations that empower organizations to lead with clarity and confidence in the age of Al. Every experience we deliver is designed to spark transformation that lasts.",
      authorName: "Puneet Agarwal, Co-Founder",
      authorTitle: "EdgeSpark Group of Companies",
      image: require('../images/PuneetSir.png')
    }
  ];

  // --- Inline CSS Styles ---
  const styles = {
    container: {
      width: '100%',
      padding: '100px 40px',
      backgroundColor: '#f8f9fa',
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      color: '#0a0f2c',
      boxSizing: 'border-box',
    },
    mainHeading: {
      fontSize: 'clamp(2.5rem, 6vw, 3.5rem)',
      fontWeight: '600',
      lineHeight: 1.2,
      marginBottom: '80px',
      textAlign: 'center',
    },
    contentWrapper: {
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
      gap: '80px',
    },
    voiceItem: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: '60px',
      width: '100%',
    },
    textContainer: {
      flex: '1 1 auto',
      maxWidth: '600px',
      position: 'relative',
    },
    quoteWrapper: {
      position: 'relative',
      paddingLeft: '20px',
      paddingRight: '20px',
      paddingTop: '10px',
      paddingBottom: '10px',
    },
    quoteText: {
      fontSize: 'clamp(1rem, 2.5vw, 1.1rem)',
      lineHeight: 1.8,
      color: '#333d5a',
      position: 'relative',
      zIndex: 1,
      fontStyle: 'italic',
    },
    authorContainer: {
      marginTop: '24px',
      paddingLeft: '20px',
    },
    authorName: {
      fontWeight: '700',
      fontSize: '1.1rem',
      margin: '0 0 4px 0',
      color: '#000000',
    },
    authorTitle: {
      fontSize: '1rem',
      color: '#000000',
      margin: 0,
      fontWeight: '700',
    },
    startQuote: {
      position: 'absolute',
      bottom: '-10px',
      right: '-20px',
      width: '25px',
      height: '25px',
      zIndex: 0,
      opacity: 0.6,
      filter: 'brightness(0) saturate(100%) invert(40%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(40%) contrast(100%)',
    },
    startQuote2: {
      position: 'absolute',
      bottom: '-10px',
      right: '-5px',
      width: '25px',
      height: '25px',
      zIndex: 0,
      opacity: 0.6,
      filter: 'brightness(0) saturate(100%) invert(40%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(40%) contrast(100%)',
    },
    endQuote: {
      position: 'absolute',
      top: '-10px',
      left: '-20px',
      width: '25px',
      height: '25px',
      transform: 'rotate(180deg)',
      zIndex: 0,
      opacity: 0.6,
      filter: 'brightness(0) saturate(100%) invert(40%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(40%) contrast(100%)',
    },
    endQuote2: {
      position: 'absolute',
      top: '-10px',
      left: '-5px',
      width: '25px',
      height: '25px',
      transform: 'rotate(180deg)',
      zIndex: 0,
      opacity: 0.6,
      filter: 'brightness(0) saturate(100%) invert(40%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(40%) contrast(100%)',
    },
    imageContainer: {
      flex: '0 0 auto',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '280px',
      height: '280px',
    },
    image: {
      width: '280px',
      height: '280px',
      borderRadius: '50%',
      objectFit: 'cover',
      objectPosition: 'center',
      boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
      display: 'block',
    },
  };

  // --- CSS Media Query for mobile responsiveness ---
  const mediaQueryStyle = `
    @media (max-width: 768px) {
      .voice-item {
        flex-direction: column !important;
        text-align: center !important;
      }
      .text-container {
        max-width: 100% !important;
      }
      .image-container {
        width: 240px !important;
        height: 240px !important;
      }
      .image-container img {
        width: 240px !important;
        height: 240px !important;
      }
    }
  `;

  return (
    <div style={styles.container} id="founder-voice-section">
      <style>{mediaQueryStyle}</style>
      <h2 style={styles.mainHeading}>Voices That Drive Vision</h2>
      <div style={styles.contentWrapper}>
        {voices.map((voice, index) => (
          <div key={index} className="voice-item" style={styles.voiceItem}>
            <div className="text-container" style={styles.textContainer}>
              <div style={styles.quoteWrapper}>
                <img src={require('../images/comma.png')} alt="Opening quote" style={styles.startQuote} />
                <img src={require('../images/comma.png')} alt="Opening quote 2" style={styles.startQuote2} />
                <p style={styles.quoteText}>
                  {voice.quote}
                </p>
                <img src={require('../images/comma.png')} alt="Closing quote" style={styles.endQuote} />
                <img src={require('../images/comma.png')} alt="Closing quote 2" style={styles.endQuote2} />
              </div>
              <div style={styles.authorContainer}>
                <p style={styles.authorName}>{voice.authorName}</p>
                <p style={styles.authorTitle}>{voice.authorTitle}</p>
              </div>
            </div>
            <div className="image-container" style={styles.imageContainer}>
              <img src={voice.image} alt={voice.authorName} style={styles.image} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FounderVoiceSection;
