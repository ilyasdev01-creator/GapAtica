import { useNavigate } from "react-router-dom";
import { FaNodeJs, FaJava, FaLaravel } from "react-icons/fa";
import {
  SiExpress,
  SiDjango,
  SiPython,
  SiPhp,
  SiSpringboot,
} from "react-icons/si";

const BackendExplore = () => {
  const navigate = useNavigate();
  const techStack = [
    {
      name: "Node.js + Express",
      description:
        "A fast, unopinionated backend framework built on top of Node.js.",
      icons: [FaNodeJs, SiExpress],
      route: "/backend-explore/node-express",
    },
    {
      name: "Django (Python)",
      description:
        "A high-level Python web framework that encourages rapid development.",
      icons: [SiDjango, SiPython],
      route: "/backend-explore/django",
    },
    {
      name: "Laravel (PHP)",
      description:
        "A modern PHP framework known for elegance, simplicity, and powerful tools.",
      icons: [FaLaravel, SiPhp],
      route: "/backend-explore/laravel",
    },
    {
      name: "Spring Boot (Java)",
      description:
        "A production-ready Java framework for building scalable applications.",
      icons: [SiSpringboot, FaJava],
      route: "/backend-explore/spring-boot",
    },
  ];

  return (
    <main className="min-h-screen bg-[#001427] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 bg-linear-to-r from-[#5B8CFF] to-[#00D0A6] bg-clip-text text-transparent">
            Backend Development
          </h1>
          <p className="text-lg sm:text-xl text-[#9FD6FF] max-w-2xl mx-auto">
            Choose your tech stack and discover skill gaps in stable backend
            frameworks
          </p>
        </div>

        {/* Breadcrumb / Section Title */}
        <div className="mb-12 flex items-center gap-2 text-[#9FD6FF]">
          <span
            onClick={() => navigate("/explore")}
            className="text-sm cursor-pointer"
          >
            Explore
          </span>
          <span>›</span>
          <span className="text-sm font-semibold text-[#00D0A6]">
            Backend Development
          </span>
        </div>

        {/* Tech Stack Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {techStack.map((tech, index) => (
            <div
              key={index}
              className="group p-8 bg-lienar-to-br from-[#0b2a47] to-[#071f3a] rounded-xl border border-[#00D0A6]/20 hover:border-[#00D0A6]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#00D0A6]/20 hover:-translate-y-1 cursor-pointer"
            >
              {/* Icons */}
              <div className="flex gap-4 mb-6">
                {tech.icons.map((Icon, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-lg bg-[#0f3a52] group-hover:bg-[#144a66] transition-colors"
                  >
                    <Icon className="text-4xl text-[#00D0A6] group-hover:scale-110 transition-transform" />
                  </div>
                ))}
              </div>

              {/* Content */}
              <h2 className="text-2xl font-bold mb-3 text-white group-hover:text-[#00D0A6] transition-colors">
                {tech.name}
              </h2>
              <p className="text-[#9FD6FF] text-sm leading-relaxed mb-6">
                {tech.description}
              </p>

              {/* CTA Button */}
              <button
                onClick={() => navigate(`${tech.route}`)}
                className="w-full py-3 px-4 bg-linear-to-r from-[#5B8CFF] to-[#00D0A6] hover:from-[#4b77e6] hover:to-[#00b391] text-black font-semibold rounded-lg transition-all transform hover:scale-105 active:scale-95"
              >
                Start Analysis
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};
export default BackendExplore;
