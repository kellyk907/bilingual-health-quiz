import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          title: "Public Health Quiz",
          subtitle: "Test your knowledge • English & Español",
          question: "Question",
          of: "of",
          score: "Your Score",
          great: "Excellent! You're a public health pro!",
          good: "Great job! Keep learning.",
          try: "Not bad — try again to improve!",
          restart: "Play Again"
        }
      },
      es: {
        translation: {
          title: "Cuestionario de Salud Pública",
          subtitle: "Pon a prueba tus conocimientos • English & Español",
          question: "Pregunta",
          of: "de",
          score: "Tu Puntaje",
          great: "¡Excelente! ¡Eres un profesional de salud pública!",
          good: "¡Buen trabajo! Sigue aprendiendo.",
          try: "No está mal — ¡intenta de nuevo para mejorar!",
          restart: "Jugar de Nuevo"
        }
      }
    },
    lng: "en",
    fallbackLng: "en",
    interpolation: { escapeValue: false }
  });

export default i18n;
