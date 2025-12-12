import {
  FaLaptopCode,
  FaServer,
  FaChartBar,
  FaRobot,
  FaCloud,
} from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Explore = () => {
  if (!localStorage.getItem("token")) {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    if (token) localStorage.setItem("token", token);
  }
  const navigate = useNavigate();
  const domains = [
    {
      name: "Frontend Development",
      icon: FaLaptopCode,
      comingSoon: false,
      description: "Build stunning user interfaces and experiences.",
      route: "/frontend-explore",
    },
    {
      name: "Backend Development",
      icon: FaServer,
      comingSoon: false,
      description: "Create robust server-side applications and APIs.",
      route: "/backend-explore",
    },
    {
      name: "Data Science",
      icon: FaChartBar,
      comingSoon: true,
      description:
        "Analyze and interpret complex data to drive decision-making.",
    },
    {
      name: "Machine Learning",
      icon: FaRobot,
      comingSoon: true,
      description: "Develop intelligent systems that learn and adapt.",
    },
    {
      name: "DevOps",
      icon: FaCloud,
      comingSoon: true,
      description:
        "Streamline software delivery and infrastructure management.",
    },
  ];
  const isUserLogin = (): boolean => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("User not Logged In", { autoClose: 1000 });
      return false;
    }
    return true;
  };
  return (
    <main className="min-h-screen bg-[#001427] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 bg-linear-to-r from-[#5B8CFF] to-[#00D0A6] bg-clip-text text-transparent">
            Identify Your Skill Gaps
          </h1>
          <p className="text-lg sm:text-xl text-[#9FD6FF] max-w-2xl mx-auto">
            Choose your domain and discover exactly where you need to improve
          </p>
        </div>

        {/* Domains Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {domains.map((domain, index) => {
            const DomainIcon = domain.icon;
            return (
              <div
                key={index}
                className={`relative group ${
                  domain.comingSoon ? "opacity-60" : ""
                }`}
              >
                {/* Blur overlay for coming soon */}
                {domain.comingSoon && (
                  <div className="absolute inset-0 backdrop-blur-md bg-black/30 rounded-xl z-10 flex items-center justify-center pointer-events-none">
                    <span className="bg-[#00D0A6] text-black px-4 py-2 rounded-full font-semibold text-sm">
                      Coming Soon
                    </span>
                  </div>
                )}

                {/* Card */}
                <button
                  disabled={domain.comingSoon}
                  onClick={() =>
                    !domain.comingSoon &&
                    console.log(`Exploring ${domain.name}`)
                  }
                  className={`w-full p-8 bg-linear-to-br from-[#0b2a47] to-[#071f3a] rounded-xl border border-[#00D0A6]/20 transition-all duration-300 ${
                    domain.comingSoon
                      ? "cursor-not-allowed"
                      : "hover:border-[#00D0A6]/50 hover:shadow-lg hover:shadow-[#00D0A6]/20 hover:-translate-y-1 cursor-pointer"
                  }`}
                >
                  {/* Icon */}
                  <div
                    className={`text-5xl mb-4 transition-transform duration-300 ${
                      domain.comingSoon ? "" : "group-hover:scale-110"
                    }`}
                  >
                    <DomainIcon
                      className={
                        domain.comingSoon
                          ? "text-[#6b7280]"
                          : "text-[#00D0A6] drop-shadow-lg"
                      }
                    />
                  </div>

                  {/* Content */}
                  <h2
                    className={`text-2xl font-bold mb-2 ${
                      domain.comingSoon ? "text-gray-400" : "text-white"
                    }`}
                  >
                    {domain.name}
                  </h2>
                  <p
                    className={`text-sm leading-relaxed ${
                      domain.comingSoon ? "text-gray-500" : "text-[#9FD6FF]"
                    }`}
                  >
                    {domain.description}
                  </p>

                  {/* CTA Button */}
                  {!domain.comingSoon && (
                    <button
                      onClick={() => {
                        if (isUserLogin()) {
                          navigate(`${domain.route}`);
                        } else {
                          navigate("/login");
                        }
                      }}
                      className="mt-6 w-full py-2 px-4 bg-linear-to-r from-[#5B8CFF] to-[#00D0A6] hover:from-[#4b77e6] hover:to-[#00b391] text-black font-semibold rounded-lg transition-transform transform hover:scale-105"
                    >
                      Scan My Skills
                    </button>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default Explore;
