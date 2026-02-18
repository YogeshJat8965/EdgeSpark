import React, { useState, useEffect, useRef } from 'react';

const ventures = [
  {
    logo: require('../images/Edgespark/Ailifebot.png'),
    name: 'AI LifeBOT',
    description: 'GenAI-powered automation suite that revolutionizes customer service through Conversational AI, intelligent agents, and workflow automation.',
    url: 'https://www.ailifebot.com/',
  },
  {
    logo: require('../images/Edgespark/Gemini_Generated_Image_xkrmc5xkrmc5xkrm.png'),
    name: 'Appsolutely',
    description: 'A premier AI consulting and development firm helping businesses accelerate digital transformation, automate complex processes, and unlock operational efficiency.',
    url: 'https://appsolutely.ai/',
  },
  {
    logo: require('../images/Edgespark/Image 6.png'),
    name: 'CXO TechBOT',
    description: 'A leading tech media platform fostering thought leadership through CXO insights, innovation summits, and industry-focused content.',
    url: 'https://cxotechbot.com/',
  },
  {
    logo: require('../images/Edgespark/Image 7.png'),
    name: 'SKILLZ4',
    description: 'An AI-powered skilling and workforce development platform focused on future-ready learning, enabling upskilling, reskilling, and immersive job simulations for the next-gen workforce.',
    url: 'https://skillzza.com/',
  },
];

const VentureCard = ({ logo, name, description, url, isVisible, index }) => {
  const cardStyle = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible 
      ? 'translate3d(0, 0, 0) scale(1)' 
      : `translate3d(${index % 2 === 0 ? '-60px' : '60px'}, 40px, 0) scale(0.95)`,
    transition: `all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.15}s`,
  };

  return (
    <div className="venture-card" style={cardStyle}>
      <div className="card-content">
        <div className="card-logo">
          <img src={logo} alt={`${name} logo`} />
        </div>
        <div className="card-text-content">
          <p className="card-description">{description}</p>
        </div>
      </div>
      <a href={url} target="_blank" rel="noopener noreferrer" className="card-arrow-link">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="arrow-icon"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
        </svg>
      </a>
    </div>
  );
};

function InnovationEcosystem() {
  const [visibleCards, setVisibleCards] = useState([]);
  const cardRefs = useRef([]);

  // IntersectionObserver for scroll animations
  useEffect(() => {
    const observers = [];

    cardRefs.current.forEach((ref, index) => {
      if (ref) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setVisibleCards((prev) => [...new Set([...prev, index])]);
              } else {
                setVisibleCards((prev) => prev.filter((i) => i !== index));
              }
            });
          },
          { threshold: 0.2, rootMargin: '-30px' }
        );

        observer.observe(ref);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  return (
    <>
      <style>
        {`
          * {
            box-sizing: border-box; /* Ensure all elements use border-box sizing */
          }

          body {
            font-family: 'Inter', sans-serif; /* A common modern sans-serif font */
            margin: 0;
            padding: 0;
            background-color: #f7f8fa; /* Changed to card color */
            overflow-x: hidden; /* Prevent horizontal scroll */
          }

          .app-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 40px 20px;
            margin-bottom: 60px; /* Space at the bottom of the page */
            overflow-x: hidden; /* Prevent horizontal overflow */
          }

          .header-section {
            text-align: center;
            margin-bottom: 60px;
          }

          .main-heading {
            font-size: 2.5rem;
            font-weight: 700; /* Bold */
            color: #1a202c; /* Dark text */
            margin-bottom: 16px; /* Space below heading */
          }

          .sub-heading {
            font-size: 1.1rem; /* Increased from 1rem */
            color: #4a5568; /* Grey text */
            max-width: 1000px;
            margin: 0 auto;
            line-height: 1.6;
            font-weight: 700; /* Bold */
          }

          .ventures-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            grid-auto-rows: 1fr; /* Make all rows the same height */
          }

          .card-wrapper {
            height: 100%; /* Ensure wrapper takes full grid cell height */
          }

          @media (max-width: 768px) {
            .ventures-grid {
              grid-template-columns: 1fr;
            }
            
            .main-heading {
              font-size: 2rem;
            }
            
            .sub-heading {
              font-size: 1rem;
            }
          }

          /* --- Venture Card Styling --- */
          .venture-card {
            position: relative; /* For absolute positioning of the arrow */
            display: flex;
            flex-direction: column;
            padding: 24px; /* Padding inside the card */
            background-color: #ffffff; /* Changed to white (section background color) */
            border-radius: 12px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.05); /* Subtle shadow */
            transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
            height: 100%; /* Take full height of grid cell */
          }

          .venture-card:hover {
            transform: translateY(-3px); /* Slight lift on hover */
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06);
          }

          .card-content {
            display: flex;
            align-items: center; /* Vertically center items */
            gap: 20px; /* Increased space between logo and text */
            flex: 1;
            padding-right: 50px; /* Space for arrow button */
          }

          .card-logo {
            flex-shrink: 0; /* Prevent logo from shrinking */
            width: 140px; /* Increased width for logo container */
            display: flex;
            align-items: center; /* Center logo vertically */
            justify-content: center; /* Center logo horizontally */
            overflow: hidden; /* Clip zoomed image edges */
          }

          .card-logo img {
            width: 130px; /* Increased width for logos */
            height: 150px; /* Maintain aspect ratio */
            max-height: 100px; /* Increased max height for logos */
            display: block; /* Remove extra space below image */
            object-fit: cover; /* Crop image to fill container */
            transform: scale(1.15); /* Reduced zoom to prevent text cutoff */
          }

          .card-text-content {
            flex: 1; /* Take remaining space */
            display: flex;
            align-items: center; /* Center text vertically */
            overflow: hidden; /* Prevent text overflow */
          }

          .card-description {
            font-size: 0.9rem; /* Adjusted font size */
            color: #000000; /* Changed to black */
            line-height: 1.4;
            margin: 0; /* Remove default margin */
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 5; /* Limit to 5 lines */
            -webkit-box-orient: vertical;
          }

          .card-arrow-link {
            position: absolute;
            bottom: 24px; /* Distance from bottom of the card */
            right: 24px; /* Distance from right of the card */
            display: flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: #11153f; /* Dark blue background for the circle */
            color: #ffffff; /* White arrow icon */
            text-decoration: none; /* Remove underline from link */
            transition: background-color 0.3s ease-in-out, transform 0.3s ease-in-out;
          }

          .venture-card:hover .card-arrow-link {
            background-color: #1a1f4f; /* Slightly lighter blue on hover */
            transform: translateX(3px) translateY(-3px); /* Move towards top-right */
          }

          .arrow-icon {
            width: 20px;
            height: 20px;
            stroke-width: 2.5; /* Make arrow slightly bolder */
            transition: transform 0.3s ease-in-out;
            transform: rotate(-45deg); /* Point 45 degrees up */
          }

          .venture-card:hover .arrow-icon {
            transform: rotate(-45deg) scale(1.15); /* Keep 45 degree angle and scale up on hover */
          }

          /* --- Mobile Layout (Phone Screen) --- */
          @media (max-width: 480px) {
            .app-container {
              padding: 40px 15px; /* Reduced horizontal padding to make more space */
            }

            .venture-card {
              min-height: auto;
              padding: 0; /* Remove padding for mobile stacked layout */
              width: 100%; /* Ensure full width */
              max-width: 100%; /* Prevent overflow */
            }

            .card-content {
              flex-direction: column; /* Stack image on top, text below */
              align-items: stretch;
              gap: 0;
              padding-right: 0;
              width: 100%; /* Full width */
            }

            .card-logo {
              width: 100%; /* Full width for mobile */
              padding: 10px 8px; /* Further reduced padding for more compact card */
              background-color: #ffffff; /* Changed to white (section background color) */
              border-radius: 12px 12px 0 0; /* Round top corners only */
              justify-content: center;
              display: flex;
              align-items: center;
              min-height: 100px; /* Further reduced height for more compact cards */
              overflow: hidden; /* Clip zoomed image edges */
            }

            .card-logo img {
              width: min(170px, 72vw); /* Further reduced image size */
              height: min(120px, 52vw); /* Further reduced height */
              max-width: 72vw; /* Further reduced max width */
              max-height: 52vw; /* Further reduced max height */
              object-fit: cover; /* Crop image to fill container and cut white edges */
              transform: scale(1.4); /* Zoom image to crop white space around logo */
            }

            .card-text-content {
              padding: 12px 12px 46px 12px; /* Reduced padding for more compact card */
              background-color: #f7f8fa; /* Changed to card background color */
              border-radius: 0 0 12px 12px; /* Round bottom corners only */
              align-items: flex-start; /* Align text to start */
              width: 100%; /* Full width */
            }

            .card-description {
              text-align: left; /* Left align text */
              font-size: 0.82rem; /* Optimized font size */
              line-height: 1.45;
              width: 100%; /* Full width for text */
              padding-right: 10px; /* Extra padding to prevent arrow overlap */
            }

            .card-arrow-link {
              bottom: 14px; /* Adjust position for mobile */
              right: 14px;
              width: 34px; /* Slightly smaller on mobile */
              height: 34px;
            }

            .arrow-icon {
              width: 18px;
              height: 18px;
            }
          }
        `}
      </style>

      <div className="app-container" id="innovation-ecosystem">
        <div className="header-section">
          <h1 className="main-heading">Explore Our Innovation <br /> Ecosystem</h1>
          <p className="sub-heading">
            From AI automation to media excellence, our several innovative ventures are built to reshape industries. <br />Each venture is mission-driven, impact-oriented, and future-ready.
          </p>
        </div>

        <div className="ventures-grid">
          {ventures.map((venture, index) => (
            <div key={index} className="card-wrapper" ref={(el) => (cardRefs.current[index] = el)}>
              <VentureCard
                logo={venture.logo}
                name={venture.name}
                description={venture.description}
                url={venture.url}
                isVisible={visibleCards.includes(index)}
                index={index}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default InnovationEcosystem;