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
    text: "What does `app.use()` do in Express?",
    options: [
      "Registers middleware for all routes",
      "Defines a GET route",
      "Starts the server",
      "Handles errors only",
    ],
    correctIndex: 0,
  },
  {
    id: 2,
    text: "Which method is used to send JSON responses in Express?",
    options: ["res.send()", "res.json()", "res.data()", "res.write()"],
    correctIndex: 1,
  },
  {
    id: 3,
    text: "What is the purpose of `next()` in Express middleware?",
    options: [
      "Stops middleware execution",
      "Moves to the next middleware in the chain",
      "Sends a response",
      "Restarts the server",
    ],
    correctIndex: 1,
  },
  {
    id: 4,
    text: "Which of these is a valid route parameter in Express?",
    options: ["/user/:id", "/user/{id}", "/user/$id", "/user/id"],
    correctIndex: 0,
  },
  {
    id: 5,
    text: "How do you handle errors in asynchronous Express routes?",
    options: [
      "Wrap in try/catch and call next(err)",
      "Throw the error only",
      "Use res.status(500).send() outside try/catch",
      "No handling needed",
    ],
    correctIndex: 0,
  },
  {
    id: 6,
    text: "Which object contains query parameters in Express?",
    options: ["req.params", "req.query", "req.body", "req.route"],
    correctIndex: 1,
  },
  {
    id: 7,
    text: "What is the correct way to start an Express server on port 3000?",
    options: [
      "app.listen(3000, () => console.log('Server running'))",
      "server.start(3000)",
      "node app.listen(3000)",
      "express.run(3000)",
    ],
    correctIndex: 0,
  },
  {
    id: 8,
    text: "Which middleware parses JSON request bodies?",
    options: [
      "express.json()",
      "express.urlencoded()",
      "bodyParser.text()",
      "express.body()",
    ],
    correctIndex: 0,
  },
  {
    id: 9,
    text: "What happens if two middleware functions call `next()` without sending a response?",
    options: [
      "Server crashes",
      "Response hangs until a middleware sends it",
      "Express automatically sends 404",
      "It’s ignored",
    ],
    correctIndex: 1,
  },
  {
    id: 10,
    text: "Which of these is a common use of Express Router?",
    options: [
      "Modularizing routes for different parts of the app",
      "Handling static files",
      "Connecting to databases",
      "Configuring the event loop",
    ],
    correctIndex: 0,
  },
  {
    id: 11,
    text: "How do you define a route that responds to all HTTP methods?",
    options: [
      "app.all('/route')",
      "app.use('/route')",
      "app.route('/route')",
      "app.any('/route')",
    ],
    correctIndex: 0,
  },
  {
    id: 12,
    text: "Which Node.js module helps with file path manipulations?",
    options: ["fs", "path", "os", "http"],
    correctIndex: 1,
  },
  {
    id: 13,
    text: "Why should you avoid synchronous file system operations in Node.js?",
    options: [
      "They block the event loop, slowing the app",
      "They crash the server automatically",
      "They cause memory leaks",
      "They don’t work in Express",
    ],
    correctIndex: 0,
  },
  {
    id: 14,
    text: "What is the difference between `req.params` and `req.query`?",
    options: [
      "req.params is for URL params; req.query is for query string parameters",
      "req.params is global; req.query is local",
      "They are identical",
      "req.query only works with POST requests",
    ],
    correctIndex: 0,
  },
  {
    id: 15,
    text: "Which method is used to redirect in Express?",
    options: [
      "res.redirect()",
      "res.sendRedirect()",
      "res.route()",
      "res.go()",
    ],
    correctIndex: 0,
  },
  {
    id: 16,
    text: "Which is a correct way to import Express in Node.js (CommonJS)?",
    options: [
      "const express = require('express')",
      "import express from 'express'",
      "require express",
      "express = import('express')",
    ],
    correctIndex: 0,
  },
  {
    id: 17,
    text: "Why is middleware order important in Express?",
    options: [
      "It determines which middleware runs first",
      "It doesn’t matter",
      "Express sorts middleware alphabetically",
      "Middleware runs in reverse order",
    ],
    correctIndex: 0,
  },
  {
    id: 18,
    text: "Which method sets custom HTTP headers in Express responses?",
    options: [
      "res.setHeader()",
      "res.header()",
      "res.sendHeader()",
      "res.addHeader()",
    ],
    correctIndex: 0,
  },
  {
    id: 19,
    text: "What is the purpose of `res.locals`?",
    options: [
      "To share data between middleware and route handlers during one request",
      "To store global variables across requests",
      "To persist data in the database",
      "To cache responses",
    ],
    correctIndex: 0,
  },
  {
    id: 20,
    text: "Which command initializes a Node.js project with a package.json file?",
    options: ["npm init", "node init", "npm start", "node package"],
    correctIndex: 0,
  },
];

const NodeExpress = () => {
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
                  return "Excellent! You have strong Node.js + Express skills. Keep building APIs and exploring advanced topics like middleware, async/await, and error handling.";
                }
                if (pct >= 0.5) {
                  return "Good job! You understand the basics and some intermediate concepts. Focus on mastering routing, middleware, and proper async patterns.";
                }
                return "You're just starting out. It's important to focus on fundamentals: Node.js runtime, Express setup, routes, requests, and responses.";
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
              Node + Express
            </h1>
            <p className="text-sm text-[#9FD6FF] mt-2">
              Answer these <span className="text-[#5B8CFF]">20</span> questions
              to check your Node + Express
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

export default NodeExpress;
