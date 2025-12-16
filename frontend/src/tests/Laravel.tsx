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
    text: "Why can passing Eloquent models directly to Blade views sometimes cause performance issues?",
    options: [
      "Blade cannot render objects",
      "Models may trigger lazy loading during view rendering",
      "Models are serialized twice",
      "Views run database queries automatically",
    ],
    correctIndex: 1,
  },
  {
    id: 2,
    text: "Which Laravel feature helps prevent the N+1 query problem?",
    options: ["Accessors", "Mutators", "Eager loading", "Query scopes"],
    correctIndex: 2,
  },
  {
    id: 3,
    text: "What happens when you cache a route in Laravel?",
    options: [
      "Routes are compiled into a single PHP file",
      "Controllers are cached in memory",
      "Middleware execution is skipped",
      "Routes become immutable at runtime",
    ],
    correctIndex: 0,
  },
  {
    id: 4,
    text: "Why should you avoid using env() directly outside config files?",
    options: [
      "env() is deprecated",
      "Environment variables are encrypted",
      "Cached config prevents env() updates from being read",
      "env() causes memory leaks",
    ],
    correctIndex: 2,
  },
  {
    id: 5,
    text: "Which queue driver supports job prioritization?",
    options: ["sync", "database", "redis", "array"],
    correctIndex: 2,
  },
  {
    id: 6,
    text: "Why might a queued job fail after deployment but work locally?",
    options: [
      "Queue workers were not restarted",
      "Laravel does not support queues in production",
      "Jobs cannot access environment variables",
      "Queue tables are read-only",
    ],
    correctIndex: 0,
  },
  {
    id: 7,
    text: "What is the main purpose of Form Request classes?",
    options: [
      "Handle database transactions",
      "Centralize validation and authorization logic",
      "Improve request performance",
      "Replace controllers",
    ],
    correctIndex: 1,
  },
  {
    id: 8,
    text: "Which Laravel feature allows logic to run before and after HTTP requests?",
    options: ["Observers", "Middleware", "Policies", "Service providers"],
    correctIndex: 1,
  },
  {
    id: 9,
    text: "Why is using chunk() preferable when processing large datasets?",
    options: [
      "It speeds up queries",
      "It avoids loading all records into memory",
      "It locks the table",
      "It bypasses model events",
    ],
    correctIndex: 1,
  },
  {
    id: 10,
    text: "What does `$fillable` protect against in Eloquent models?",
    options: [
      "SQL injection",
      "Mass assignment vulnerabilities",
      "Race conditions",
      "Invalid relationships",
    ],
    correctIndex: 1,
  },
  {
    id: 11,
    text: "Which Laravel caching strategy is best for shared, high-traffic data?",
    options: ["file", "array", "database", "redis"],
    correctIndex: 3,
  },
  {
    id: 12,
    text: "What happens if two scheduled tasks share the same cron expression?",
    options: [
      "Only one will run",
      "They run sequentially",
      "They may run concurrently",
      "Laravel throws an exception",
    ],
    correctIndex: 2,
  },
  {
    id: 13,
    text: "Why should heavy logic be avoided inside Blade templates?",
    options: [
      "Blade disallows PHP logic",
      "It increases memory usage",
      "It makes views harder to maintain and test",
      "It breaks route caching",
    ],
    correctIndex: 2,
  },
  {
    id: 14,
    text: "Which method prevents duplicate job execution in Laravel queues?",
    options: [
      "withoutOverlapping()",
      "retryUntil()",
      "unique()",
      "ShouldBeUnique",
    ],
    correctIndex: 3,
  },
  {
    id: 15,
    text: "What is the main advantage of using API Resources?",
    options: [
      "Faster JSON encoding",
      "Automatic pagination",
      "Consistent and controlled response structure",
      "Built-in authentication",
    ],
    correctIndex: 2,
  },
  {
    id: 16,
    text: "Why can using `all()` on a model with many records be dangerous?",
    options: [
      "It disables pagination",
      "It ignores query scopes",
      "It loads all records into memory",
      "It bypasses caching",
    ],
    correctIndex: 2,
  },
  {
    id: 17,
    text: "Which Laravel feature is best for encapsulating business logic?",
    options: ["Controllers", "Blade components", "Service classes", "Routes"],
    correctIndex: 2,
  },
  {
    id: 18,
    text: "Why should database transactions be used for critical operations?",
    options: [
      "They speed up queries",
      "They ensure atomicity and data consistency",
      "They reduce memory usage",
      "They enable caching",
    ],
    correctIndex: 1,
  },
  {
    id: 19,
    text: "Which Artisan command improves performance in production?",
    options: ["route:list", "config:cache", "migrate:fresh", "tinker"],
    correctIndex: 1,
  },
  {
    id: 20,
    text: "What is the main role of Service Providers in Laravel?",
    options: [
      "Handle HTTP requests",
      "Register bindings and bootstrap application services",
      "Render Blade templates",
      "Define database schemas",
    ],
    correctIndex: 1,
  },
];

const Laravel = () => {
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
                  return "Excellent! You have a strong grasp of Laravel’s core architecture, including Eloquent relationships, queues, caching, middleware, service providers, and performance best practices. You understand how to structure scalable applications and handle real-world production concerns. You’re well on your way to advanced Laravel mastery.";
                }
                if (pct >= 0.5) {
                  return "Good job! You understand Laravel fundamentals such as routing, controllers, Blade views, validation, and basic Eloquent usage. However, there’s room to improve in areas like queues, caching strategies, service containers, and application architecture. With more hands-on practice, you’ll reach an advanced level.";
                }
                return "You’re getting started! You likely understand basic PHP and Laravel concepts, but key ideas like Eloquent relationships, middleware, queues, and configuration management still need strengthening. Focus on the fundamentals and build small Laravel projects to gain confidence and practical experience.";
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
              Laravel
            </h1>
            <p className="text-sm text-[#9FD6FF] mt-2">
              Answer these <span className="text-[#5B8CFF]">20</span> questions
              to check your Laravel level
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

export default Laravel;
