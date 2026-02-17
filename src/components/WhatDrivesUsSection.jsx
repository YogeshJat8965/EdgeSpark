import React from 'react';

// Import SVGs directly at the top
import innovationIcon from '../images/1.svg';
import excellenceIcon from '../images/2.svg';
import clientCentricIcon from '../images/3.svg';
import collaborativeIcon from '../images/4.svg';
import sustainabilityIcon from '../images/5.svg';
import empowermentIcon from '../images/6.svg';

const values = [
  {
    icon: <img src={innovationIcon} alt="Innovation" style={{width: 48, height: 48}} />,
    title: 'Innovation',
    description: 'We pioneer bold ideas and next-gen technologies that disrupt the ordinary and shape what\'s next.',
  },
  {
    icon: <img src={excellenceIcon} alt="Excellence" style={{width: 48, height: 48}} />,
    title: 'Excellence',
    description: 'We uphold uncompromising standards, delivering solutions with precision, integrity, and measurable impact.',
  },
  {
    icon: <img src={clientCentricIcon} alt="Client-Centric Approach" style={{width: 48, height: 48}} />,
    title: 'Client-Centric Approach',
    description: 'We design with purpose putting client challenges at the center of every solution we create.',
  },
  {
    icon: <img src={collaborativeIcon} alt="Collaborative Leadership" style={{width: 48, height: 48}} />,
    title: 'Collaborative Leadership',
    description: 'We believe in the power of collective intelligence driving transformation through shared vision and unified action.',
  },
  {
    icon: <img src={sustainabilityIcon} alt="Sustainability" style={{width: 48, height: 48}} />,
    title: 'Sustainability',
    description: 'We build with foresight, ensuring our solutions fuel progress while preserving the planet for future generations.',
  },
  {
    icon: <img src={empowermentIcon} alt="Empowerment" style={{width: 48, height: 48}} />,
    title: 'Empowerment',
    description: 'We unlock potential at every level elevating individuals, enabling teams, and uplifting communities through inclusive innovation.',
  },
];

const ValueCard = ({ icon, title, description }) => (
  <div className="value-card">
    <div className="card-icon">{icon}</div>
    <h3 className="card-title">{title}</h3>
    <p className="card-description">{description}</p>
  </div>
);

function WhatDrivesUsSection() {
  return (
    <>
      <style>
        {`
          /* Font import - You might need to add this to your public/index.html or global CSS */
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');

          .what-drives-us-container {
            font-family: 'Inter', sans-serif;
            background-color: #EFF1FC;
            padding: 80px 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .section-header {
            text-align: center;
            margin-bottom: 60px;
            max-width: 800px;
          }

          .section-title {
            font-size: 3.5rem;
            font-weight: 900;
            color: #1a202c;
            margin-bottom: 16px;
            line-height: 1.2;
            letter-spacing: 0.5px;
          }

          .section-description {
            font-size: 2.1rem !important;
            color: #4a5568;
            line-height: 1.7;
            font-weight: 700; /* Bold */
          }

          .values-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 28px;
            max-width: 1200px;
            width: 100%;
          }

          @media (max-width: 1024px) {
            .values-grid {
              grid-template-columns: repeat(2, 1fr);
              gap: 20px;
            }
          }

          @media (max-width: 768px) {
            .values-grid {
              grid-template-columns: 1fr;
              gap: 16px;
            }
            .section-title {
              font-size: 2rem;
            }
            .section-description {
              font-size: 1.05rem;
            }
            .what-drives-us-container {
              padding: 50px 20px;
            }
            .value-card {
              padding: 28px;
              min-height: auto;
            }
          }

          @media (max-width: 480px) {
            .section-title {
              font-size: 1.75rem;
            }
            .section-description {
              font-size: 0.95rem !important;
            }
            .card-title {
              font-size: 1.2rem !important;
            }
            .card-description {
              font-size: 0.95rem;
            }
          }

          .value-card {
            background-color: #ffffff;
            border-radius: 14px;
            padding: 36px;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.05);
            transition: transform 0.3s cubic-bezier(.25,.8,.25,1), box-shadow 0.3s cubic-bezier(.25,.8,.25,1);
            min-height: 240px;
            position: relative;
            overflow: hidden;
          }

          .value-card:hover {
            transform: translateY(-6px) scale(1.03);
            box-shadow: 0 8px 24px rgba(0,0,0,0.12), 0 2px 4px rgba(0,0,0,0.08);
          }

          .card-icon {
            width: 56px;
            height: 56px;
            margin-bottom: 28px;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: iconEntrance 0.8s cubic-bezier(.25,.8,.25,1);
            transition: transform 0.3s cubic-bezier(.25,.8,.25,1);
          }

          .card-icon img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            filter: brightness(0); /* Make icons black */
          }

          .value-card:hover .card-icon {
            transform: scale(1.15) rotate(-8deg);
            filter: drop-shadow(0 4px 12px rgba(59,130,246,0.25));
          }

          .value-card:hover .card-icon img {
            filter: brightness(0); /* Keep icons black on hover */
          }

          @keyframes iconEntrance {
            0% { opacity: 0; transform: scale(0.7) translateY(-20px); }
            100% { opacity: 1; transform: scale(1) translateY(0); }
          }

          .card-title { 
            font-size: 1.4rem !important;
            font-weight: 700 !important;
            color: #000000 !important; /* Black */
            margin-bottom: 14px;
            line-height: 1.3;
            letter-spacing: 0.3px;
          }

          .card-description {
            font-size: 1.08rem;
            color: #000000; /* Black */
            line-height: 1.7;
          }
        `}
      </style>
      <div className="what-drives-us-container" id="about-section">
        <div className="section-header">
          <h2 className="section-title">What Drives Us</h2>
          <p className="section-description">
            Our values guide every decision we make, every product we build,
            and every partnership we form.
          </p>
        </div>

        <div className="values-grid">
          {values.map((value, index) => (
            <ValueCard
              key={index}
              icon={value.icon}
              title={value.title}
              description={value.description}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default WhatDrivesUsSection;