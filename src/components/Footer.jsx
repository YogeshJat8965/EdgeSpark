import React from 'react';

/**
 * A footer component with company information, links, and contact details.
 * All styles are inline and the component is self-contained.
 */
const Footer = () => {

  // --- Smooth scroll functions ---
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80; // 80px offset from top
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  // --- Inline CSS Styles ---
  const styles = {
    container: {
      width: '100%',
      padding: '60px 40px 40px 40px',
      backgroundColor: '#e8eaf3', // Light lavender background
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      color: '#333d5a', // Default text color
      boxSizing: 'border-box',
    },
    contentWrapper: {
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: '1.5fr 1fr 1fr 1fr',
      gap: '50px',
    },
    logoColumn: {
      gridColumn: 'span 1',
    },
    logo: {
      fontSize: '1.8rem',
      fontWeight: '700',
      color: '#0a0f2c',
      marginBottom: '28px',
      letterSpacing: '-0.5px',
    },
    logoImage: {
      height: '50px',
      marginBottom: '28px',
      display: 'block',
    },
    infoText: {
      fontSize: '0.9rem',
      lineHeight: 1.7,
      marginBottom: '18px',
      color: '#4a5568',
    },
    column: {
      gridColumn: 'span 1',
    },
    heading: {
      fontSize: '1.05rem',
      fontWeight: '700',
      color: '#0a0f2c',
      marginBottom: '20px',
    },
    linkList: {
      listStyle: 'none',
      padding: 0,
      margin: 0,
    },
    linkItem: {
      marginBottom: '12px',
      fontSize: '0.9rem',
      cursor: 'pointer',
      transition: 'color 0.2s ease',
      color: '#4a5568',
    },
    linkItemHover: {
      color: '#0a0f2c',
    },
    addressText: {
        fontSize: '0.9rem',
        lineHeight: 1.7,
        color: '#4a5568',
    },
    presencesContainer: {
        marginTop: '32px'
    },
    presencesText: {
        fontSize: '0.9rem',
        lineHeight: 1.7,
        color: '#4a5568',
    }
  };

  // --- Rendered Component ---
  return (
    <>
      <style>
        {`
          @media (max-width: 992px) {
            .footer-content-wrapper {
              grid-template-columns: 1fr 1fr !important;
              gap: 40px !important;
            }
          }
          @media (max-width: 640px) {
            .footer-content-wrapper {
              grid-template-columns: 1fr !important;
              gap: 35px !important;
            }
          }
        `}
      </style>
      <footer style={styles.container}>
        <div style={styles.contentWrapper} className="footer-content-wrapper">
          
          {/* Column 1: Logo and Info */}
          <div style={styles.logoColumn}>
          <img 
            src={require('../images/Edgespark/Image 6.png')} 
            alt="EdgeSpark Logo" 
            style={styles.logoImage}
          />
          <p style={styles.infoText}>
            EdgeSpark, AI LifeBOT, Appsolutely.ai, CXO TechBOT, and Skillzza are trademarks of the EdgeSpark Group.
          </p>
          <p style={styles.infoText}>
            We uphold ethical innovation, data integrity, and sustainable technology practices across all ventures.
          </p>
        </div>
        
        {/* Column 2: Company Links */}
        <div style={styles.column}>
          <h3 style={styles.heading}>Company</h3>
          <ul style={styles.linkList}>
            <li 
              style={styles.linkItem}
              onClick={() => scrollToSection('about-section')}
              onMouseOver={(e) => e.target.style.color = '#0a0f2c'}
              onMouseOut={(e) => e.target.style.color = '#4a5568'}
            >
              About us
            </li>
            <li 
              style={styles.linkItem}
              onClick={() => scrollToSection('vision-mission-section')}
              onMouseOver={(e) => e.target.style.color = '#0a0f2c'}
              onMouseOut={(e) => e.target.style.color = '#4a5568'}
            >
              Vision & Mission
            </li>
            <li 
              style={styles.linkItem}
              onClick={() => scrollToSection('offerings-section')}
              onMouseOver={(e) => e.target.style.color = '#0a0f2c'}
              onMouseOut={(e) => e.target.style.color = '#4a5568'}
            >
              Our Services
            </li>
            <li 
              style={styles.linkItem}
              onClick={() => scrollToSection('contact-section')}
              onMouseOver={(e) => e.target.style.color = '#0a0f2c'}
              onMouseOut={(e) => e.target.style.color = '#4a5568'}
            >
              Contact Us
            </li>
          </ul>
        </div>

        {/* Column 3: Ventures Links */}
        <div style={styles.column}>
          <h3 style={styles.heading}>Ventures</h3>
          <ul style={styles.linkList}>
            <li style={styles.linkItem}>
              <a 
                href="https://www.ailifebot.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{textDecoration: 'none', color: 'inherit'}}
                onMouseOver={(e) => e.currentTarget.style.color = '#0a0f2c'}
                onMouseOut={(e) => e.currentTarget.style.color = '#4a5568'}
              >
                AI LifeBOT
              </a>
            </li>
            <li style={styles.linkItem}>
              <a 
                href="https://appsolutely.ai/" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{textDecoration: 'none', color: 'inherit'}}
                onMouseOver={(e) => e.currentTarget.style.color = '#0a0f2c'}
                onMouseOut={(e) => e.currentTarget.style.color = '#4a5568'}
              >
                Appsolutely.ai
              </a>
            </li>
            <li style={styles.linkItem}>
              <a 
                href="https://cxotechbot.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{textDecoration: 'none', color: 'inherit'}}
                onMouseOver={(e) => e.currentTarget.style.color = '#0a0f2c'}
                onMouseOut={(e) => e.currentTarget.style.color = '#4a5568'}
              >
                CXO TechBOT
              </a>
            </li>
            <li style={styles.linkItem}>
              <a 
                href="https://skillzza.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{textDecoration: 'none', color: 'inherit'}}
                onMouseOver={(e) => e.currentTarget.style.color = '#0a0f2c'}
                onMouseOut={(e) => e.currentTarget.style.color = '#4a5568'}
              >
                Skillzza
              </a>
            </li>
          </ul>
        </div>

        {/* Column 4: Office and Presences */}
        <div style={styles.column}>
          <h3 style={styles.heading}>Corporate Office</h3>
          <p style={styles.addressText}>
            WeWork India, Chromium, Cts No. 106/1-5,
            Jogeshwari-Vikhroli Link Road, Milind Nagar,
            Powai, Mumbai - 400076
          </p>
          <div style={styles.presencesContainer}>
            <h3 style={styles.heading}>Our Presences</h3>
            <p style={styles.presencesText}>
              Mumbai | Thane | Raipur | Delhi
            </p>
          </div>
        </div>

      </div>
    </footer>
    </>
  );
};

export default Footer;