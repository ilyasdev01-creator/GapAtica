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
    text: "Why can using reactive({}) instead of ref({}) cause unintended reactivity behavior?",
    options: [
      "reactive does not track nested objects",
      "reactive caches values incorrectly",
      "reactive unwraps proxies in templates",
      "ref cannot hold objects",
    ],
    correctIndex: 2,
  },
  {
    id: 2,
    text: "Which lifecycle hook is guaranteed to run *after* the DOM is updated?",
    options: ["onMounted", "onUpdated", "onBeforeMount", "onRenderTracked"],
    correctIndex: 1,
  },
  {
    id: 3,
    text: "Why might a Tailwind class like 'text-primary-500' not apply inside a Vue SFC?",
    options: [
      "The class is invalid",
      "Tailwind content paths exclude .vue files or nested directories",
      "Vue strips class bindings",
      "Prefetch mode disables classes",
    ],
    correctIndex: 1,
  },
  {
    id: 4,
    text: "Which Vue feature can create performance issues when misused?",
    options: [
      "Props",
      "Computed properties",
      "Watchers on deep objects",
      "Template refs",
    ],
    correctIndex: 2,
  },
  {
    id: 5,
    text: "Which is a valid Tailwind arbitrary variant inside Vue?",
    options: [
      "hover:bg-(red-500)",
      "hover:(bg-red-500)",
      "hover:bg-[red-500]",
      "hover:bg-red-500",
    ],
    correctIndex: 3,
  },
  {
    id: 6,
    text: "Why does Vue trigger a rerender when using reactive arrays?",
    options: [
      "Vue tracks array mutations through proxies",
      "Vue converts arrays into refs",
      "Arrays cannot be reactive",
      "Vue clones arrays on each render",
    ],
    correctIndex: 0,
  },
  {
    id: 7,
    text: "Which Tailwind feature increases bundle size if used excessively?",
    options: [
      "JIT mode",
      "Arbitrary values",
      "Variants like hover:",
      "Applying classes inside v-if",
    ],
    correctIndex: 1,
  },
  {
    id: 8,
    text: "Why might computed properties be slower than expected?",
    options: [
      "They recompute on every render",
      "They depend on non-reactive values",
      "They aren't cached when returning objects",
      "They track too many dependencies",
    ],
    correctIndex: 3,
  },
  {
    id: 9,
    text: "Which Tailwind dark mode strategy requires *no Vue logic*?",
    options: [
      "darkMode: 'class'",
      "darkMode: 'media'",
      "LocalStorage + watcher",
      "Global provide/inject",
    ],
    correctIndex: 1,
  },
  {
    id: 10,
    text: "What happens if you mutate props directly in Vue?",
    options: [
      "Vue auto-fixes the mutation",
      "Vue warns and the mutation won’t update the parent",
      "The mutation syncs with the parent",
      "The component crashes",
    ],
    correctIndex: 1,
  },
  {
    id: 11,
    text: "Which Tailwind directive allows you to register custom utilities?",
    options: [
      "@tailwind base",
      "@tailwind components",
      "@layer utilities",
      "@apply",
    ],
    correctIndex: 2,
  },
  {
    id: 12,
    text: "Why does Vue batch state updates?",
    options: [
      "To preserve hook order",
      "To reduce DOM updates and improve performance",
      "To avoid circular dependencies",
      "To format events",
    ],
    correctIndex: 1,
  },
  {
    id: 13,
    text: "Which Vue feature can help optimize large lists?",
    options: ["Teleport", "Suspense", "v-memo", "v-once inside each item"],
    correctIndex: 2,
  },
  {
    id: 14,
    text: "Why do dynamic Tailwind classes sometimes fail inside Vue?",
    options: [
      "Vue strips dynamic classes",
      "Tailwind cannot see runtime-generated class names",
      "JIT mode is disabled by default",
      "Vue compiles classes into scoped modules",
    ],
    correctIndex: 1,
  },
  {
    id: 15,
    text: "What does important: true do in Tailwind?",
    options: [
      "Adds !important to all utilities",
      "Removes unused CSS",
      "Weakens style priority",
      "Disables inline styles",
    ],
    correctIndex: 0,
  },
  {
    id: 16,
    text: "Why is defineEmits useful in TypeScript Vue apps?",
    options: [
      "It prevents watchers from running",
      "It guarantees event payload types",
      "It makes props reactive",
      "It removes the need for emit()",
    ],
    correctIndex: 1,
  },
  {
    id: 17,
    text: "Which Tailwind class will definitely NOT be compiled?",
    options: [
      "bg-red-500",
      "bg-[var(--color)]",
      `bg-\${color}`,
      "bg-[#123abc]",
    ],
    correctIndex: 2,
  },
  {
    id: 18,
    text: "When does a child component NOT re-render in Vue?",
    options: [
      "Parent updates",
      "Child uses shallowRef as props",
      "Props unchanged + <script setup> optimization",
      "Context updates",
    ],
    correctIndex: 2,
  },
  {
    id: 19,
    text: "Which Tailwind variant order is valid?",
    options: [
      "hover:md:bg-red-500",
      "md:hover:bg-red-500",
      "sm:active:hover:bg-red-500",
      "focus:sm:hover:bg-red-500",
    ],
    correctIndex: 1,
  },
  {
    id: 20,
    text: "Why does Vue's reactivity system use proxies instead of getters/setters?",
    options: [
      "Proxies work only in modern browsers",
      "Proxies allow tracking new properties added at runtime",
      "Getters/setters are faster",
      "Proxies reduce memory usage",
    ],
    correctIndex: 1,
  },
];

const VueTailwind = () => {
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
                  return "Advanced – Great job! You show a strong understanding of rendering behavior, reactivity, performance, Tailwind internals, and architecture patterns. Keep improving by exploring: Suspense, concurrent rendering, custom Tailwind plugins, component composition, and large-scale state patterns.";
                }
                if (pct >= 0.5) {
                  return "Intermediate – You have a solid understanding, but there are gaps in optimization and advanced patterns. Work on: memoization (useMemo/computed), rendering performance, context/state architecture, and advanced Tailwind features like plugins, arbitrary values, and responsive variants.";
                }
                return "Beginner – You understand some basics, but you need to strengthen core concepts. Focus on: state management (React/Vue), component lifecycles, re-render logic, and Tailwind fundamentals like utility classes, layers, and the config system.";
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
              Vue + Tailwind CSS
            </h1>
            <p className="text-sm text-[#9FD6FF] mt-2">
              Answer these <span className="text-[#5B8CFF]">20</span> questions
              to check your Vue + Tailwind level
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

export default VueTailwind;
