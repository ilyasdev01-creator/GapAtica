import { useState, useEffect } from "react";
import {
  Brain,
  Target,
  BarChart3,
  Shield,
  Star,
  TrendingUp,
  Users,
  Award,
  Heart,
  Globe,
  CheckCircle,
} from "lucide-react";

const About = () => {
  const [animatedValues, setAnimatedValues] = useState({
    users: 0,
    tests: 0,
    accuracy: 0,
    domains: 0,
  });

  // Animation for stats
  useEffect(() => {
    const animateValue = (
      start: number,
      end: number,
      duration: number,
      key: keyof typeof animatedValues
    ) => {
      const range = end - start;
      const increment = range / (duration / 16);
      let current = start;

      const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
          current = end;
          clearInterval(timer);
        }
        setAnimatedValues((prev) => ({
          ...prev,
          [key]: Math.floor(current),
        }));
      }, 16);
    };

    animateValue(0, 100000, 2000, "users");
    animateValue(0, 50, 2000, "tests");
    animateValue(0, 95, 2000, "accuracy");
    animateValue(0, 15, 2000, "domains");
  }, []);

  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI-Powered Analysis",
      description:
        "Our advanced algorithms analyze your responses to provide personalized skill insights.",
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Precise Career Mapping",
      description:
        "Get clear guidance on what skills to develop for your specific career goals.",
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Progress Tracking",
      description:
        "Monitor your growth with detailed analytics and improvement metrics.",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "100% Free Forever",
      description:
        "No hidden fees, no premium tiers. Everything we offer is completely free.",
    },
  ];

  const domains = [
    {
      name: "Programming & Tech",
      icon: "💻",
      skills: ["JavaScript", "Python", "React", "Node.js", "DevOps"],
    },
    {
      name: "Business & Management",
      icon: "📊",
      skills: ["Leadership", "Strategy", "Finance", "Marketing", "Analytics"],
    },
    {
      name: "Design & Creativity",
      icon: "🎨",
      skills: [
        "UI/UX",
        "Graphic Design",
        "Branding",
        "3D Modeling",
        "Animation",
      ],
    },
    {
      name: "Data Science",
      icon: "📈",
      skills: [
        "Machine Learning",
        "Statistics",
        "SQL",
        "Big Data",
        "Visualization",
      ],
    },
    {
      name: "Marketing",
      icon: "📢",
      skills: ["SEO", "Content", "Social Media", "Analytics", "Campaigns"],
    },
    {
      name: "Soft Skills",
      icon: "🤝",
      skills: [
        "Communication",
        "Teamwork",
        "Problem Solving",
        "Adaptability",
        "Leadership",
      ],
    },
  ];

  const testimonials = [
    {
      text: "This platform helped me identify exactly what I needed to land my dream job as a frontend developer!",
      author: "Sarah, Frontend Developer",
      result: "Hired at TechCorp",
    },
    {
      text: "The career path recommendations were spot-on. I never realized I had such strong skills in data analysis!",
      author: "Michael, Data Analyst",
      result: "30% Salary Increase",
    },
    {
      text: "100% free and incredibly accurate. This should be required for every college graduate!",
      author: "David, Recent Graduate",
      result: "Found Career Direction",
    },
  ];

  return (
    <div className="min-h-screen bg-[#001427] text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-r from-[#001427] via-transparent to-[#001427] z-10" />
        <div className="absolute inset-0 bg-linear-to-br from-[#001427] via-[#0a1a33] to-[#002140]" />

        <div className="relative z-20 container mx-auto px-4 sm:px-8 md:px-16 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00FFD1]/10 border border-[#00FFD1]/30 mb-6">
              <Star className="w-4 h-4 text-[#00FFD1]" />
              <span className="text-sm text-[#9FD6FF]">100% Free Forever</span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-6 text-transparent bg-clip-text bg-linear-to-r from-[#9FD6FF] to-[#00FFD1]">
              Discover Your True Potential
            </h1>
            <p className="text-xl sm:text-2xl text-[#9FD6FF] mb-8 max-w-3xl mx-auto">
              Take our free skill assessment tests and get personalized guidance
              on what you need to master for your career success.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="px-8 py-3 bg-linear-to-r from-[#9FD6FF] to-[#00FFD1] text-[#001427] font-bold rounded-full hover:shadow-lg hover:shadow-[#00FFD1]/30 transition-all duration-300">
                Start Free Assessment
              </button>
              <button className="px-8 py-3 border-2 border-[#00FFD1] text-[#00FFD1] font-bold rounded-full hover:bg-[#00FFD1] hover:text-[#001427] transition-all duration-300">
                Browse All Tests
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-4 sm:px-8 md:px-16 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            {
              value: `${(animatedValues.users / 1000).toFixed(0)}K+`,
              label: "Users Assessed",
              icon: <Users className="w-6 h-6" />,
            },
            {
              value: `${animatedValues.tests}+`,
              label: "Skill Tests",
              icon: <Award className="w-6 h-6" />,
            },
            {
              value: `${animatedValues.accuracy}%`,
              label: "Accuracy Rate",
              icon: <Target className="w-6 h-6" />,
            },
            {
              value: `${animatedValues.domains}+`,
              label: "Career Domains",
              icon: <Globe className="w-6 h-6" />,
            },
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 bg-[#0a1a33] rounded-2xl border border-[#1a3a5f] hover:border-[#00FFD1] transition-colors"
            >
              <div className="flex justify-center mb-4 text-[#00FFD1]">
                {stat.icon}
              </div>
              <div className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-linear-to-r from-[#9FD6FF] to-[#00FFD1]">
                {stat.value}
              </div>
              <div className="text-sm text-[#9FD6FF]">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div className="container mx-auto px-4 sm:px-8 md:px-16 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-linear-to-r from-[#9FD6FF] to-[#00FFD1]">
              How It Works
            </h2>
            <p className="text-xl text-[#9FD6FF] max-w-3xl mx-auto">
              Three simple steps to uncover your career potential
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Take the Assessment",
                description:
                  "Complete our carefully designed skill tests in your chosen domain.",
                icon: <Brain className="w-12 h-12" />,
              },
              {
                step: "2",
                title: "Get Your Analysis",
                description:
                  "Receive detailed insights about your strengths and areas for improvement.",
                icon: <BarChart3 className="w-12 h-12" />,
              },
              {
                step: "3",
                title: "Follow Your Path",
                description:
                  "Get personalized learning recommendations and career guidance.",
                icon: <TrendingUp className="w-12 h-12" />,
              },
            ].map((step, index) => (
              <div
                key={index}
                className="relative bg-[#0a1a33] rounded-2xl p-8 border border-[#1a3a5f] hover:border-[#00FFD1] transition-all duration-300 group"
              >
                <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-linear-to-r from-[#9FD6FF] to-[#00FFD1] flex items-center justify-center text-[#001427] font-bold">
                  {step.step}
                </div>
                <div className="text-[#00FFD1] mb-6">{step.icon}</div>
                <h3 className="text-xl font-bold mb-4 text-white">
                  {step.title}
                </h3>
                <p className="text-gray-400">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="container mx-auto px-4 sm:px-8 md:px-16 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-linear-to-r from-[#9FD6FF] to-[#00FFD1]">
            Why Choose Our Platform
          </h2>
          <p className="text-xl text-[#9FD6FF] max-w-3xl mx-auto">
            We're committed to providing the best free career assessment
            experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-[#0a1a33] p-8 rounded-2xl border border-[#1a3a5f] hover:border-[#00FFD1] transition-all duration-300 hover:scale-105"
            >
              <div className="text-[#00FFD1] mb-6 transform group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">
                {feature.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Domains Covered */}
      <div className="container mx-auto px-4 sm:px-8 md:px-16 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-linear-to-r from-[#9FD6FF] to-[#00FFD1]">
            Skill Domains We Assess
          </h2>
          <p className="text-xl text-[#9FD6FF] max-w-3xl mx-auto">
            Comprehensive coverage across all major career fields
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {domains.map((domain, index) => (
            <div
              key={index}
              className="bg-[#0a1a33] rounded-xl p-6 border border-[#1a3a5f] hover:border-[#00FFD1] transition-colors group"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="text-3xl">{domain.icon}</div>
                <h3 className="text-lg font-bold text-white">{domain.name}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {domain.skills.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="px-3 py-1 text-xs bg-[#002140] text-[#9FD6FF] rounded-full border border-[#1a3a5f]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="container mx-auto px-4 sm:px-8 md:px-16 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-linear-to-r from-[#9FD6FF] to-[#00FFD1]">
            Success Stories
          </h2>
          <p className="text-xl text-[#9FD6FF] max-w-3xl mx-auto">
            See how our assessments have helped people transform their careers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-[#0a1a33] rounded-2xl p-8 border border-[#1a3a5f] hover:border-[#00FFD1] transition-colors"
            >
              <div className="text-yellow-400 mb-4 flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-gray-300 italic mb-6">"{testimonial.text}"</p>
              <div className="border-t border-[#1a3a5f] pt-6">
                <p className="font-bold text-white">{testimonial.author}</p>
                <div className="flex items-center gap-2 mt-2">
                  <CheckCircle className="w-4 h-4 text-[#00FFD1]" />
                  <span className="text-sm text-[#9FD6FF]">
                    {testimonial.result}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Free Promise */}
      <div className="container mx-auto px-4 sm:px-8 md:px-16 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-linear-to-r from-[#0a1a33] to-[#002140] rounded-3xl p-12 border-2 border-[#00FFD1]">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00FFD1]/10 border border-[#00FFD1] mb-6">
              <Heart className="w-4 h-4 text-[#00FFD1]" />
              <span className="text-sm font-bold text-[#00FFD1]">
                Our Promise
              </span>
            </div>
            <h2 className="text-4xl font-bold mb-6 text-white">
              100% Free. No Strings Attached.
            </h2>
            <p className="text-xl text-[#9FD6FF] mb-8 max-w-2xl mx-auto">
              We believe career guidance should be accessible to everyone.
              That's why we'll never charge for our assessments or insights.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left max-w-3xl mx-auto">
              {[
                { icon: "🚫", text: "No Hidden Fees" },
                { icon: "🔓", text: "Full Access Always" },
                { icon: "💝", text: "Forever Free" },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <span className="text-2xl">{item.icon}</span>
                  <span className="text-gray-300">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="container mx-auto px-4 sm:px-8 md:px-16 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-linear-to-r from-[#9FD6FF] to-[#00FFD1]">
            Ready to Discover Your Career Potential?
          </h2>
          <p className="text-xl text-[#9FD6FF] mb-8 max-w-2xl mx-auto">
            Take the first step toward mastering your skills and achieving your
            career goals.
          </p>
          <button className="px-8 py-4 bg-linear-to-r from-[#9FD6FF] to-[#00FFD1] text-[#001427] font-bold rounded-full hover:shadow-2xl hover:shadow-[#00FFD1]/40 transition-all duration-300 transform hover:-translate-y-1">
            Start Your Free Assessment Now
          </button>
          <p className="text-sm text-gray-500 mt-8">
            No registration required • Instant results • Personalized
            recommendations
          </p>
        </div>
      </div>

      {/* Footer Note */}
      <div className="border-t border-[#1a3a5f] py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-[#9FD6FF]">
            © {new Date().getFullYear()} SkillPath Assessor. Empowering careers
            through free skill assessment.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Your journey to career excellence starts here.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
