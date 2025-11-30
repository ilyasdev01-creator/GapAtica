import { useNavigate } from "react-router-dom"
import { useState } from "react";
import { FiMail, FiInfo, FiMenu, FiX, FiBook } from 'react-icons/fi';
import { FaCompass } from "react-icons/fa";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const links = [
    { name: "Explore", link: "/explore", icon: FaCompass },
    { name: "Contact", link: "/contact", icon: FiMail },
    { name: "About", link: "/about", icon: FiInfo },
    { name: "Documentation", link: "/docs", icon: FiBook }
  ];

  const handleNavigate = (link: string) => {
    navigate(link);
    setIsOpen(false);
  };

  return (
    <nav className="bg-linear-to-r from-[#001427] via-[#003d82] to-[#001427] shadow-lg border-b border-[#00D0A6]/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <button
            onClick={() => handleNavigate('/')}
            className="flex items-center space-x-2 group hover:opacity-80 transition-opacity cursor-pointer"
          >
            <div className="text-xl md:text-3xl font-bold bg-linear-to-r from-[#5B8CFF] to-[#00D0A6] bg-clip-text text-transparent ibm-thai-looped-font">
              GapAtica
            </div>
          </button>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center space-x-1">
            {links.map((link) => {
              const Icon = link.icon;
              return (
                <li key={link.name}>
                  <button
                    onClick={() => handleNavigate(link.link)}
                    className="cursor-pointer flex items-center space-x-2 px-4 py-2 rounded-lg text-[#00D0A6] hover:bg-[#00D0A6]/10 transition-all duration-300 hover:text-white jaro-font font-semibold group"
                  >
                    <Icon className="text-xl group-hover:scale-125 transition-transform" />
                    <span>{link.name}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-[#00D0A6] text-2xl hover:text-white transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-[#000f1e] border-t border-[#00D0A6]/20 py-4 animate-in fade-in">
            <ul className="flex flex-col space-y-2">
              {links.map((link) => {
                const Icon = link.icon;
                return (
                  <li key={link.name}>
                    <button
                      onClick={() => handleNavigate(link.link)}
                      className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-[#00D0A6] hover:bg-[#00D0A6]/10 transition-all jaro-font font-semibold"
                    >
                      <Icon className="text-xl" />
                      <span>{link.name}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;