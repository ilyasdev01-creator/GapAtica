
const Login = () => {
  return (
    <main className="min-h-screen bg-linear-to-br from-[#001427] via-[#02263a] to-[#001827] flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-[#071426]/80 backdrop-blur-sm border border-[#00D0A6]/10 rounded-2xl shadow-2xl p-8">
        <header className="text-center mb-6">
          <div className="inline-block mb-4">
            <div className="text-3xl font-bold bg-linear-to-r from-[#5B8CFF] to-[#00D0A6] bg-clip-text text-transparent">GapAtica</div>
          </div>
          <h1 className="text-white text-2xl font-semibold">Welcome back</h1>
          <p className="text-sm text-[#9FD6FF]">Login to your account to continue</p>
        </header>

        <form className="space-y-4" action="" aria-label="Login form">
          <div>
            <label className="sr-only" htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@domain.com"
              className="w-full px-4 py-3 rounded-lg bg-[#011826] border border-transparent placeholder-[#5fa7d9] text-[#e6f7ff] focus:outline-none focus:ring-2 focus:ring-[#00D0A6]/60"
            />
          </div>

          <div>
            <label className="sr-only" htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Your password"
              className="w-full px-4 py-3 rounded-lg bg-[#011826] border border-transparent placeholder-[#5fa7d9] text-[#e6f7ff] focus:outline-none focus:ring-2 focus:ring-[#00D0A6]/60"
            />
          </div>

          <div className="flex items-center justify-between text-sm text-[#9FD6FF]">
            <label className="inline-flex items-center gap-2">
              <input type="checkbox" className="w-4 h-4 rounded border-[#0f3a52] bg-[#011826]" />
              <span>Remember me</span>
            </label>
            <a className="text-[#5B8CFF] hover:underline" href="#">Forgot password?</a>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-linear-to-r from-[#5B8CFF] to-[#00D0A6] text-black font-semibold shadow-md hover:scale-[1.01] transition-transform"
            >
              Sign in
            </button>
          </div>
        </form>

        <div className="mt-6 text-center text-sm text-[#9FD6FF]">
          <p>
            Don’t have an account? <a className="text-[#5B8CFF] hover:underline" href="#">Create an account</a>
          </p>
        </div>
      </div>
    </main>
  )
}

export default Login