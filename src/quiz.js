const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: block;
    }
    .btn-primary {
      cursor: pointer;
      display: inline-block;
      font-weight: 400;
      text-align: center;
      vertical-align: middle;
      user-select: none;
      background-color: transparent;
      border: 1px solid #007bff;;
      transition: color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
      color: #000;
      font-size: 1.25rem;
      line-height: 1.5;
      border-radius: 100%;
      padding: 50px 22px;
    }
    .btn-primary:hover {
      color: #212529;
      text-decoration: none;
      border-color: #0062cc;
    }
    .btn-primary:focus {
      box-shadow: 0 0 0 0.2rem rgba(38, 143, 255, 0.5);
    }
    .centralize {
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  </style>

  <div class="centralize">
    <button type="button" class="btn-primary">Start Quiz</button>
  </div>
`;

class Quiz extends HTMLElement {
  get questions() {
    return JSON.parse(this.getAttribute('questions'));
  }

  get answers() {
    return JSON.parse(this.getAttribute('answers'));
  }

  get isCorrectAnswer() {
    const chosen = this.shadow.querySelector('quiz-question').shadowRoot.querySelector('input[type="radio"]:checked');
    const correct = this.answers.find(answer => answer.id === Number(chosen.name));
    return correct.answer === Number(chosen.id);
  }

  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: 'open' });
    this.shadow.appendChild(template.content.cloneNode(true));
    this.index = 0;
    this.correctAnswers = 0;
  }

  addResultsComponent() {
    this.resultsEl = document.createElement('quiz-results');
    this.resultsEl.setAttribute('correct-answers', this.correctAnswers);
    this.resultsEl.setAttribute('total-answers', this.questions.length);
    this.shadow.appendChild(this.resultsEl);
    this.shadow.removeChild(this.questionEl);
    const replayBtn = this.shadow.querySelector('quiz-results').shadowRoot.querySelector('button');
    replayBtn.onclick = this.startQuiz.bind(this);
  }

  setQuestionToElement(element) {
    element.setAttribute('question', JSON.stringify(this.questions[this.index]));
  }

  handleAnswer() {
    this.index += 1;
    this.questionEl.setAttribute('correctness', this.isCorrectAnswer);
    if (this.isCorrectAnswer) { this.correctAnswers += 1; }
    if (this.questions.length === this.index) {
      this.addResultsComponent();
    } else {
      this.setQuestionToElement(this.questionEl);
    }
  }

  addQuestionComponent(element) {
    this.questionEl = document.createElement('quiz-question');
    this.setQuestionToElement(this.questionEl);
    element.appendChild(this.questionEl);
  }

  removeStartComponent(element) {
    if (element.contains(this.startBtn.parentNode)) {
      element.removeChild(this.startBtn.parentNode);
    }
  }

  removeResultsComponent(element) {
    if (element.contains(this.resultsEl)) {
      element.removeChild(this.resultsEl);
    }
  }

  startQuiz() {
    this.index = 0;
    this.correctAnswers = 0;
    this.addQuestionComponent(this.shadow);
    this.removeStartComponent(this.shadow);
    this.removeResultsComponent(this.shadow);
    const answerBtn = this.shadow.querySelector('quiz-question').shadowRoot.querySelector('button');
    answerBtn.onclick = this.handleAnswer.bind(this);
  }

  connectedCallback() {
    this.startBtn = this.shadow.querySelector('button');
    this.startBtn.onclick = this.startQuiz.bind(this);
  }
}

export default Quiz;
