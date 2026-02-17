import React, { useEffect, useState, useRef } from 'react';

const AnimatedNumber = ({ value, duration = 2200, animate }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!animate) {
      setCount(0);
      return;
    }
    const target = parseInt(value.replace(/\D/g, ''), 10);
    if (!target) return setCount(value);
    let start = 0;
    const increment = Math.ceil(target / (duration / 40)); // slower
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(start + '+');
      }
    }, 40);
    return () => clearInterval(timer);
  }, [value, duration, animate]);

  return <span>{count}</span>;
};

const StatsSection = () => {
  const sectionRef = useRef(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true);
        } else {
          setAnimate(false);
        }
      },
      { threshold: 0.4 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const stats = [
    { number: '200+', line1: 'Clients Served', line2: 'Globally' },
    { number: '50+', line1: 'Experts &', line2: 'Innovators' },
    { number: '10+', line1: 'Countries', line2: '& Regions' },
    { number: '25+', line1: 'Years of Core Tech', line2: 'Expertise' },
  ];

  const styles = {
    container: {
      width: '100%',
      padding: '80px 50px',
      backgroundColor: '#0a0f2c',
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      color: '#ffffff',
      boxSizing: 'border-box',
    },
    contentWrapper: {
      maxWidth: '1100px',
      margin: '0 auto',
      textAlign: 'center',
    },
    heading: {
      fontSize: 'clamp(2.2rem, 5vw, 3rem)',
      fontWeight: '600',
      lineHeight: 1.2,
      marginBottom: '60px',
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '40px 20px',
      textAlign: 'left',
    },
    statItem: {
      display: 'flex',
      flexDirection: 'column',
    },
    statNumber: {
      fontSize: 'clamp(3rem, 8vw, 4.25rem)',
      fontWeight: '600',
      lineHeight: 1.1,
      marginBottom: '12px',
      color: '#f0f0f0',
      margin: 0,
    },
    statText: {
      fontSize: '17px',
      lineHeight: 1.5,
      color: '#d0d0d0',
      margin: 0,
    },
  };

  const mediaQueryStyle = `
    @media (max-width: 768px) {
      .stats-container {
        padding: 60px 30px !important;
      }
      .stats-grid {
        grid-template-columns: repeat(2, 1fr) !important;
        gap: 30px 15px !important;
      }
      .stat-item {
        text-align: center !important;
      }
    }
    @media (max-width: 480px) {
      .stats-container {
        padding: 50px 20px !important;
      }
      .stats-grid {
        grid-template-columns: 1fr !important;
        gap: 25px !important;
      }
      .stats-heading {
        margin-bottom: 40px !important;
      }
    }
  `;

  return (
    <div style={styles.container} ref={sectionRef} className="stats-container">
      <style>{mediaQueryStyle}</style>
      <div style={styles.contentWrapper}>
        <h2 style={styles.heading} className="stats-heading">From Spark to Scale</h2>
        <div style={styles.statsGrid} className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} style={styles.statItem} className="stat-item">
              <p style={styles.statNumber}>
                <AnimatedNumber value={stat.number} duration={2200} animate={animate} />
              </p>
              <p style={styles.statText}>
                {stat.line1} <br /> {stat.line2}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsSection;