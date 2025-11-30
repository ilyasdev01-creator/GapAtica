import { FiMap, FiBarChart2, FiTrendingUp } from 'react-icons/fi';

const Home = () => {
  return (
    <main className="min-h-screen text-white">
      <section className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 homeMainH1">Mind The Gap. Master The Skill.</h1>
        <p className="text-lg sm:text-xl text-[#9FD6FF] max-w-2xl mx-auto mb-8 homeMainH2">Discover hidden skill weaknesses before they slow you down.</p>

        <div className="flex items-center justify-center">
          <button
            onClick={() => window.location.assign('/explore')}
            className="inline-flex items-center gap-3 rounded-full px-6 py-3 bg-linear-to-r from-[#5B8CFF] to-[#00D0A6] hover:from-[#4b77e6] hover:to-[#00b391] text-black font-semibold shadow-lg transition-transform transform hover:-translate-y-0.5"
          >
            Get started
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-90">
              <path d="M4 12h13" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M14 6l6 6-6 6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </section>

      <section className="bg-[#071426] py-12">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          <article className="p-6 bg-[#071f3a] rounded-xl shadow-md flex flex-col justify-between hover:shadow-xl hover:scale-105 transition-transform duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-lg bg-[#0b2a47] text-[#9FD6FF]">
                <FiMap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold">A visual map</h3>
            </div>
            <p className="text-sm text-[#cfe9ff]">A visual map of your strengths and weaknesses so you know exactly what to work on.</p>
          </article>
          <article className="p-6 bg-[#071f3a] rounded-xl shadow-md flex flex-col justify-between hover:shadow-xl hover:scale-105 transition-transform duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-lg bg-[#0b2a47] text-[#9FD6FF]">
                <FiBarChart2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold">Data-backed insights</h3>
            </div>
            <p className="text-sm text-[#cfe9ff]">Precise, actionable recommendations without the noise.</p>
          </article>
          <article className="p-6 bg-[#071f3a] rounded-xl shadow-md flex flex-col justify-between hover:shadow-xl hover:scale-105 transition-transform duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-lg bg-[#0b2a47] text-[#9FD6FF]">
                <FiTrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold">Accelerate growth</h3>
            </div>
            <p className="text-sm text-[#cfe9ff]">Focus on the right skills and see faster progress.</p>
          </article>
        </div>
      </section>
    </main>
  )
}

export default Home