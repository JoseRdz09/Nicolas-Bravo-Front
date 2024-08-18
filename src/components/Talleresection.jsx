import React from 'react';

const TallerCard = ({ title, description, image }) => {
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

const TalleresSection = () => {
  const talleres = [
    {
      title: 'Informática',
      description: 'Aprende sobre programación, redes y más en nuestro taller de informática.',
      image: 'https://via.placeholder.com/400x200.png?text=Informática',
    },
    {
      title: 'Carpintería',
      description: 'Descubre el arte de trabajar con madera en nuestro taller de carpintería.',
      image: 'https://via.placeholder.com/400x200.png?text=Carpintería',
    },
  ];

  return (
    <section className="py-10 bg-gray-100 w-full">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
          Talleres de la Secundaria
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {talleres.map((taller, index) => (
            <TallerCard
              key={index}
              title={taller.title}
              description={taller.description}
              image={taller.image}
            />
          ))}
        </div>
      </div>
      <hr className="w-full border-t-8 border-persian-blue-950 mt-8" />
    </section>
  );
};

export default TalleresSection;
