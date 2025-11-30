import {FaBullseye , FaFacebook , FaInstagram , FaHome, FaCompass, FaBook, FaInfoCircle, FaEnvelope , FaPhone ,FaChartLine, FaUserTie} from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const Footer = () => {
  const navigate = useNavigate()
  const socials = [
    {icon : FaFacebook , link : "https://www.facebook.com/gapatica" },
    {icon : FaInstagram , link : "https://www.instagram.com/gapatica" }
  ]
  const links = [
    {name : "Home" , link : "/" , icon : FaHome },
    {name : "Explore" , link : "/explore" , icon : FaCompass },
    {name : "Contact" , link : "/contact" , icon : FaEnvelope },
    {name : "About" , link : "/about" , icon : FaInfoCircle },
    {name : "Documentation" , link : "/docs" , icon : FaBook }
  ]
  return (
    <footer className="bg-[#000f1e] text-white border-t border-[#00D0A6]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <FaBullseye className="text-[#00D0A6] text-2xl" />
              <h2 className="text-2xl font-bold bg-linear-to-r from-[#5B8CFF] to-[#00D0A6] bg-clip-text text-transparent ibm-thai-looped-font">GapAtica</h2>
            </div>
            <p className="text-[#9FD6FF] text-sm mb-4">Your roadmap to becoming world-class.</p>
            <div className="flex gap-4">
              {
                socials.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a key={index} href={social.link} target="_blank" rel="noopener noreferrer" className="text-[#00D0A6] hover:text-white transition-colors text-xl">
                      <Icon />
                    </a>
                  );
                })
              }
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-[#00D0A6] mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {
                links.map((link , index) => {
                  const Icon = link.icon;
                  return (
                    <li key={index}>
                      <button onClick={() => navigate(`${link.link}`)} className="flex items-center gap-2 text-[#9FD6FF] hover:text-white transition-colors cursor-pointer">
                        <Icon className="w-4 h-4" />
                        <span>{link.name}</span>
                      </button>
                    </li>
                  );
                })
              }
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-[#00D0A6] mb-4">Contact Us</h3>
            <div className="space-y-2 text-[#9FD6FF]">
              <p className="flex items-center gap-2 hover:text-white transition-colors">
                <FaPhone className="w-4 h-4" /> +212 618-540641
              </p>
              <p className="flex items-center gap-2 hover:text-white transition-colors">
                <FaEnvelope className="w-4 h-4" /> ilyasdev01@gmail.com
              </p>
            </div>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-lg font-semibold text-[#00D0A6] mb-4">Why GapAtica</h3>
            <ul className="space-y-2 text-[#9FD6FF] text-sm">
              <li className="flex items-center gap-2">
                <FaChartLine className="w-4 h-4 text-[#00D0A6]" /> Free Analytics
              </li>
              <li className="flex items-center gap-2">
                <FaUserTie className="w-4 h-4 text-[#00D0A6]" /> Interview Success
              </li>
              <li className="flex items-center gap-2">
                <FaBullseye className="w-4 h-4 text-[#00D0A6]" /> Reach Your Target
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#00D0A6]/20 pt-8">
          <p className="text-center text-[#9FD6FF] text-sm">© 2025 GapAtica. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer