import { questions, answers } from './store.js';

import Quiz from './quiz.js';
import Question from './question.js';
import Results from './results.js';

customElements.define('quiz-app', Quiz);
customElements.define('quiz-question', Question);
customElements.define('quiz-results', Results);

customElements.whenDefined('quiz-app').then(() => {
  const quizApp = document.querySelector('quiz-app');
  quizApp.setAttribute('questions', JSON.stringify(questions));
  quizApp.setAttribute('answers', JSON.stringify(answers));
});
