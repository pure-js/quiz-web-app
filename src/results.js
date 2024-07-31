const template = document.createElement("template");
template.innerHTML = `
  <style>
    .btn-secondary {
      cursor: pointer;
      display: inline-block;
      font-weight: 400;
      text-align: center;
      user-select: none;
      background-color: transparent;
      border: 1px solid #007bff;
      transition: color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
      color: #000;
      font-size: 1.25rem;
      line-height: 1.5;
      border-radius: 0.3rem;
      padding: 11px 22px 12px;
    }

    .btn-secondary:hover {
      color: #212529;
      text-decoration: none;
      border-color: #0062cc;
    }

    .btn-secondary:focus {
      box-shadow: 0 0 0 0.2rem rgba(38, 143, 255, 0.5);
    }

    .centralize {
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      flex-direction: column;
    }

    .icon-replay {
      position: relative;
      top: 5px;
      left: -3px;
    }
  </style>

  <div class="centralize">
    <section>
      <h1>Final Results</h1>
      <p>Maybe you answered, maybe not this</p>
    </section>
    <button type="button" class="btn-secondary">
      <svg class="icon-replay" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path d="M12 5V2.21c0-.45-.54-.67-.85-.35l-3.8 3.79c-.2.2-.2.51 0 .71l3.79 3.79c.32.31.86.09.86-.36V7c3.73 0 6.68 3.42 5.86 7.29-.47 2.27-2.31 4.1-4.57 4.57-3.57.75-6.75-1.7-7.23-5.01-.07-.48-.49-.85-.98-.85-.6 0-1.08.53-1 1.13.62 4.39 4.8 7.64 9.53 6.72 3.12-.61 5.63-3.12 6.24-6.24C20.84 9.48 16.94 5 12 5z"/>
      </svg>
      Pass Again
    </button>
  </div>
`;

class Results extends HTMLElement {
  get correctAnswers() {
    return this.getAttribute("correct-answers");
  }

  get totalAnswers() {
    return this.getAttribute("total-answers");
  }

  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: "open" });
    this.shadow.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    const paragraph = this.shadow.querySelector("p");
    const percentage = (this.correctAnswers / this.totalAnswers) * 100;
    paragraph.textContent = `You correctly answered ${this.correctAnswers}  of ${this.totalAnswers} questions (${percentage}%)`;
  }
}

export default Results;
