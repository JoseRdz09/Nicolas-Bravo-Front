import React from 'react';

const Location = () => {
  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl text-center font-bold mb-8">Ubicación de la Secundaria</h2>
      <div className="flex justify-center">
        <iframe
          className="w-full h-96 rounded-lg shadow-lg"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3643.6395419331675!2d-104.60202772480312!3d24.043773078471357!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x869bb74269ad72f9%3A0xd8d798643c4325f1!2sEscuela%20secundaria%20Nicol%C3%A1s!5e0!3m2!1ses-419!2smx!4v1720894082280!5m2!1ses-419!2smx"
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default Location;
