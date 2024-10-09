import React from 'react';
import { Link } from 'react-router-dom';

export default function Banner() {
  return (
    <div className="relative w-full h-[60vh] md:h-[70vh] lg:h-[80vh]">
      <img
        src='../img/home2.png'
        alt='imagen logotipo'
        className="w-full h-full object-cover filter brightness-50"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 whitespace-pre-line text-center">
          BIENVENIDOS A LA ESC. SEC.<br />ESTATAL NICOLAS BRAVO
        </h1>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-4 text-white text-center">
          Inspirando mentes, construyendo futuros
        </p>
        <Link to="/home/conocenos" className="px-4 py-2 bg-persian-blue-950 hover:bg-blue-700 text-white font-bold rounded-lg text-sm sm:text-base md:text-lg">
          Conócenos
        </Link>
      </div>
    </div>
  );
}
