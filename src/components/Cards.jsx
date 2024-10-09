import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import clienteAxios from '../config/axios';
import { useAuth } from '../hooks/useAuth';
import Alert from '../components/Alert'; // Asegúrate de que Alert esté en el mismo directorio
import { ClipLoader } from 'react-spinners'; // Importa el spinner deseado

const ImageCard = ({ imageSrc, title, link }) => (
  <a href={link || '#'} target="_blank" rel="noopener noreferrer" className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden block group">
    <img 
      src={imageSrc} 
      alt={title || 'Sin título'} 
      className="object-cover w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:brightness-75" 
    />
    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-center p-2">
      {title || 'Sin título'}
    </div>
  </a>
);

const Cards = () => {
  const { user } = useAuth({ middleware: 'auth' });
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [image, setImage] = useState(null);
  const [pdfLink, setPdfLink] = useState('');
  const [error, setError] = useState('');
  const [alert, setAlert] = useState(null); // Estado para alertas
  const [loading, setLoading] = useState(true); // Estado para el spinner de carga inicial
  const [saving, setSaving] = useState(false); // Estado para el spinner de guardado

  const location = useLocation();  // Obtén la ruta actual

  const fetchCards = () => {
    clienteAxios.get('/api/cards')
      .then(response => {
        if (Array.isArray(response.data)) {
          setCards(response.data);
        } else {
          console.error('La respuesta de la API no es una lista:', response.data);
        }
        setLoading(false); // Ocultar spinner después de obtener las tarjetas
      })
      .catch(error => {
        console.error('Error al obtener las tarjetas:', error);
        setLoading(false); // Ocultar spinner en caso de error
      });
  };

  useEffect(() => {
    fetchCards();  
  }, []);

  const handleEditClick = (card) => {
    setSelectedCard(card);
    setImage(null);
    setPdfLink(card.pdfLink);
  };

  const handleSaveChanges = () => {
    if (selectedCard) {
      setSaving(true); // Mostrar spinner de guardado
      const formData = new FormData();
      if (image) {
        formData.append('image', image);
      }
      formData.append('title', selectedCard.title);
      formData.append('pdfLink', pdfLink);

      clienteAxios.post(`/api/cards/${selectedCard.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('AUTH_TOKEN')}`
        },
      })
      .then(response => {
        console.log('Tarjeta actualizada:', response.data);
        fetchCards(); 
        setSelectedCard(null);
        setImage(null);
        setAlert({ message: 'Tarjeta actualizada con éxito', type: 'success' });
        setTimeout(() => setAlert(null), 3000); // Ocultar la alerta después de 3 segundos
      })
      .catch(error => {
        console.error('Error al actualizar la tarjeta:', error);
        setAlert({ message: 'Error al actualizar la tarjeta', type: 'error' });
        setTimeout(() => setAlert(null), 3000); // Ocultar la alerta después de 3 segundos
      })
      .finally(() => {
        setSaving(false); // Ocultar spinner de guardado
      });
    }
  };

  const handleImageUpload = (e) => {
    setImage(e.target.files[0]);
  };

  const showEditButton = user?.admin && location.pathname === '/admin';

  return (
    <div className="p-18">
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <ClipLoader color="#0000ff" loading={loading} size={50} />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cards.length > 0 ? (
              cards.map(card => (
                <div key={card.id} className="relative">
                  <ImageCard 
                    imageSrc={card.imageSrc} 
                    title={card.title} 
                    link={card.pdfLink} 
                  />
                  {showEditButton ? (
                    <button 
                      onClick={() => handleEditClick(card)} 
                      className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                    >
                      Editar
                    </button>
                  ) : null} 
                </div>
              ))
            ) : (
              <p>No se encontraron tarjetas.</p>
            )}
          </div>

          {selectedCard && (
            <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
                <h2 className="text-xl mb-4 font-bold">Editar Tarjeta</h2>

                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2" htmlFor="imageInput">Imagen:</label>
                  <input
                    id="imageInput"
                    type="file"
                    onChange={handleImageUpload}
                    className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2" htmlFor="pdfLinkInput">Enlace del PDF:</label>
                  <input
                    id="pdfLinkInput"
                    type="text"
                    value={pdfLink}
                    onChange={(e) => setPdfLink(e.target.value)}
                    className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="URL del PDF"
                  />
                </div>

                <div className="flex justify-end space-x-2">
                  <button
                    onClick={handleSaveChanges}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                  >
                    {saving ? (
                      <ClipLoader color="#ffffff" loading={saving} size={20} />
                    ) : (
                      'Guardar Cambios'
                    )}
                  </button>
                  <button
                    onClick={() => setSelectedCard(null)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          )}

          {alert && (
            <Alert
              message={alert.message}
              type={alert.type} // 'success' para verde, 'error' para rojo
              onClose={() => setAlert(null)}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Cards;
