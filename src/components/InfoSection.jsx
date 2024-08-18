import React from 'react';
import { Link } from 'react-router-dom';

const InfoSection = ({ imageUrl, title, text, imageLeft, showButton }) => {
  return (
    <div className="w-full">
      <div className={`flex flex-col items-center my-8 w-full md:flex-row ${imageLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
        <img src={imageUrl} alt="info" className="w-full md:w-1/2 h-80 md:h-96 object-cover mx-4 mb-4 md:mb-0" />
        <div className="w-full md:w-1/2 text-lg p-4 text-center md:text-left">
          <h2 className="text-2xl font-bold mb-2">{title}</h2>
          <p>{text}</p>
          {showButton && (
            <div className="text-center mt-4">
              <Link to="/home/alumnos">
                <button className="px-4 py-2 bg-persian-blue-950 hover:bg-blue-700 text-white font-bold rounded-lg">
                  Mas informacion
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
      <hr className="w-full border-t-8 border-persian-blue-950 mt-4" />
    </div>
  );
};

export default InfoSection;
