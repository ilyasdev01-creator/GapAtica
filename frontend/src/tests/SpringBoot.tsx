import { useState } from "react";
import { FiCheck, FiX } from "react-icons/fi";

type Question = {
  id: number;
  text: string;
  options: string[];
  correctIndex: number;
};

const questions: Question[] = [
  {
    id: 1,
    text: "Why can using field injection (@Autowired on fields) be problematic in Spring Boot?",
    options: [
      "It increases application startup time",
      "It makes components harder to test and immutability impossible",
      "It disables constructor injection",
      "It breaks dependency scanning",
    ],
    correctIndex: 1,
  },
  {
    id: 2,
    text: "Which change will NOT trigger a Spring Bean recreation?",
    options: [
      "Changing application.properties",
      "Restarting the application",
      "Changing a request parameter",
      "Updating a @Configuration class",
    ],
    correctIndex: 2,
  },
  {
    id: 3,
    text: "Why might a @Transactional method not roll back as expected?",
    options: [
      "The method is private",
      "The exception is unchecked",
      "The method is static",
      "The method is called internally within the same class",
    ],
    correctIndex: 3,
  },
  {
    id: 4,
    text: "What happens if two Spring Beans have the same name?",
    options: [
      "Spring randomly chooses one",
      "Application fails to start",
      "The last bean overrides the first (by default)",
      "Both beans are merged",
    ],
    correctIndex: 2,
  },
  {
    id: 5,
    text: "Which annotation enables lazy initialization of a Spring Bean?",
    options: ["@Async", "@Lazy", "@Deferred", "@Optional"],
    correctIndex: 1,
  },
  {
    id: 6,
    text: "Why can excessive use of @Transactional slow down an application?",
    options: [
      "Transactions block garbage collection",
      "Each transaction adds database and proxy overhead",
      "Spring disables caching automatically",
      "Hibernate reloads entities on every request",
    ],
    correctIndex: 1,
  },
  {
    id: 7,
    text: "Using too many auto-configured starters mainly affects:",
    options: [
      "Runtime memory only",
      "Build size",
      "Application startup time",
      "Database query speed",
    ],
    correctIndex: 2,
  },
  {
    id: 8,
    text: "Why can excessive logging at DEBUG level hurt performance?",
    options: [
      "Logs bypass JVM optimization",
      "Log message construction is expensive even if not written",
      "Logs increase heap fragmentation",
      "Logs disable async execution",
    ],
    correctIndex: 1,
  },
  {
    id: 9,
    text: "Which Spring Boot feature requires no explicit configuration?",
    options: [
      "Spring Security filters",
      "Auto-configuration",
      "Custom Bean definitions",
      "Manual DataSource setup",
    ],
    correctIndex: 1,
  },
  {
    id: 10,
    text: "Why does Spring use proxies for @Transactional methods?",
    options: [
      "To intercept method calls and manage transactions",
      "To speed up database queries",
      "To serialize requests",
      "To enable multithreading",
    ],
    correctIndex: 0,
  },
  {
    id: 11,
    text: "Which scope creates a new Bean instance per HTTP request?",
    options: ["singleton", "prototype", "request", "session"],
    correctIndex: 2,
  },
  {
    id: 12,
    text: "Why can frequent database calls inside a loop be dangerous?",
    options: [
      "They disable caching",
      "They cause N+1 query problems",
      "They prevent connection pooling",
      "They lock the JVM",
    ],
    correctIndex: 1,
  },
  {
    id: 13,
    text: "Which layer should contain business logic in a Spring Boot application?",
    options: ["Controller", "Repository", "Service", "Configuration"],
    correctIndex: 2,
  },
  {
    id: 14,
    text: "Why can using @Value excessively reduce maintainability?",
    options: [
      "It slows down property loading",
      "It scatters configuration across classes",
      "It disables type safety",
      "It prevents profile usage",
    ],
    correctIndex: 1,
  },
  {
    id: 15,
    text: "What does enabling Spring Cache abstraction primarily do?",
    options: [
      "Speeds up JVM execution",
      "Reduces repeated expensive method calls",
      "Caches HTTP responses automatically",
      "Improves garbage collection",
    ],
    correctIndex: 1,
  },
  {
    id: 16,
    text: "Why might constructor injection be preferred over field injection?",
    options: [
      "It reduces memory usage",
      "It ensures required dependencies are provided at creation",
      "It enables lazy loading",
      "It avoids circular dependencies automatically",
    ],
    correctIndex: 1,
  },
  {
    id: 17,
    text: "Which configuration will NOT be picked up automatically by Spring Boot?",
    options: [
      "application.yml",
      "application.properties",
      "bootstrap.yml",
      "random-config.json",
    ],
    correctIndex: 3,
  },
  {
    id: 18,
    text: "When will a Spring Singleton Bean NOT be recreated?",
    options: [
      "Application restart",
      "Context refresh",
      "HTTP request",
      "Configuration reload",
    ],
    correctIndex: 2,
  },
  {
    id: 19,
    text: "Which annotation exposes REST endpoints in Spring Boot?",
    options: ["@Controller", "@Service", "@Repository", "@RestController"],
    correctIndex: 3,
  },
  {
    id: 20,
    text: "What is the main goal of Spring Boot’s auto-configuration?",
    options: [
      "Replace Spring Framework",
      "Reduce boilerplate configuration",
      "Improve JVM performance",
      "Eliminate XML entirely",
    ],
    correctIndex: 1,
  },
];

const SpringBoot = () => {
  const [questionCount, setQuestionCount] = useState<number>(0);
  const question = questions[questionCount];
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [finished, setFinished] = useState(false);
  const [score, setScore] = useState(0);

  function handleSelect(idx: number) {
    if (submitted) return;
    setSelected(idx);
  }

  function handleSubmit() {
    if (selected === null) return;

    const correct = selected === question.correctIndex;
    setIsCorrect(correct);
    setSubmitted(true);
    if (correct) setScore((s) => s + 1);
  }

  function HandleNext() {
    if (questionCount + 1 >= questions.length) {
      setFinished(true);
      return;
    }
    setQuestionCount((c) => c + 1);
    setSubmitted(false);
    setIsCorrect(null);
    setSelected(null);
  }
  return (
    <main className="min-h-screen bg-[#001427] flex items-center justify-center p-6">
      {finished ? (
        <section className="w-full max-w-2xl bg-[#071426] rounded-2xl p-8 shadow-xl border border-[#00D0A6]/10">
          <header className="text-center mb-6">
            <h2 className="text-2xl font-extrabold text-white">
              Quiz Complete
            </h2>
            <p className="text-sm text-[#9FD6FF] mt-2">You finished the quiz</p>
          </header>
          <div className="text-center">
            <p className="text-lg text-white font-semibold">
              You answered <span className="text-[#00D0A6]">{score}</span> out
              of <span className="text-[#5B8CFF]">{questions.length}</span>
            </p>
            <p className="mt-4 text-sm text-[#afc8ff]">
              Performance:{" "}
              {(() => {
                const pct = score / questions.length;

                if (pct >= 0.8) {
                  return "Excellent! You have a strong grasp of Spring Boot’s core architecture, including dependency injection, auto-configuration, REST controllers, transactions, caching, and application layering. You understand performance considerations, best practices, and how to design scalable, production-ready backend systems. Keep pushing — you’re approaching advanced Spring Boot architecture.";
                }
                if (pct >= 0.5) {
                  return "Good job! You understand the fundamentals of Spring Boot such as controllers, services, repositories, configuration, and basic dependency injection. There are still areas to strengthen, including transactions, bean lifecycle, caching strategies, and application performance tuning. With more hands-on experience, you’ll reach full proficiency.";
                }
                return "You’re getting started! You likely understand basic Java and Spring concepts, but key ideas like dependency injection, bean scopes, REST APIs, and configuration management still need practice. Focus on the fundamentals and build small Spring Boot projects to gain confidence and real-world experience.";
              })()}
            </p>

            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                onClick={() => {
                  setFinished(false);
                  setQuestionCount(0);
                  setScore(0);
                  setSubmitted(false);
                  setIsCorrect(null);
                  setSelected(null);
                }}
                className="px-4 py-2 bg-linear-to-r from-[#5B8CFF] to-[#00D0A6] text-black rounded-md font-semibold"
              >
                Retry
              </button>
            </div>
          </div>
        </section>
      ) : (
        <section className="w-full max-w-2xl bg-linear-to-br from-[#071426] to-[#0b2a47] rounded-2xl p-8 shadow-xl border border-[#00D0A6]/10">
          <header className="mb-6 text-center">
            <h1 className="text-2xl md:text-3xl font-extrabold bg-linear-to-r from-[#5B8CFF] to-[#00D0A6] bg-clip-text text-transparent">
              Spring Boot
            </h1>
            <p className="text-sm text-[#9FD6FF] mt-2">
              Answer these <span className="text-[#5B8CFF]">20</span> questions
              to check your Spring Boot level
            </p>
          </header>

          <article>
            <h2 className="text-lg md:text-xl font-semibold text-white mb-4">
              {question.text}
            </h2>

            <div className="grid gap-3">
              {question.options.map((opt, idx) => {
                const active = selected === idx;
                const correct = submitted && idx === question.correctIndex;
                const wrong = submitted && active && !correct;

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelect(idx)}
                    disabled={submitted}
                    className={`w-full text-left p-3 rounded-lg border transition-colors flex items-center text-blue-700 cursor-pointer justify-between font-bold
                    ${
                      active
                        ? "border-[#00D0A6] bg-[#022c44]"
                        : "border-transparent bg-[#041827]"
                    }
                    ${correct ? "ring-2 ring-[#00D0A6]/40" : ""}
                    ${wrong ? "opacity-80 line-through" : ""}`}
                  >
                    <span>{opt}</span>
                    <span className="ml-4">
                      {correct && <FiCheck className="text-[#00D0A6]" />}
                      {wrong && <FiX className="text-[#ff6b6b]" />}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-6 flex items-center gap-3">
              <button
                onClick={handleSubmit}
                disabled={selected === null || submitted}
                className="px-4 py-2 bg-linear-to-r from-[#5B8CFF] to-[#00D0A6] text-black rounded-md font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit
              </button>
              <button
                onClick={HandleNext}
                disabled={selected === null || !submitted}
                className="px-4 py-2 bg-linear-to-r from-[#5B8CFF] to-[#00D0A6] text-black rounded-md font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>

              {submitted && isCorrect !== null && (
                <div className="ml-auto text-sm font-medium">
                  {isCorrect ? (
                    <span className="inline-flex items-center gap-2 text-[#00D0A6]">
                      <FiCheck /> Correct
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-2 text-[#ff6b6b]">
                      <FiX /> Incorrect
                    </span>
                  )}
                </div>
              )}
            </div>
          </article>
        </section>
      )}
    </main>
  );
};

export default SpringBoot;
