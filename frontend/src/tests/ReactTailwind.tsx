import { useState } from 'react';
import { FiCheck, FiX } from 'react-icons/fi';

type Question = {
  id: number;
  text: string;
  options: string[];
  correctIndex: number;
};

const sampleQuestion: Question = {
  id: 1,
  text: 'Which utility-first CSS framework is shown in this project?',
  options: ['Bootstrap', 'Tailwind CSS', 'Material UI', 'Bulma'],
  correctIndex: 1,
};

const ReactTailwind = () => {
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  function handleSelect(idx: number) {
    if (submitted) return; 
    setSelected(idx);
  }

  function handleSubmit() {
    if (selected === null) return;
    const correct = selected === sampleQuestion.correctIndex;
    setIsCorrect(correct);
    setSubmitted(true);
  }

  function handleReset() {
    setSelected(null);
    setSubmitted(false);
    setIsCorrect(null);
  }

  return (
    <main className="min-h-screen bg-[#001427] flex items-center justify-center p-6">
      <section className="w-full max-w-2xl bg-linear-to-br from-[#071426] to-[#0b2a47] rounded-2xl p-8 shadow-xl border border-[#00D0A6]/10">
        <header className="mb-6 text-center">
          <h1 className="text-2xl md:text-3xl font-extrabold bg-linear-to-r from-[#5B8CFF] to-[#00D0A6] bg-clip-text text-transparent">
            React + Tailwind CSS Demo
          </h1>
          <p className="text-sm text-[#9FD6FF] mt-2">Quick interactive question to preview UI components and styling.</p>
        </header>

        <div className="mb-4">
          <div className="flex items-center justify-between text-sm text-[#9FD6FF] mb-2">
            <span>Question 1 of 1</span>
            <span className="font-medium">Progress</span>
          </div>
          <div className="w-full bg-[#022034] h-2 rounded-full overflow-hidden">
            <div className="h-2 bg-linear-to-r from-[#5B8CFF] to-[#00D0A6]" style={{ width: '100%' }} />
          </div>
        </div>

        <article>
          <h2 className="text-lg md:text-xl font-semibold text-white mb-4">{sampleQuestion.text}</h2>

          <div className="grid gap-3">
            {sampleQuestion.options.map((opt, idx) => {
              const active = selected === idx;
              const correct = submitted && idx === sampleQuestion.correctIndex;
              const wrong = submitted && active && !correct;

              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  disabled={submitted}
                  className={`w-full text-left p-3 rounded-lg border transition-colors flex items-center justify-between
                    ${active ? 'border-[#00D0A6] bg-[#022c44]' : 'border-transparent bg-[#041827]'}
                    ${correct ? 'ring-2 ring-[#00D0A6]/40' : ''}
                    ${wrong ? 'opacity-80 line-through' : ''}`}
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
              onClick={handleReset}
              className="px-4 py-2 bg-transparent border border-[#00D0A6]/20 text-[#9FD6FF] rounded-md hover:bg-[#022034]"
            >
              Reset
            </button>

            {submitted && isCorrect !== null && (
              <div className="ml-auto text-sm font-medium">
                {isCorrect ? (
                  <span className="inline-flex items-center gap-2 text-[#00D0A6]"><FiCheck /> Correct</span>
                ) : (
                  <span className="inline-flex items-center gap-2 text-[#ff6b6b]"><FiX /> Incorrect</span>
                )}
              </div>
            )}
          </div>
        </article>
      </section>
    </main>
  );
};

export default ReactTailwind;