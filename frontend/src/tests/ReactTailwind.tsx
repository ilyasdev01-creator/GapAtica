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
    text: "Why can adding an inline object to a useEffect dependency array cause infinite loops?",
    options: [
      "React cannot compare objects by structure",
      "Objects are always recreated on every render",
      "The effect runs only once",
      "React freezes object references",
    ],
    correctIndex: 1,
  },
  {
    id: 2,
    text: "Which change will NOT trigger a re-render in React?",
    options: [
      "Updating state with the same primitive value",
      "Updating state using functional setState",
      "Updating a ref’s .current value",
      "Parent component re-renders",
    ],
    correctIndex: 2,
  },
  {
    id: 3,
    text: "Why might the class 'text-primary-500' not work in Tailwind?",
    options: [
      "It has an invalid color code",
      "The purge/content paths are incorrect",
      "Tailwind JIT is disabled",
      "The class is used inside conditionals",
    ],
    correctIndex: 1,
  },
  {
    id: 4,
    text: "What happens if two sibling elements share the same React key?",
    options: [
      "React still works but loses accurate element tracking",
      "React throws an explicit error",
      "The application crashes",
      "Keys are ignored entirely",
    ],
    correctIndex: 0,
  },
  {
    id: 5,
    text: "Which is a valid Tailwind arbitrary transform?",
    options: [
      "transform:scale(1.2)",
      "[scale=1.2]",
      "scale-[1.2]",
      "scale(1.2)",
    ],
    correctIndex: 2,
  },
  {
    id: 6,
    text: "What causes a React component to 'suspend'?",
    options: [
      "An error occurs",
      "It throws a Promise",
      "It fails to render a child",
      "It loads CSS dynamically",
    ],
    correctIndex: 1,
  },
  {
    id: 7,
    text: "Using too many Tailwind classes primarily affects:",
    options: [
      "Build time",
      "Runtime rendering",
      "Browser memory",
      "Component re-render speed",
    ],
    correctIndex: 0,
  },
  {
    id: 8,
    text: "Why might useMemo slow down an app?",
    options: [
      "Memoized values can't be garbage collected",
      "Memoization uses heavy CPU",
      "Recomputing the dependencies is cheaper than memoizing",
      "It triggers extra re-renders",
    ],
    correctIndex: 2,
  },
  {
    id: 9,
    text: "Which Tailwind dark mode strategy requires no React logic?",
    options: [
      "darkMode: 'class'",
      "darkMode: 'media'",
      "Using React context",
      "Using localStorage manually",
    ],
    correctIndex: 1,
  },
  {
    id: 10,
    text: "Which side effect is doubled in Strict Mode (development only)?",
    options: [
      "setTimeout",
      "console.log",
      "useEffect cleanup + init",
      "useMemo recalculation",
    ],
    correctIndex: 2,
  },
  {
    id: 11,
    text: "What does Tailwind pass into the plugin function?",
    options: [
      "config, theme, apply",
      "addUtilities, addComponents, theme",
      "generateCSS, apply",
      "extendTheme, addColors",
    ],
    correctIndex: 1,
  },
  {
    id: 12,
    text: "Why does React batch state updates automatically?",
    options: [
      "To reduce memory leaks",
      "To match DOM mutations to render phases",
      "To reduce unnecessary re-renders",
      "To ensure hooks run in order",
    ],
    correctIndex: 2,
  },
  {
    id: 13,
    text: "Which Tailwind CSS layer has the highest priority?",
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
    text: "Why does updating context values often hurt performance?",
    options: [
      "It forces re-renders in all consuming components",
      "It bypasses shouldComponentUpdate",
      "It blocks the event loop",
      "It clones the entire context object",
    ],
    correctIndex: 0,
  },
  {
    id: 15,
    text: "What does enabling `important: true` in Tailwind do?",
    options: [
      "Adds !important to all utilities",
      "Removes CSS conflicts entirely",
      "Increases selector specificity",
      "Disables inline styles",
    ],
    correctIndex: 0,
  },
  {
    id: 16,
    text: "Why is useReducer sometimes preferred over useState?",
    options: [
      "It avoids re-renders",
      "State transitions are clearer for complex logic",
      "It is faster",
      "It stores state globally",
    ],
    correctIndex: 1,
  },
  {
    id: 17,
    text: "Which dynamic Tailwind class will NOT be compiled?",
    options: ["text-red-500", "text-${color}", "text-[32px]", "bg-[#123abc]"],
    correctIndex: 1,
  },
  {
    id: 18,
    text: "When does a child component NOT re-render?",
    options: [
      "The parent re-renders",
      "The child is memoized and props did not change",
      "Parent state changes",
      "Context updates",
    ],
    correctIndex: 1,
  },
  {
    id: 19,
    text: "Which Tailwind responsive variant combination is valid?",
    options: [
      "md:hover:bg-red-500",
      "hover:md:bg-red-500",
      "active:sm:bg-red-500",
      "sm:focus:hover:bg-red-500",
    ],
    correctIndex: 0,
  },
  {
    id: 20,
    text: "What is the main job of React Fiber?",
    options: [
      "Manage component lifecycle methods",
      "Control the scheduler and allow interruptible rendering",
      "Reduce bundle size",
      "Allow multi-thread rendering",
    ],
    correctIndex: 1,
  },
];

const ReactTailwind = () => {
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
                  return "Excellent! You have strong React + Tailwind skills. Keep building projects to master advanced concepts and optimization techniques.";
                }
                if (pct >= 0.5) {
                  return "Good job! You understand the basics and some intermediate concepts. Focus on mastering component patterns, state management, and Tailwind utilities.";
                }
                return "You're just starting out. It's important to focus on fundamentals: React components, props, state, and basic Tailwind styling.";
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
              React + Tailwind CSS
            </h1>
            <p className="text-sm text-[#9FD6FF] mt-2">
              Answer these <span className="text-[#5B8CFF]">20</span> questions
              to check your React + Tailwind level
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

export default ReactTailwind;
