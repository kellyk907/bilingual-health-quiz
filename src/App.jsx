import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './i18n';

const questions = [
  {
    id: 1,
    question_en: "Handwashing with soap reduces germs by up to:",
    question_es: "Lavarse las manos con jabón reduce los gérmenes hasta:",
    options: ["50%", "75%", "99%", "25%"],
    correct: 2
  },
  {
    id: 2,
    question_en: "How many hours should adults sleep per night?",
    question_es: "¿Cuántas horas deben dormir los adultos por noche?",
    options: ["5–6", "7–9", "10–11", "4–5"],
    correct: 1
  },
  {
    id: 3,
    question_en: "Which vaccine prevents cervical cancer?",
    question_es: "¿Qué vacuna previene el cáncer cervical?",
    options: ["Flu", "HPV", "MMR", "Tdap"],
    correct: 1
  },
  {
    id: 4,
    question_en: "What is the leading cause of lung cancer?",
    question_es: "¿Cuál es la principal causa de cáncer de pulmón?",
    options: ["Air pollution", "Smoking", "Genetics", "Diet"],
    correct: 1
  },
  {
    id: 5,
    question_en: "How far should you stay from a sick person?",
    question_es: "¿A qué distancia debes estar de una persona enferma?",
    options: ["1 foot", "3 feet", "6 feet", "10 feet"],
    correct: 2
  }
];

export default function App() {
  const { t, i18n } = useTranslation();
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selected, setSelected] = useState(null);

  const handleAnswer = (index) => {
    setSelected(index);
    if (index === questions[current].correct) {
      setScore(score + 1);
    }

    setTimeout(() => {
      const next = current + 1;
      if (next < questions.length) {
        setCurrent(next);
        setSelected(null);
      } else {
        setShowScore(true);
      }
    }, 800);
  };

  const reset = () => {
    setCurrent(0);
    setScore(0);
    setShowScore(false);
    setSelected(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-md mx-auto">
        {/* Language Toggle */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => i18n.changeLanguage(i18n.language === 'en' ? 'es' : 'en')}
            className="px-4 py-2 bg-white rounded-lg shadow text-sm font-medium hover:shadow-md transition"
          >
            {i18n.language === 'en' ? '🇪🇸 Español' : '🇺🇸 English'}
          </button>
        </div>

        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h1 className="text-2xl font-bold text-center text-indigo-700">
            {t('title')}
          </h1>
          <p className="text-center text-gray-600 mt-2">{t('subtitle')}</p>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>{t('question')} {current + 1} {t('of')} {questions.length}</span>
            <span>{score}/{current}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-indigo-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${((current + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Quiz Content */}
        {!showScore ? (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-lg font-semibold mb-6">
              {i18n.language === 'en' ? questions[current].question_en : questions[current].question_es}
            </h2>
            <div className="space-y-3">
              {questions[current].options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  disabled={selected !== null}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                    selected === i
                      ? i === questions[current].correct
                        ? 'border-green-500 bg-green-50'
                        : 'border-red-500 bg-red-50'
                      : 'border-gray-300 hover:border-indigo-400 hover:bg-indigo-50'
                  } ${selected !== null ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <span className="font-medium">{opt}</span>
                  {selected === i && i === questions[current].correct && (
                    <span className="ml-2 text-green-600">✓</span>
                  )}
                  {selected === i && i !== questions[current].correct && (
                    <span className="ml-2 text-red-600">✗</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <h2 className="text-3xl font-bold text-indigo-700 mb-4">
              {t('score')}: {score}/{questions.length}
            </h2>
            <p className="text-lg mb-6">
              {score >= 4 ? t('great') : score >= 3 ? t('good') : t('try')}
            </p>
            <button
              onClick={reset}
              className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition"
            >
              {t('restart')}
            </button>
          </div>
        )}

        {/* Footer */}
        <p className="text-center text-xs text-gray-500 mt-8">
          Built by Kelly Kroeper, MPH | React + Tailwind | <a href="https://kellyk907.github.io/portfolio/" className="underline">Portfolio</a>
        </p>
      </div>
    </div>
  );
}
