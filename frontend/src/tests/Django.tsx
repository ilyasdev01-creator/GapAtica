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
    text: "Which file in a Django app defines the URL patterns?",
    options: ["urls.py", "views.py", "models.py", "settings.py"],
    correctIndex: 0,
  },
  {
    id: 2,
    text: "What does `manage.py makemigrations` do?",
    options: [
      "Applies migrations to the database",
      "Creates migration files based on model changes",
      "Resets the database",
      "Creates a superuser",
    ],
    correctIndex: 1,
  },
  {
    id: 3,
    text: "Which Django feature automatically prevents SQL injection?",
    options: [
      "CSRF Middleware",
      "QuerySet parameterization",
      "Django Forms",
      "Admin panel",
    ],
    correctIndex: 1,
  },
  {
    id: 4,
    text: "What is the default primary key type in Django models?",
    options: ["IntegerField", "AutoField", "UUIDField", "CharField"],
    correctIndex: 1,
  },
  {
    id: 5,
    text: "Which decorator restricts a Django view to logged-in users?",
    options: [
      "@login_required",
      "@authenticated",
      "@user_only",
      "@auth_required",
    ],
    correctIndex: 0,
  },
  {
    id: 6,
    text: "What is the purpose of `related_name` in a Django model field?",
    options: [
      "Specifies the reverse relation name",
      "Renames the database table",
      "Defines the field default value",
      "Changes the primary key",
    ],
    correctIndex: 0,
  },
  {
    id: 7,
    text: "Which setting must be configured for Django’s static files to work in production?",
    options: ["STATIC_ROOT", "MEDIA_URL", "TEMPLATES_DIR", "DATABASES"],
    correctIndex: 0,
  },
  {
    id: 8,
    text: "What type of database query does `select_related()` optimize?",
    options: [
      "Many-to-many relationships",
      "Foreign key (one-to-many) relationships",
      "Raw SQL queries",
      "Aggregation queries",
    ],
    correctIndex: 1,
  },
  {
    id: 9,
    text: "Which method on a Django model instance saves it to the database?",
    options: ["commit()", "save()", "create()", "update()"],
    correctIndex: 1,
  },
  {
    id: 10,
    text: "What is the role of `ALLOWED_HOSTS` in settings.py?",
    options: [
      "Defines which templates can be loaded",
      "Specifies which hosts can serve the app",
      "Lists allowed database hosts",
      "Configures static file hosts",
    ],
    correctIndex: 1,
  },
  {
    id: 11,
    text: "Which Django feature helps prevent Cross-Site Request Forgery attacks?",
    options: [
      "CSRF Middleware",
      "Session Authentication",
      "Form Validation",
      "Admin Panel",
    ],
    correctIndex: 0,
  },
  {
    id: 12,
    text: "What is the difference between `filter()` and `get()` in Django QuerySets?",
    options: [
      "filter() returns multiple objects, get() returns a single object",
      "filter() deletes objects, get() retrieves objects",
      "filter() modifies objects, get() clones objects",
      "filter() caches queries, get() does not",
    ],
    correctIndex: 0,
  },
  {
    id: 13,
    text: "Which command creates a new Django project?",
    options: [
      "django-admin startproject",
      "django startapp",
      "python manage.py init",
      "django-admin new",
    ],
    correctIndex: 0,
  },
  {
    id: 14,
    text: "In Django forms, which method validates form data?",
    options: ["is_valid()", "validate()", "check()", "clean_data()"],
    correctIndex: 0,
  },
  {
    id: 15,
    text: "Which class-based view handles creating new model instances?",
    options: ["ListView", "CreateView", "DetailView", "UpdateView"],
    correctIndex: 1,
  },
  {
    id: 16,
    text: "What does `prepopulated_fields` in Django Admin do?",
    options: [
      "Automatically fills fields based on other fields",
      "Sets default values for fields",
      "Encrypts sensitive fields",
      "Validates fields in forms",
    ],
    correctIndex: 0,
  },
  {
    id: 17,
    text: "Which signal is sent before a Django model instance is saved?",
    options: ["pre_save", "post_save", "pre_delete", "post_delete"],
    correctIndex: 0,
  },
  {
    id: 18,
    text: "What is the default template engine in Django?",
    options: ["Jinja2", "Mako", "Django Template Language", "Mustache"],
    correctIndex: 2,
  },
  {
    id: 19,
    text: "Which Django feature helps manage database schema migrations?",
    options: ["South", "ORM", "Migrations", "Signals"],
    correctIndex: 2,
  },
  {
    id: 20,
    text: "Which method allows you to add custom validation to a Django model field?",
    options: [
      "clean_<fieldname>()",
      "validate()",
      "pre_save()",
      "form_valid()",
    ],
    correctIndex: 0,
  },
];

const Django = () => {
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
                  return "Excellent! You have a strong grasp of Django models, views, forms, ORM queries, admin customization, middleware, and project structure. You understand how to handle authentication, data validation, and migrations efficiently. Keep pushing — you're on your way to advanced Django architecture and production-ready applications.";
                }
                if (pct >= 0.5) {
                  return "Good job! You understand the fundamentals of Django models, views, templates, forms, and core ORM operations, but there are still areas to strengthen such as signals, class-based views, advanced query optimization, and admin customization. With more practice, you’ll reach full proficiency.";
                }
                return "You're getting started! You likely understand basic Python and Django concepts but still need to solidify essentials like models, views, templates, forms, and ORM queries. Keep practicing—focus on building small projects to gain confidence and experience.";
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
              Django(Python)
            </h1>
            <p className="text-sm text-[#9FD6FF] mt-2">
              Answer these <span className="text-[#5B8CFF]">20</span> questions
              to check your Django level
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

export default Django;
