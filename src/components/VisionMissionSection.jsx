import React from 'react';

// Import icons
import visionIcon from '../images/Path 8.svg';
import missionIcon from '../images/target_4147788.svg';

/**
 * A "Vision and Mission" section component with a multi-column layout.
 * All styles are inline for easy integration.
 * The image is a placeholder, which you should replace with your own asset.
 */
const VisionMissionSection = () => {

  // --- Icon Components ---
  const VisionIcon = () => (
    <img 
      src={visionIcon} 
      alt="Vision" 
      style={{width: '64px', height: '64px', objectFit: 'contain'}} 
    />
  );

  const MissionIcon = () => (
    <img 
      src={missionIcon} 
      alt="Mission" 
      style={{width: '64px', height: '64px', objectFit: 'contain'}} 
    />
  );


  // --- Inline CSS Styles ---
  const styles = {
    container: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '80px 50px',
      backgroundColor: '#0a0f2c', // Dark blue background
      backgroundImage: 'radial-gradient(ellipse 50% 50% at 80% 20%, rgba(46, 49, 146, 0.3), transparent)',
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      color: '#e0e0e0', // Light text color
      boxSizing: 'border-box',
    },
    heading: {
      fontSize: 'clamp(2.5rem, 6vw, 3.5rem)',
      fontWeight: '600',
      lineHeight: 1.2,
      marginBottom: '60px',
      textAlign: 'left',
      maxWidth: '1200px',
      margin: '0 auto 60px auto',
      width: '100%',
    },
    contentGrid: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      gap: '40px',
      maxWidth: '1200px',
      width: '100%',
      margin: '0 auto',
      flexWrap: 'wrap', // Allows columns to stack on smaller screens
    },
    imageColumn: {
      flex: '2',
      minWidth: '400px',
    },
    textColumnsWrapper: {
      flex: '2',
      display: 'flex',
      gap: '40px',
      flexWrap: 'wrap',
    },
    visionMissionItem: {
      flex: 1,
      minWidth: '250px',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
    },
    missionItem: {
      flex: 1,
      minWidth: '250px',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      marginTop: '60px', // Position mission lower than vision
    },
    itemHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '20px'
    },
    itemHeading: {
      fontSize: '20px',
      fontWeight: '600',
      color: '#ffffff',
      margin: 0,
    },
    itemText: {
      fontSize: '15px', // Increased from 15px
      lineHeight: 1.7,
      margin: 0,
      opacity: 0.8,
    },
    image: {
      width: '100%',
      height: 'auto',
      borderRadius: '12px',
      objectFit: 'cover',
    },
  };

  const mediaQueryStyle = `
    @media (max-width: 992px) {
      .vision-container {
        padding: 60px 30px !important;
      }
      .vision-content-grid {
        flex-direction: column !important;
        gap: 40px !important;
      }
      .vision-image-column,
      .vision-text-columns-wrapper {
        min-width: 100% !important;
      }
      .vision-mission-item {
        margin-top: 0 !important;
      }
    }
    @media (max-width: 640px) {
      .vision-container {
        padding: 50px 20px !important;
      }
      .vision-heading {
        font-size: 2rem !important;
        margin-bottom: 40px !important;
      }
      .vision-text-columns-wrapper {
        gap: 30px !important;
      }
      .vision-mission-item,
      .vision-mission-item-2 {
        min-width: 100% !important;
      }
    }
  `;

  // --- Rendered Component ---
  return (
    <div style={styles.container} id="vision-mission-section" className="vision-container">
      <style>{mediaQueryStyle}</style>
      <h2 style={styles.heading} className="vision-heading">
        Driven by Purpose. <br /> Fueled by Innovation..
      </h2>
      <div style={styles.contentGrid} className="vision-content-grid">
        <div style={styles.imageColumn} className="vision-image-column">
          <img
            src={require('../images/global-team-discussing-business-strategy.png')}
            alt="Mission"
            style={styles.image}
          />
        </div>
        <div style={styles.textColumnsWrapper} className="vision-text-columns-wrapper">
          <div style={styles.visionMissionItem} className="vision-mission-item">
            <div style={styles.itemHeader}>
              <VisionIcon />
              <h3 style={styles.itemHeading}>Our Vision</h3>
            </div>
            <p style={styles.itemText}>
              To lead the next wave of global transformation by delivering AI-driven, human-centered, and sustainable solutions that redefine industries, enhance enterprise resilience, and create meaningful impact for people and the planet.
            </p>
          </div>
          <div style={styles.missionItem} className="vision-mission-item-2">
            <div style={styles.itemHeader}>
              <MissionIcon />
              <h3 style={styles.itemHeading}>Our MISSION</h3>
            </div>
            <p style={styles.itemText}>
              Our mission is to empower organizations and communities with intelligent systems, inclusive innovation, and solutions that unlock growth, adaptability, and long-term value in a rapidly changing world.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisionMissionSection;
