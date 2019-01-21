const template = document.createElement('template');
template.innerHTML = `
  <style>
    .btn {
      cursor: pointer;
      display: inline-block;
      font-weight: 400;
      color: #212529;
      text-align: center;
      vertical-align: middle;
      user-select: none;
      background-color: transparent;
      border: 1px solid transparent;
      padding: 0.375rem 0.75rem;
      font-size: 1rem;
      line-height: 1.5;
      border-radius: 0.25rem;
      transition: color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    }

    .btn:hover {
      color: #212529;
      text-decoration: none;
    }

    .btn-primary {
      color: #000;
      background-color: #fff;
      border-color: #007bff;
    }

    .btn-primary:hover {
      border-color: #0062cc;
    }

    .btn-primary:focus {
      box-shadow: 0 0 0 0.2rem rgba(38, 143, 255, 0.5);
    }

    .btn-lg {
      padding: 0.5rem 1rem;
      font-size: 1.25rem;
      line-height: 1.5;
      border-radius: 0.3rem;

      border-radius: 100%;
      padding: 50px 22px;
    }

    .centralize {
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  </style>

  <div class="centralize">
    <button type="button" class="btn btn-primary btn-lg">Start Quiz</button>
  </div>
`;

class Quiz extends HTMLElement {
  get questions() {
    return JSON.parse(this.getAttribute('questions'));
  }

  get answers() {
    return JSON.parse(this.getAttribute('answers'));
  }

  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: 'open' });
    this.shadow.appendChild(template.content.cloneNode(true));
    this.index = 0;
    this.correctAnswers = 0;
  }

  answerQuestion() {
    this.index += 1;
    const z = this.shadow.querySelector('quiz-question').shadowRoot.querySelector('input[type="radio"]:checked');
    const nedeedEl = this.answers.find(answ => answ.id === Number(z.name));
    const isCorrect = () => nedeedEl.answer === Number(z.id);
    this.questionEl.setAttribute('correctness', isCorrect());
    if (isCorrect()) { this.correctAnswers += 1; }
    if (this.questions.length - 1 === this.index) {
      const resultsEl = document.createElement('quiz-results');
      resultsEl.setAttribute('correct-answers', this.correctAnswers);
      resultsEl.setAttribute('total-answers', this.questions.length);
      this.shadow.appendChild(resultsEl);
      this.shadow.removeChild(this.questionEl);
    } else {
      this.questionEl.setAttribute('question', JSON.stringify(this.questions[this.index]));
    }
  }

  startQuiz() {
    this.questionEl = document.createElement('quiz-question');
    this.questionEl.setAttribute('question', JSON.stringify(this.questions[this.index]));
    this.shadow.appendChild(this.questionEl);
    this.shadow.removeChild(this.btn.parentNode);

    const answerBtn = this.shadow.querySelector('quiz-question').shadowRoot.querySelector('button');
    answerBtn.onclick = this.answerQuestion.bind(this);
  }

  connectedCallback() {
    this.btn = this.shadow.querySelector('button');
    this.btn.onclick = this.startQuiz.bind(this);
  }
}

export default Quiz;
