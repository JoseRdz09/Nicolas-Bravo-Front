import { Link } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import { useState } from 'react';
import { ReactSVG } from 'react-svg';
import ArrowIcon from '../assets/icons/dropdown.svg';
import { useAuth } from '../hooks/useAuth';

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownNosotrosOpen, setDropdownNosotrosOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMouseEnter = () => {
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setDropdownOpen(false);
  };

  const handleNosotrosMouseEnter = () => {
    setDropdownNosotrosOpen(true);
  };

  const handleNosotrosMouseLeave = () => {
    setDropdownNosotrosOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleMenuItemClick = () => {
    setMenuOpen(false);
  };

  const { logout } = useAuth({middleware: 'auth'});

  return (
    <nav className="bg-persian-blue-950 fixed top-0 left-0 right-0 z-50 shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logotipo a la izquierda */}
        <div className="text-white text-xl flex-shrink-0">
          <Link to="/" onClick={() => { scrollToTop(); handleMenuItemClick(); }} className="block">
            <img src="../img/Logo.png" alt="Logo" className="w-16 h-16" />
          </Link>
        </div>

        {/* Menú de navegación centrado */}
        <div className="hidden md:flex flex-grow items-center justify-center">
          <ul className="flex space-x-4">
            <li>
              <Link to="/" onClick={scrollToTop} className="text-white hover:text-gray-200">
                INICIO
              </Link>
            </li>
            <li
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                to="../home/alumnos"
                className="text-white hover:text-gray-200 flex items-center"
              >
                ALUMNOS
                <ReactSVG
                  src={ArrowIcon}
                  className={`w-5 h-5 ml-2 transition-transform duration-200 ${
                    dropdownOpen ? 'rotate-180' : 'rotate-0'
                  }`}
                />
              </Link>
              {dropdownOpen && (
                <ul className="absolute left-0 bg-white text-black rounded-lg shadow-lg w-48 z-10 mt-0">
                  <li className="rounded-lg hover:bg-gray-200">
                    <Link to="../home/alumnos/inscripcion" className="block px-4 py-2 rounded-lg">
                      Inscripción
                    </Link>
                  </li>
                  <li className="rounded-lg hover:bg-gray-200">
                    <Link to="../home/alumnos/reinscripcion" className="block px-4 py-2 rounded-lg">
                      Reinscripción
                    </Link>
                  </li>
                  <li className="rounded-lg hover:bg-gray-200">
                    <Link to="../home/alumnos/calendario" className="block px-4 py-2 rounded-lg">
                      Calendario
                    </Link>
                  </li>
                  <li className="rounded-lg hover:bg-gray-200">
                    <Link to="../home/alumnos/lista-aceptados" className="block px-4 py-2 rounded-lg">
                      Lista de Aceptados
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            <li
              className="relative"
              onMouseEnter={handleNosotrosMouseEnter}
              onMouseLeave={handleNosotrosMouseLeave}
            >
              <Link
                to="../home/conocenos"
                className="text-white hover:text-gray-200 flex items-center"
              >
                NOSOTROS
                <ReactSVG
                  src={ArrowIcon}
                  className={`w-5 h-5 ml-2 transition-transform duration-200 ${
                    dropdownNosotrosOpen ? 'rotate-180' : 'rotate-0'
                  }`}
                />
              </Link>
              {dropdownNosotrosOpen && (
                <ul className="absolute left-0 bg-white text-black rounded-lg shadow-lg w-48 z-10 mt-0">
                  <li className="rounded-lg hover:bg-gray-200">
                    <Link to="../home/nosotros/mision-vision" className="block px-4 py-2 rounded-lg">
                      Misión y Visión
                    </Link>
                  </li>
                  <li className="rounded-lg hover:bg-gray-200">
                    <Link to="../home/nosotros/objetivo-social" className="block px-4 py-2 rounded-lg">
                      Objetivo Social
                    </Link>
                  </li>
                  <li className="rounded-lg hover:bg-gray-200">
                    <Link to="../home/nosotros/principios" className="block px-4 py-2 rounded-lg">
                      Principios
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            <li>
              <ScrollLink
                to="contactanos"
                smooth={true}
                duration={500}
                className="text-white hover:text-gray-200 cursor-pointer"
              >
                CONTACTANOS
              </ScrollLink>
            </li>
          </ul>
        </div>

        {/* Enlace "INICIAR SESIÓN" a la derecha */}
        <div className="text-white flex-shrink-0">
          <Link to="/auth/login" className="text-white hover:text-gray-200 hidden md:block">
            INICIAR SESIÓN
          </Link>
        </div>

        {/* Botón de menú de hamburguesa (solo en pantallas pequeñas) */}
        <button
          className="text-white md:hidden flex items-center"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>

        {/* Sidebar para dispositivos móviles */}
        <div className={`fixed top-0 right-0 w-64 h-full bg-persian-blue-950 text-white transform ${menuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 z-40 md:hidden`}>
          <button
            className="text-white absolute top-4 right-4"
            onClick={() => setMenuOpen(false)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
          <ul className="flex flex-col space-y-4 p-4 mt-16">
            <li>
              <Link to="/" onClick={() => { scrollToTop(); handleMenuItemClick(); }} className="block text-white hover:text-gray-200">
                INICIO
              </Link>
            </li>
            <li
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                to="../home/alumnos"
                className="flex items-center text-white hover:text-gray-200"
                onClick={handleMenuItemClick}
              >
                ALUMNOS
                <ReactSVG
                  src={ArrowIcon}
                  className={`w-5 h-5 ml-2 transition-transform duration-200 ${
                    dropdownOpen ? 'rotate-180' : 'rotate-0'
                  }`}
                />
              </Link>
              {dropdownOpen && (
                <ul className="flex flex-col bg-white text-black rounded-lg shadow-lg mt-2">
                  <li className="rounded-lg hover:bg-gray-200">
                    <Link to="../home/alumnos/inscripcion" className="block px-4 py-2 rounded-lg" onClick={handleMenuItemClick}>
                      Inscripción
                    </Link>
                  </li>
                  <li className="rounded-lg hover:bg-gray-200">
                    <Link to="../home/alumnos/reinscripcion" className="block px-4 py-2 rounded-lg" onClick={handleMenuItemClick}>
                      Reinscripción
                    </Link>
                  </li>
                  <li className="rounded-lg hover:bg-gray-200">
                    <Link to="../home/alumnos/calendario" className="block px-4 py-2 rounded-lg" onClick={handleMenuItemClick}>
                      Calendario
                    </Link>
                  </li>
                  <li className="rounded-lg hover:bg-gray-200">
                    <Link to="../home/alumnos/lista-aceptados" className="block px-4 py-2 rounded-lg" onClick={handleMenuItemClick}>
                      Lista de Aceptados
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            <li
              className="relative"
              onMouseEnter={handleNosotrosMouseEnter}
              onMouseLeave={handleNosotrosMouseLeave}
            >
              <Link
                to="../home/conocenos"
                className="text-white hover:text-gray-200 flex items-center"
                onClick={handleMenuItemClick}
              >
                NOSOTROS
                <ReactSVG
                  src={ArrowIcon}
                  className={`w-5 h-5 ml-2 transition-transform duration-200 ${
                    dropdownNosotrosOpen ? 'rotate-180' : 'rotate-0'
                  }`}
                />
              </Link>
              {dropdownNosotrosOpen && (
                <ul className="flex flex-col bg-white text-black rounded-lg shadow-lg mt-2">
                  <li className="rounded-lg hover:bg-gray-200">
                    <Link to="../home/nosotros/mision-vision" className="block px-4 py-2 rounded-lg" onClick={handleMenuItemClick}>
                      Misión y Visión
                    </Link>
                  </li>
                  <li className="rounded-lg hover:bg-gray-200">
                    <Link to="../home/nosotros/objetivo-social" className="block px-4 py-2 rounded-lg" onClick={handleMenuItemClick}>
                      Objetivo Social
                    </Link>
                  </li>
                  <li className="rounded-lg hover:bg-gray-200">
                    <Link to="../home/nosotros/principios" className="block px-4 py-2 rounded-lg" onClick={handleMenuItemClick}>
                      Principios
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            <li>
              <ScrollLink
                to="contactanos"
                smooth={true}
                duration={500}
                className="text-white hover:text-gray-200 cursor-pointer"
                onClick={handleMenuItemClick}
              >
                CONTACTANOS
              </ScrollLink>
            </li>
            <li>
              <Link to="/auth/login" onClick={handleMenuItemClick} className="block text-white hover:text-gray-200">
                INICIAR SESIÓN
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
