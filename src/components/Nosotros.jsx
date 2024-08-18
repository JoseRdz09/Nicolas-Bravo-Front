import React from 'react';

const SchoolInfo = () => {
  const sections = [
    {
      title: 'Misión y Visión',
      image: '../img/imgp.png', // Imagen compartida
      subtitle: 'Misión',
      text1: 'En la Secundaria Nicolás Bravo, nos comprometemos a proporcionar una educación integral y de calidad, fomentando el desarrollo académico, personal y social de nuestros estudiantes. Nos esforzamos por crear un entorno inclusivo y seguro donde cada estudiante pueda explorar sus talentos y habilidades, desarrollando un sentido de responsabilidad y respeto hacia sí mismos, los demás y su entorno.',
      subtitle2: 'Visión',
      text2: 'Ser una institución educativa líder, reconocida por su excelencia académica y su compromiso con la formación de ciudadanos íntegros y competentes. Aspiramos a ser un referente en innovación pedagógica, promoviendo el pensamiento crítico, la creatividad y el aprendizaje continuo. Nuestra visión es empoderar a nuestros estudiantes para que sean agentes de cambio positivo en sus comunidades y en el mundo.',
    },
    {
      title: 'Objetivo Social',
      image: '../img/imgp.png',
      text: 'Fomentar el desarrollo de una comunidad escolar inclusiva y solidaria, donde todos los estudiantes, docentes y personal administrativo se sientan valorados y respetados. Promover la participación activa en iniciativas comunitarias y proyectos de servicio social que fortalezcan los lazos entre la escuela y la comunidad local, contribuyendo al bienestar y al desarrollo sostenible de nuestro entorno.',
    },
    {
      title: 'Principios',
      image: '../img/imgp.png',
      principles: [
        {
          subtitle: 'Inclusión',
          text: 'Nos comprometemos a garantizar que todos los estudiantes, independientemente de sus antecedentes, habilidades o circunstancias, tengan acceso a una educación de calidad y oportunidades equitativas.',
        },
        {
          subtitle: 'Equidad',
          text: 'Promovemos un trato justo y equitativo para todos los miembros de nuestra comunidad escolar, asegurando que cada estudiante reciba el apoyo necesario para alcanzar su máximo potencial.',
        },
        {
          subtitle: 'Integridad',
          text: 'Actuamos con honestidad y transparencia en todas nuestras acciones y decisiones, fomentando un ambiente de confianza y respeto mutuo.',
        },
        {
          subtitle: 'Excelencia',
          text: 'Nos esforzamos por alcanzar la excelencia en todos los aspectos de nuestra labor educativa, desde la enseñanza y el aprendizaje hasta la gestión y administración escolar.',
        },
        {
          subtitle: 'Sostenibilidad',
          text: 'Nos comprometemos a ser una institución responsable con el medio ambiente, promoviendo prácticas sostenibles y educando a nuestros estudiantes sobre la importancia de cuidar nuestro planeta.',
        },
        {
          subtitle: 'Desarrollo Integral',
          text: 'Creemos en la educación integral de nuestros estudiantes, promoviendo no solo el desarrollo académico, sino también el crecimiento personal, social y emocional.',
        },
        {
          subtitle: 'Colaboración',
          text: 'Fomentamos el trabajo en equipo y la colaboración entre estudiantes, docentes, familias y la comunidad, reconociendo que juntos podemos lograr más.',
        },
      ],
    },
  ];

  return (
    <div className="container mx-auto p-6 mt-10"> {/* mt-20 para asegurar que el contenido aparezca debajo del navbar */}
      {sections.map((section, index) => (
        <div key={index} className="my-8 text-left">
          <img src={section.image} alt={section.title} className="w-full h-96 object-cover rounded-md shadow-md mb-4" />
          <h2 className="text-2xl font-bold mb-2">{section.title}</h2>
          {section.subtitle && <h3 className="text-xl font-semibold mb-2">{section.subtitle}</h3>}
          {section.text1 && <p className="text-lg mb-4">{section.text1}</p>}
          {section.subtitle2 && <h3 className="text-xl font-semibold mb-2">{section.subtitle2}</h3>}
          {section.text2 && <p className="text-lg mb-4">{section.text2}</p>}
          {section.text && !section.text1 && !section.text2 && <p className="text-lg mb-4">{section.text}</p>}
          {section.principles && (
            <div>
              {section.principles.map((principle, idx) => (
                <div key={idx} className="mb-4">
                  <h4 className="text-xl font-semibold">{principle.subtitle}</h4>
                  <p className="text-lg">{principle.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SchoolInfo;
