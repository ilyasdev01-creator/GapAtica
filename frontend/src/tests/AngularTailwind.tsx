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
    text: "Why can using inline object literals in Angular @Input() bindings cause unnecessary change detection?",
    options: [
      "Angular compares objects by structure",
      "Objects are recreated every CD cycle",
      "Angular freezes inline values",
      "Inline objects are memoized by Angular",
    ],
    correctIndex: 1,
  },
  {
    id: 2,
    text: "Which of the following does NOT trigger Angular change detection?",
    options: [
      "Emitting a value from an EventEmitter",
      "Updating a @Input in a parent",
      "Mutating a value inside a BehaviorSubject without calling next()",
      "Running code inside a zone",
    ],
    correctIndex: 2,
  },
  {
    id: 3,
    text: "Why might 'text-primary-500' not work in a Tailwind + Angular project?",
    options: [
      "Angular removes unused CSS automatically",
      "Tailwind content paths do not include component HTML files",
      "Angular compiler strips custom classes",
      "Tailwind arbitrary values are disabled",
    ],
    correctIndex: 1,
  },
  {
    id: 4,
    text: "What happens if two Angular *ngFor items share the same trackBy value?",
    options: [
      "Angular still runs but may reuse the wrong DOM nodes",
      "Angular throws a template error",
      "The loop stops rendering",
      "Angular disables change detection for that list",
    ],
    correctIndex: 0,
  },
  {
    id: 5,
    text: "Which is a valid Tailwind arbitrary value in Angular templates?",
    options: ["[bg=red]", "bg(color='red')", "bg-[red]", "bg-[var(--red)]"],
    correctIndex: 3,
  },
  {
    id: 6,
    text: "What causes an Angular component using Suspense-like behavior (via async pipe) to delay rendering?",
    options: [
      "A thrown synchronous error",
      "An Observable that has not emitted yet",
      "A missing ChangeDetectorRef",
      "Template compilation delay",
    ],
    correctIndex: 1,
  },
  {
    id: 7,
    text: "Using too many Tailwind classes in Angular primarily affects:",
    options: [
      "Angular compiler performance",
      "Runtime rendering",
      "Change detection cycles",
      "Browser memory usage",
    ],
    correctIndex: 0,
  },
  {
    id: 8,
    text: "Why might using Angular pipes everywhere slow down performance?",
    options: [
      "Pipes cannot be pure",
      "Pipes always run on every change detection cycle",
      "Angular memoizes pipes incorrectly",
      "Pipes block template parsing",
    ],
    correctIndex: 1,
  },
  {
    id: 9,
    text: "Which Tailwind dark mode strategy requires no Angular logic?",
    options: [
      "darkMode: 'class'",
      "darkMode: 'media'",
      "Using a service",
      "Listening to matchMedia",
    ],
    correctIndex: 1,
  },
  {
    id: 10,
    text: "Which Angular lifecycle hook is called multiple times in dev mode (similar to React Strict Mode)?",
    options: ["ngOnInit", "ngAfterViewInit", "ngOnDestroy", "Constructor"],
    correctIndex: 1,
  },
  {
    id: 11,
    text: "In Tailwind plugins, which arguments are passed to the plugin function?",
    options: [
      "config, apply, generateCSS",
      "addUtilities, addComponents, theme",
      "extendTheme, addColors",
      "createVariants, applyClasses",
    ],
    correctIndex: 1,
  },
  {
    id: 12,
    text: "Why does updating a BehaviorSubject often cause many Angular re-renders?",
    options: [
      "It always clones the emitted value",
      "Every subscriber runs change detection",
      "Async pipe forces a template recompile",
      "Subjects trigger global zone.js events",
    ],
    correctIndex: 1,
  },
  {
    id: 13,
    text: "Which Tailwind layer has the highest CSS priority?",
    options: [
      "@layer base",
      "@layer components",
      "@layer utilities",
      "All equally",
    ],
    correctIndex: 2,
  },
  {
    id: 14,
    text: "Why can Angular signals outperform observables for UI state?",
    options: [
      "Signals skip template re-checking",
      "Signals use fine-grained reactivity, updating only affected consumers",
      "Signals run outside Angular zones automatically",
      "Signals batch updates implicitly",
    ],
    correctIndex: 1,
  },
  {
    id: 15,
    text: "What does enabling `important: true` in Tailwind do?",
    options: [
      "Adds !important to all utilities",
      "Fixes Angular ViewEncapsulation issues",
      "Improves build speed",
      "Makes JIT mode faster",
    ],
    correctIndex: 0,
  },
  {
    id: 16,
    text: "Why might Angular developers prefer OnPush change detection?",
    options: [
      "It prevents all change detection",
      "It updates the component only when @Input or signals change",
      "It improves routing speed",
      "It makes template parsing faster",
    ],
    correctIndex: 1,
  },
  {
    id: 17,
    text: "Which Tailwind dynamic class will NOT be generated?",
    options: ["text-red-500", "text-[32px]", "bg-[#12abff]", "text-${color}"],
    correctIndex: 3,
  },
  {
    id: 18,
    text: "When will an Angular child component NOT rerender?",
    options: [
      "Parent rerenders",
      "Child uses OnPush and @Input reference did not change",
      "Service value updated",
      "A signal inside the child changed",
    ],
    correctIndex: 1,
  },
  {
    id: 19,
    text: "Which Tailwind variant combination is valid in Angular templates?",
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
    text: "What is Angular’s Ivy engine mainly responsible for?",
    options: [
      "Managing multi-thread rendering",
      "Compiling templates to efficient instructions",
      "Reducing bundle size by 80%",
      "Replacing RxJS with signals",
    ],
    correctIndex: 1,
  },
];

const AngularTailwind = () => {
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
                  return "Advanced – Great job! You show strong mastery of Angular internals, reactivity, change detection strategies, optimization, Tailwind plugin system, and advanced utility patterns. To get even better, explore fine-grained reactivity with signals, standalone APIs, advanced routing, Tailwind theming, and scalable design patterns.";
                }
                if (pct >= 0.5) {
                  return "Intermediate – You have a solid understanding of Angular and Tailwind, but there are gaps in more advanced concepts. Work on OnPush change detection, Signals vs Observables, performance optimization, Tailwind layers, plugin usage, and dynamic class strategies. You're close to advanced—just refine your architecture and optimization skills.";
                }
                return "Beginner – You understand some Angular basics, but you need to strengthen your foundation. Focus on templates, @Input/@Output, change detection basics, and essential Tailwind concepts like responsive utilities, configuration, and correct content paths. Improving these fundamentals will help you build stable components and cleaner UIs.";
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
              Angular + Tailwind CSS
            </h1>
            <p className="text-sm text-[#9FD6FF] mt-2">
              Answer these <span className="text-[#5B8CFF]">20</span> questions
              to check your Angular + Tailwind level
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

export default AngularTailwind;
