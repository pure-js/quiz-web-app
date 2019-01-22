import { questions, answers } from './store.js';

import Quiz from './quiz.js';
import Question from './question.js';
import Results from './results.js';

customElements.define('quiz-app', Quiz);
customElements.define('quiz-question', Question);
customElements.define('quiz-results', Results);

function addQuizApp() {
  const quizApp = document.createElement('quiz-app');
  const container = document.querySelector('.container');
  quizApp.setAttribute('questions', JSON.stringify(questions));
  quizApp.setAttribute('answers', JSON.stringify(answers));
  container.appendChild(quizApp);
}
document.addEventListener('DOMContentLoaded', addQuizApp);
