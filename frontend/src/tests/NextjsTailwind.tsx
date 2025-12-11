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
    text: "Why can passing inline objects to a Server Component in Next.js cause hydration mismatches?",
    options: [
      "Server Components cannot accept objects",
      "Objects are serialized differently between server and client",
      "Inline objects trigger re-renders during build",
      "React rejects static object props",
    ],
    correctIndex: 1,
  },
  {
    id: 2,
    text: "Which change will NOT cause a re-render in a Next.js Client Component?",
    options: [
      "Updating a React ref",
      "Using useState to set the same primitive value",
      "Receiving new props from a parent",
      "Updating URL search params via router.push()",
    ],
    correctIndex: 1,
  },
  {
    id: 3,
    text: "Why might 'text-primary-500' not work in a Next.js + Tailwind project?",
    options: [
      "Tailwind JIT is disabled",
      "The color does not exist in the Tailwind theme",
      "Content paths do not include app/ or page files",
      "Next.js strips unused classes",
    ],
    correctIndex: 2,
  },
  {
    id: 4,
    text: "What happens if two list items in a Next.js Client Component share the same key?",
    options: [
      "React may reuse incorrect DOM nodes",
      "Next.js throws a routing error",
      "The page fails to compile",
      "React ignores all keys and renders normally",
    ],
    correctIndex: 0,
  },
  {
    id: 5,
    text: "Which is a valid Tailwind arbitrary variant in JSX?",
    options: [
      "hover=(bg-red-500)",
      "bg[color:red]",
      "bg-[rgb(200,100,50)]",
      "bg={red-500}",
    ],
    correctIndex: 2,
  },
  {
    id: 6,
    text: "Why can a Next.js Server Component 'suspend'?",
    options: [
      "An error is thrown inside the component",
      "It awaits a Promise (fetch, database, etc.)",
      "Client-side hydration fails",
      "The Route Handler is missing",
    ],
    correctIndex: 1,
  },
  {
    id: 7,
    text: "Using too many Tailwind classes in a Next.js project primarily affects:",
    options: [
      "Build time",
      "Runtime performance",
      "Hydration speed",
      "React memoization",
    ],
    correctIndex: 0,
  },
  {
    id: 8,
    text: "Why can memoizing everything (useMemo) hurt Client Component performance?",
    options: [
      "Memoized values cannot be garbage collected",
      "Dependency checks may cost more than recalculation",
      "Memo forces hydration to restart",
      "Next.js blocks memoization during builds",
    ],
    correctIndex: 1,
  },
  {
    id: 9,
    text: "Which dark mode configuration requires no Next.js logic?",
    options: [
      "darkMode: 'class'",
      "darkMode: 'media'",
      "Using useTheme() hook",
      "Storing theme in cookies",
    ],
    correctIndex: 1,
  },
  {
    id: 10,
    text: "In development, which effect is intentionally executed twice by React?",
    options: [
      "useMemo",
      "useCallback",
      "useEffect (init + cleanup)",
      "useLayoutEffect",
    ],
    correctIndex: 2,
  },
  {
    id: 11,
    text: "Which arguments does Tailwind pass to the plugin function?",
    options: [
      "config, apply, theme",
      "generateCSS, applyClasses",
      "addUtilities, addComponents, theme",
      "extendColors, applyThemes",
    ],
    correctIndex: 2,
  },
  {
    id: 12,
    text: "Why do frequent router.push() calls in Next.js slow down a page?",
    options: [
      "They rebuild the entire bundle",
      "Each call triggers a new React render and state reset",
      "They bypass the cache and trigger network fetches",
      "Router events run outside React",
    ],
    correctIndex: 2,
  },
  {
    id: 13,
    text: "Which Tailwind layer has the highest priority?",
    options: [
      "@layer base",
      "@layer components",
      "@layer utilities",
      "All layers equal priority",
    ],
    correctIndex: 2,
  },
  {
    id: 14,
    text: "Why can using useContext in deeply nested Next.js Client Components hurt performance?",
    options: [
      "Context blocks streaming of Server Components",
      "Updating context forces all consuming components to rerender",
      "Context data cannot be serialized",
      "Context resets on route transitions",
    ],
    correctIndex: 1,
  },
  {
    id: 15,
    text: "What does enabling `important: true` in Tailwind do?",
    options: [
      "Adds !important to all utility classes",
      "Improves JIT compilation speed",
      "Fixes module boundary conflicts",
      "Adds vendor prefixes automatically",
    ],
    correctIndex: 0,
  },
  {
    id: 16,
    text: "Why might useReducer be preferred over useState in Next.js Client Components?",
    options: [
      "It prevents rerenders",
      "It organizes complex state transitions better",
      "It works only in Server Components",
      "It increases hydration speed",
    ],
    correctIndex: 1,
  },
  {
    id: 17,
    text: "Which Tailwind dynamic class will NOT be generated?",
    options: ["bg-red-500", "bg-[#12aeff]", "p-[32px]", "bg-${color}"],
    correctIndex: 3,
  },
  {
    id: 18,
    text: "When will a Next.js Client Component NOT re-render?",
    options: [
      "Parent Server Component re-renders",
      "Props reference remains unchanged",
      "useState value updates",
      "Context provider value changes",
    ],
    correctIndex: 1,
  },
  {
    id: 19,
    text: "Which Tailwind responsive variant is valid?",
    options: [
      "md:hover:bg-red-500",
      "hover:md:bg-red-500",
      "focus:sm:hover:bg-red-500",
      "active:xs:bg-red-500",
    ],
    correctIndex: 0,
  },
  {
    id: 20,
    text: "What is the main role of the Next.js React Server Components architecture?",
    options: [
      "Reduce bundle size by moving logic to the server",
      "Enable multi-thread React rendering",
      "Remove hydration entirely",
      "Replace Client Components",
    ],
    correctIndex: 0,
  },
];

const NextjsTailwind = () => {
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
                  return "Excellent! You have a strong grasp of Next.js routing, data fetching, server components, Tailwind utility classes, optimization patterns, and state handling. You understand performance techniques, best practices, and how to structure scalable Next.js apps. Keep pushing — you're on your way to advanced architecture and production-level workflows.";
                }
                if (pct >= 0.5) {
                  return "Good job! You understand the fundamentals of Next.js pages, components, Tailwind styling, and core concepts, but there are still areas to strengthen such as server actions, advanced layout patterns, dynamic routes, or Tailwind customization. With more practice, you’ll reach full proficiency.";
                }
                return "You're getting started! You likely understand basic React and Tailwind but still need to solidify essential Next.js concepts like routing, server/client components, and Tailwind usage. Keep practicing—focus on fundamentals and small projects to build confidence quickly.";
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
              Next.js + Tailwind CSS
            </h1>
            <p className="text-sm text-[#9FD6FF] mt-2">
              Answer these <span className="text-[#5B8CFF]">20</span> questions
              to check your Next.js + Tailwind level
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

export default NextjsTailwind;
