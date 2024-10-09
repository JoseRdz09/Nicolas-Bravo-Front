import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6 w-full" id="contactanos">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:justify-between">
          <div className="flex flex-col items-center md:items-start mb-4 md:mb-0">
            <img src="../img/Logo.png" alt="Logo" className="w-32 h-auto mb-4" />
            <h3 className="text-xl font-bold">Escuela Secundaria Nicolás Bravo</h3>
            <p className="text-center md:text-left">
              Clave: 10EES0012A
            </p>
            <p className="text-center md:text-left">
              Dirección: Calle Falsa 123, Colonia Centro, Durango, Dgo, México
            </p>
          </div>
          <div className="flex flex-col items-center md:items-start"> {/* Mantenida la clase md:items-start para alinear a la izquierda */}
            <h2 className="text-2xl font-bold mb-4">Contáctanos</h2>
            <p className="mb-4">
              Si tienes alguna pregunta o necesitas más información, no dudes en contactarnos.
            </p>
            <p>
              Email: <a href="mailto:Nicolasbravo@edu.com.mx" className="text-blue-400 hover:underline">Nicolasbravo@edu.com.mx</a>
            </p>
            <p>
              Teléfono: <a href="tel:+52618000000" className="text-blue-400 hover:underline">+52 (618) 000-000</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
