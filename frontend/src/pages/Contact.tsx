import { useNavigate } from "react-router-dom";

const Contact = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#071426] text-white">
      {/* Hero Section */}
      <h1 className="flex justify-center pt-10 text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 homeMainH1">
        Contact Us
      </h1>
      <p className="flex justify-center text-lg sm:text-xl text-[#9FD6FF] max-w-2xl mx-auto mb-8 homeMainH2">
        Contact our team and we will be happy to response.
      </p>

      {/* Contact Information Section */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-[#071f3a] rounded-xl shadow-lg p-8 md:p-12 border border-[#00D0A6]/20">
          <h2 className="text-3xl font-semibold text-[#9FD6FF] mb-8 text-center">
            Get In Touch
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Phone Section */}
            <div className="text-center">
              <div className="bg-[#0b2a47] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 border border-[#00D0A6]/30">
                <svg
                  className="w-8 h-8 text-[#9FD6FF]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-[#9FD6FF] mb-2">Phone</h3>
              <p className="text-[#cfe9ff]">+212 618-540641</p>
            </div>

            {/* Email Section */}
            <div className="text-center">
              <div className="bg-[#0b2a47] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 border border-[#00D0A6]/30">
                <svg
                  className="w-8 h-8 text-[#9FD6FF]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-[#9FD6FF] mb-2">Email</h3>
              <p className="text-[#cfe9ff]">ilyasdev01@gmail.com</p>
            </div>
          </div>

          {/* Book a Meeting Section */}
          <div className="mt-12 text-center">
            <div className="bg-[#0b2a47] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 border border-[#00D0A6]/30">
              <svg
                onClick={() => {
                  navigate("/book-meeting");
                }}
                className="w-8 h-8 cursor-pointer text-[#9FD6FF]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="text-xl  font-medium text-[#9FD6FF] mb-2">
              Book a Meeting
            </h3>
            <p className="text-[#cfe9ff]">Schedule a consultation with us</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
