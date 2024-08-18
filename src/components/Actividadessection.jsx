import React from 'react';

const ActividadCard = ({ title, description, image }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-2 text-gray-800">{title}</h3>
        <p className="text-gray-700">{description}</p>
      </div>
    </div>
  );
};

const ActividadesSection = () => {
  const actividades = [
    {
      title: 'Escolta',
      description: 'Participa en la escolta y representa a la escuela en eventos importantes.',
      image: 'https://via.placeholder.com/400x200.png?text=Escolta',
    },
    {
      title: 'Fútbol',
      description: 'Únete al equipo de fútbol y mejora tus habilidades deportivas.',
      image: 'https://via.placeholder.com/400x200.png?text=Fútbol',
    },
    {
      title: 'Ajedrez',
      description: 'Desarrolla tu mente y estrategia en nuestro club de ajedrez.',
      image: 'https://via.placeholder.com/400x200.png?text=Ajedrez',
    },
    {
      title: 'Ludoteca',
      description: 'Disfruta de juegos y actividades recreativas en nuestra ludoteca.',
      image: 'https://via.placeholder.com/400x200.png?text=Ludoteca',
    },
  ];

  return (
    <section className="py-10 bg-gray-100 w-full">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
          Actividades de la Secundaria
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {actividades.map((actividad, index) => (
            <ActividadCard
              key={index}
              title={actividad.title}
              description={actividad.description}
              image={actividad.image}
            />
          ))}
        </div>
      </div>
      <hr className="w-full border-t-8 border-persian-blue-950 mt-8" />
    </section>
  );
};

export default ActividadesSection;
